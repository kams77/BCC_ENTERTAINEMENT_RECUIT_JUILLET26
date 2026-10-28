import React, { useRef, useState } from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';
import { exportProgress, importProgress, resetProgress } from '../lib/storage';

/**
 * Sauvegarde / restauration / réinitialisation de la progression.
 * La progression n'est stockée que dans ce navigateur : l'export permet de la
 * transférer sur un autre appareil ou de ne pas la perdre en vidant le cache.
 */
export const ProgressBackup: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(exportProgress(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bcc-dataprep-progression-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage({ kind: 'ok', text: 'Sauvegarde téléchargée.' });
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const result = importProgress(await file.text());
    if (result.ok) {
      window.location.reload();
    } else {
      setMessage({ kind: 'error', text: result.error });
    }
  };

  const handleReset = () => {
    if (window.confirm('Effacer toute votre progression ? Cette action est irréversible.')) {
      resetProgress();
      window.location.reload();
    }
  };

  const buttonClass =
    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors';

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Gestion de la progression">
      <button type="button" onClick={handleExport} className={buttonClass}>
        <Download className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Sauvegarder</span>
      </button>
      <button type="button" onClick={() => fileInputRef.current?.click()} className={buttonClass}>
        <Upload className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Restaurer</span>
      </button>
      <button type="button" onClick={handleReset} className={`${buttonClass} hover:text-red-300`}>
        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Réinitialiser</span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        onChange={handleImport}
        className="hidden"
        aria-label="Fichier de sauvegarde à restaurer"
      />
      {message && (
        <span role="status" className={`text-xs ${message.kind === 'ok' ? 'text-emerald-400' : 'text-red-400'}`}>
          {message.text}
        </span>
      )}
    </div>
  );
};
