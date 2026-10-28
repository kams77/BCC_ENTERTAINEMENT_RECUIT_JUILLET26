/**
 * Web Worker d'exécution Python (Pyodide + pandas).
 * Fichier statique de même origine : le service worker contrôle donc ses requêtes
 * et le moteur reste utilisable hors ligne une fois téléchargé.
 */
const INDEX = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
let pyodide = null;

async function ensure() {
  if (pyodide) return pyodide;
  importScripts(INDEX + 'pyodide.js');
  pyodide = await loadPyodide({ indexURL: INDEX });
  await pyodide.loadPackage('pandas');
  return pyodide;
}

// Affichage complet des DataFrames (sans « ... ») et DataFrame `df` prêt à l'emploi
const PRELUDE = [
  'import json, pandas as pd',
  "pd.set_option('display.width', 1000)",
  "pd.set_option('display.max_columns', None)",
  "pd.set_option('display.max_rows', None)",
  'df = pd.DataFrame(json.loads(_rows_json))',
].join('\n');

self.onmessage = async (event) => {
  const { id, type, code, rows } = event.data;
  try {
    const py = await ensure();
    if (type === 'init') {
      self.postMessage({ id, ok: true });
      return;
    }
    let output = '';
    py.setStdout({ batched: (line) => { output += line + '\n'; } });
    py.setStderr({ batched: (line) => { output += line + '\n'; } });
    const namespace = py.globals.get('dict')();
    try {
      namespace.set('_rows_json', JSON.stringify(rows));
      py.runPython(PRELUDE, { globals: namespace });
      py.runPython(code, { globals: namespace });
      self.postMessage({ id, ok: true, output });
    } finally {
      namespace.destroy();
    }
  } catch (error) {
    const message = String((error && error.message) || error);
    // Dernières lignes de la trace Python : celles qui nomment l'erreur
    const tail = message.trim().split('\n').slice(-4).join('\n');
    self.postMessage({ id, ok: false, error: tail });
  }
};
