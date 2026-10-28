import React, { useEffect, useState } from 'react';
import { Download, Wifi, WifiOff } from 'lucide-react';
import { loadSqlEngine } from '../lib/sqlRunner';
import { loadPythonEngine } from '../lib/pythonRunner';

const OFFLINE_READY_KEY = 'bcc_prep_offline_ready';

// Événement non standard (Chrome, Edge, Android) : absent de lib.dom
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

type Phase = 'idle' | 'loading' | 'ready' | 'error';

function readReadyFlag(): boolean {
  try {
    return localStorage.getItem(OFFLINE_READY_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Indique l'état de la connexion, permet de télécharger les moteurs SQL et Python
 * pour s'exercer sans Internet, et d'installer la plateforme comme une application.
 */
export const OfflineStatus: React.FC = () => {
  const [online, setOnline] = useState<boolean>(() => (typeof navigator === 'undefined' ? true : navigator.onLine));
  const [phase, setPhase] = useState<Phase>(() => (readReadyFlag() ? 'ready' : 'idle'));
  const [detail, setDetail] = useState<string>('');
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstallEvent(null);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    window.addEventListener('beforeinstallprompt', onInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('beforeinstallprompt', onInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const handlePrepare = async () => {
    setPhase('loading');
    try {
      if (!import.meta.env.PROD || !('serviceWorker' in navigator)) {
        throw new Error(
          "Le mode hors ligne n'est disponible que dans la version déployée (npm run build), pas en mode développement."
        );
      }
      setDetail('Activation du mode hors ligne…');
      await Promise.race([
        navigator.serviceWorker.ready,
        new Promise((_, reject) => window.setTimeout(() => reject(new Error('Service worker indisponible.')), 10_000)),
      ]);
      setDetail('Téléchargement du moteur SQL…');
      await loadSqlEngine();
      setDetail('Téléchargement du moteur Python (plusieurs Mo, patientez)…');
      await loadPythonEngine();
      try {
        localStorage.setItem(OFFLINE_READY_KEY, 'true');
      } catch {
        // ignoré
      }
      setPhase('ready');
      setDetail('');
    } catch (error) {
      setPhase('error');
      setDetail(error instanceof Error ? error.message : 'Le téléchargement a échoué.');
    }
  };

  const handleInstall = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
  };

  const buttonClass =
    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs" role="group" aria-label="Mode hors ligne">
      <span className={`flex items-center gap-1.5 ${online ? 'text-emerald-400' : 'text-amber-400'}`}>
        {online ? <Wifi className="w-3.5 h-3.5" aria-hidden="true" /> : <WifiOff className="w-3.5 h-3.5" aria-hidden="true" />}
        <span>{online ? 'En ligne' : 'Hors ligne'}</span>
      </span>

      {phase === 'ready' ? (
        <span className="text-emerald-400">Moteurs SQL et Python téléchargés : exercices disponibles sans Internet.</span>
      ) : (
        <button
          type="button"
          onClick={handlePrepare}
          disabled={!online || phase === 'loading'}
          className={buttonClass}
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{phase === 'loading' ? 'Préparation…' : 'Préparer le mode hors ligne'}</span>
        </button>
      )}

      {installEvent && (
        <button type="button" onClick={handleInstall} className={buttonClass}>
          <span>Installer l'application</span>
        </button>
      )}

      <span role="status" aria-live="polite" className={phase === 'error' ? 'text-red-400' : 'text-slate-400'}>
        {phase === 'loading' || phase === 'error' ? detail : ''}
      </span>
    </div>
  );
};
