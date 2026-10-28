/**
 * Exécution réelle de Python / pandas dans le navigateur (Pyodide, CPython compilé en
 * WebAssembly). Le code tourne dans un Web Worker (public/pyodide-worker.js) : une boucle infinie ne gèle donc pas
 * la page, le worker est simplement arrêté au bout du délai imparti.
 */
import type { Cell } from './grading';

const INIT_TIMEOUT_MS = 180_000; // 1er chargement : Python + pandas (plusieurs Mo)
const RUN_TIMEOUT_MS = 15_000;

interface WorkerReply {
  id: number;
  ok: boolean;
  output?: string;
  error?: string;
}

export class PythonRunError extends Error {
  constructor(message: string, readonly kind: 'python' | 'timeout' | 'engine') {
    super(message);
  }
}

let worker: Worker | null = null;
let nextId = 1;
let initialised = false;

function stopWorker() {
  worker?.terminate();
  worker = null;
  initialised = false;
}

function getWorker(): Worker {
  if (!worker) {
    // Fichier statique (public/pyodide-worker.js), servi depuis la même origine
    worker = new Worker(`${import.meta.env.BASE_URL}pyodide-worker.js`);
  }
  return worker;
}

function call(
  message: { type: 'init' } | { type: 'run'; code: string; rows: Record<string, Cell>[] },
  timeoutMs: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    let w: Worker;
    try {
      w = getWorker();
    } catch {
      reject(new PythonRunError("Impossible de démarrer le moteur Python dans ce navigateur.", 'engine'));
      return;
    }
    const id = nextId++;
    const timer = window.setTimeout(() => {
      w.removeEventListener('message', onMessage);
      w.removeEventListener('error', onError);
      stopWorker(); // le moteur sera rechargé (depuis le cache) au prochain lancement
      reject(
        new PythonRunError(
          message.type === 'init'
            ? "Le chargement du moteur Python a pris trop de temps. Vérifiez votre connexion et réessayez."
            : `Exécution interrompue après ${timeoutMs / 1000} s : vérifiez qu'il n'y a pas de boucle infinie.`,
          message.type === 'init' ? 'engine' : 'timeout'
        )
      );
    }, timeoutMs);

    const cleanup = () => {
      window.clearTimeout(timer);
      w.removeEventListener('message', onMessage);
      w.removeEventListener('error', onError);
    };
    function onMessage(event: MessageEvent<WorkerReply>) {
      if (event.data.id !== id) return;
      cleanup();
      if (event.data.ok) {
        initialised = true;
        resolve(event.data.output ?? '');
      } else if (!initialised) {
        // Échec avant que le moteur soit prêt : problème de chargement, pas d'erreur de code
        stopWorker();
        reject(
          new PythonRunError(
            'Le moteur Python n\'a pas pu être chargé (connexion nécessaire au premier lancement).',
            'engine'
          )
        );
      } else {
        reject(new PythonRunError(event.data.error ?? 'Erreur Python inconnue.', 'python'));
      }
    }
    function onError() {
      cleanup();
      stopWorker();
      reject(new PythonRunError('Le moteur Python a rencontré une erreur inattendue.', 'engine'));
    }
    w.addEventListener('message', onMessage);
    w.addEventListener('error', onError);
    w.postMessage({ id, ...message });
  });
}

/** Charge Python + pandas (utile pour préparer le mode hors ligne). */
export async function loadPythonEngine(): Promise<void> {
  await call({ type: 'init' }, INIT_TIMEOUT_MS);
}

/**
 * Exécute du code Python avec un DataFrame `df` prêt à l'emploi ; renvoie ce qui a été
 * affiché (print). Lève PythonRunError en cas d'erreur Python, de délai dépassé ou de
 * moteur indisponible.
 */
export async function runPython(code: string, rows: Record<string, Cell>[]): Promise<string> {
  if (!initialised) await loadPythonEngine();
  return call({ type: 'run', code, rows }, RUN_TIMEOUT_MS);
}
