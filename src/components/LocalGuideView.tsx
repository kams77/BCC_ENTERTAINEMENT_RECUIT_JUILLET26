import React, { useState } from 'react';
import { 
  Terminal, 
  GitBranch, 
  Copy, 
  Check, 
  FolderDown, 
  FolderTree, 
  ExternalLink,
  Laptop,
  CheckCircle2,
  FileCode,
  Sparkles
} from 'lucide-react';

export const LocalGuideView: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const gitPushCommand = `git remote set-url origin https://<VOTRE_TOKEN_GITHUB>@github.com/kams77/BCC_ENTERTAINEMENT_RECUIT_JUILLET26.git
git branch -M main
git push -u origin main`;

  const gitCloneCommand = `git clone https://github.com/kams77/BCC_ENTERTAINEMENT_RECUIT_JUILLET26.git
cd BCC_ENTERTAINEMENT_RECUIT_JUILLET26`;

  const webDevCommand = `npm install
npm run dev`;

  const pythonDevCommand = `cd local_training
python -m venv venv
# Activer l'environnement (Windows: venv\\Scripts\\activate | Mac/Linux: source venv/bin/activate)
pip install -r requirements.txt
python 01_nettoyage_declarations_multidevises.py`;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Laptop className="w-4 h-4" />
            <span>Guide d'Installation Locale & Synchronisation GitHub</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Procédure pour Travailler en Local sur votre Machine
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Toutes les instructions pour pousser le code vers votre dépôt GitHub <span className="font-mono text-amber-300">kams77/BCC_ENTERTAINEMENT_RECUIT_JUILLET26</span>, le cloner en local et lancer les scripts Python et l'application web.
          </p>
        </div>

        <a
          href="https://github.com/kams77/BCC_ENTERTAINEMENT_RECUIT_JUILLET26"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shrink-0 shadow-sm"
        >
          <GitBranch className="w-4 h-4" />
          <span>Accéder au Dépôt GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Step by step cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Étape 1 : Push vers GitHub */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-1">
              ÉTAPE 1 · SYNCHRONISATION GITHUB
            </div>
            <h2 className="text-lg font-bold text-white mb-2">
              Pousser les fichiers vers votre GitHub
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              GitHub bloque les push automatisés sans jeton de sécurité (Personal Access Token). Générez votre token sur GitHub (Settings &gt; Developer settings &gt; Personal access tokens) avec le droit <code className="text-amber-300 font-mono">repo</code>, puis exécutez dans votre terminal :
            </p>

            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4">
              <pre className="font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                {gitPushCommand}
              </pre>
              <button
                onClick={() => handleCopy(gitPushCommand, 'push')}
                className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copier les commandes"
              >
                {copiedKey === 'push' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300">Si vous utilisez une clé SSH configurée :</span>
            <code className="block font-mono text-amber-300">git remote set-url origin git@github.com:kams77/BCC_ENTERTAINEMENT_RECUIT_JUILLET26.git && git push -u origin main</code>
          </div>
        </div>

        {/* Étape 2 : Cloner en Local */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-1">
              ÉTAPE 2 · RÉCUPÉRATION SUR VOTRE ORDINATEUR
            </div>
            <h2 className="text-lg font-bold text-white mb-2">
              Cloner le projet sur votre machine locale
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Sur votre ordinateur (Windows, Mac ou Linux), ouvrez un terminal (PowerShell, Terminal macOS ou Git Bash) dans le dossier de votre choix et exécutez :
            </p>

            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4">
              <pre className="font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                {gitCloneCommand}
              </pre>
              <button
                onClick={() => handleCopy(gitCloneCommand, 'clone')}
                className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copier les commandes"
              >
                {copiedKey === 'clone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Tous les codes, données CSV et fiches théoriques seront téléchargés.</span>
          </div>
        </div>

        {/* Étape 3 : Lancer l'App Web */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-1">
              OPTION A · APPLICATION WEB INTERACTIVE
            </div>
            <h2 className="text-lg font-bold text-white mb-2">
              Lancer l'Interface d'Exercices en Local
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Nécessite <strong className="text-white">Node.js</strong> (version 18+). Lance l'application web avec la console de code, l'examen blanc et les fiches de révision sans connexion internet requise :
            </p>

            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4">
              <pre className="font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                {webDevCommand}
              </pre>
              <button
                onClick={() => handleCopy(webDevCommand, 'web')}
                className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copier les commandes"
              >
                {copiedKey === 'web' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <span className="text-xs text-slate-400">
            L'interface s'ouvre sur <code className="text-amber-300 font-mono">http://localhost:3000</code>.
          </span>
        </div>

        {/* Étape 4 : Scripts Python & Jupyter */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-1">
              OPTION B · PACK PYTHON & PANDAS LOCAL
            </div>
            <h2 className="text-lg font-bold text-white mb-2">
              Exécuter les Analyses Financières en Python
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Dans le dossier <code className="text-amber-300 font-mono">/local_training</code>, lancez vos scripts directement dans votre terminal ou avec Jupyter Notebook :
            </p>

            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4">
              <pre className="font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                {pythonDevCommand}
              </pre>
              <button
                onClick={() => handleCopy(pythonDevCommand, 'python')}
                className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copier les commandes"
              >
                {copiedKey === 'python' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <span className="text-xs text-slate-400">
            Tapez <code className="text-amber-300 font-mono">jupyter notebook</code> pour explorer les fichiers interactivement.
          </span>
        </div>
      </div>

      {/* Structure of local_training folder */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <FolderTree className="w-4 h-4 text-amber-400" />
          <span>Contenu du Pack Local (/local_training)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="font-mono font-semibold text-amber-300 block">
              01_nettoyage_declarations_multidevises.py
            </span>
            <p className="text-slate-400">
              Harmonisation CDF/USD au cours indicatif et calcul de l'encours net de crédit bancaire.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="font-mono font-semibold text-amber-300 block">
              02_audit_ratios_npl_dsif.py
            </span>
            <p className="text-slate-400">
              Audit des créances en souffrance (Instruction n° 15 de la BCC) et taux de couverture des provisions.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="font-mono font-semibold text-amber-300 block">
              03_series_temporelles_taux_change.py
            </span>
            <p className="text-slate-400">
              Calcul du spread officiel vs parallèle et vitesse de dépréciation hebdomadaire du CDF.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="font-mono font-semibold text-amber-300 block">
              04_adjudication_bons_bcc.py
            </span>
            <p className="text-slate-400">
              Dépouillement des offres de Bons BCC et calcul du Taux Moyen Pondéré (TMP).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="font-mono font-semibold text-amber-300 block">
              05_stress_test_macroprudentiel.py
            </span>
            <p className="text-slate-400">
              Simulation d'un choc sur les cours du cuivre et impact sur le ratio de solvabilité CAR.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="font-mono font-semibold text-amber-300 block">
              requetes_sql_bcc.sql
            </span>
            <p className="text-slate-400">
              Recueil complet des requêtes SQL d'audit, window functions (`LAG`, `OVER`) et vérification comptable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
