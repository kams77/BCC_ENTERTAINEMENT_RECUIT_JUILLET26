import React, { useState } from 'react';
import { 
  Terminal, 
  GitBranch, 
  Copy, 
  Check, 
  FolderTree, 
  ExternalLink,
  Laptop,
  CheckCircle2,
  AlertCircle,
  FileCode,
  ShieldCheck,
  Cpu,
  Monitor
} from 'lucide-react';

export const LocalGuideView: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [osTab, setOsTab] = useState<'windows' | 'mac' | 'linux'>('windows');

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const windowsCloneAndRun = `# 1. Cloner le dépôt officiel BCC
git clone https://github.com/kams77/BCC_ENTERTAINEMENT_RECUIT_JUILLET26.git
cd BCC_ENTERTAINEMENT_RECUIT_JUILLET26

# 2. Installer les dépendances Node.js (résolution automatique sans conflit)
npm install

# 3. Lancer l'application web d'entraînement
npm run dev`;

  const macLinuxCloneAndRun = `# 1. Cloner le dépôt officiel BCC
git clone https://github.com/kams77/BCC_ENTERTAINEMENT_RECUIT_JUILLET26.git
cd BCC_ENTERTAINEMENT_RECUIT_JUILLET26

# 2. Installer les dépendances Node.js
npm install

# 3. Lancer l'application web locale
npm run dev`;

  const windowsPython = `# 1. Accéder au dossier des scripts d'analyse financière
cd local_training

# 2. Créer l'environnement virtuel Python
python -m venv venv

# 3. Activer l'environnement virtuel sous Windows (PowerShell ou Invite de commandes)
.\\venv\\Scripts\\activate

# 4. Installer les librairies financières (Pandas, DuckDB, NumPy, SciPy)
pip install -r requirements.txt

# 5. Exécuter un script d'audit (ex: audit des créances en souffrance NPL)
python 02_audit_ratios_npl_dsif.py`;

  const macLinuxPython = `# 1. Accéder au dossier des scripts d'analyse financière
cd local_training

# 2. Créer l'environnement virtuel Python
python3 -m venv venv

# 3. Activer l'environnement virtuel
source venv/bin/activate

# 4. Installer les librairies financières (Pandas, DuckDB, NumPy, SciPy)
pip install -r requirements.txt

# 5. Exécuter un script d'audit (ex: audit des créances en souffrance NPL)
python3 02_audit_ratios_npl_dsif.py`;

  const gitPullCommand = `git pull origin main
npm install
npm run dev`;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-amber-950/20 border border-amber-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Laptop className="w-4 h-4" />
            <span>Guide Officiel de Pratique en Local & Synchronisation Git</span>
          </div>
          <h1 className="font-sovereign text-2xl lg:text-3xl font-bold text-white tracking-tight mt-1">
            Exécuter l'Environnement d'Entraînement en Local
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Procédure pas-à-pas vérifiée pour récupérer le code depuis votre dépôt GitHub <span className="font-mono text-amber-300 font-semibold">kams77/BCC_ENTERTAINEMENT_RECUIT_JUILLET26</span>, installer toutes les dépendances sans aucune erreur <code className="text-amber-400 font-mono">ERESOLVE</code> et exécuter les scripts Python et l'application web.
          </p>
        </div>

        <a
          href="https://github.com/kams77/BCC_ENTERTAINEMENT_RECUIT_JUILLET26"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all shrink-0 shadow-lg shadow-amber-500/20"
        >
          <GitBranch className="w-4 h-4" />
          <span>Voir le Dépôt sur GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* OS Selector Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800 w-fit">
        <button
          onClick={() => setOsTab('windows')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            osTab === 'windows'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>Windows (PowerShell / CMD)</span>
        </button>

        <button
          onClick={() => setOsTab('mac')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            osTab === 'mac'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>macOS (Terminal / zsh)</span>
        </button>

        <button
          onClick={() => setOsTab('linux')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            osTab === 'linux'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Linux (bash)</span>
        </button>
      </div>

      {/* Step by step cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Étape 1 : Si vous avez déjà cloné le dépôt */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-1">
              CAS A · VOUS AVEZ DÉJÀ CLONÉ LE DOSSIER
            </div>
            <h2 className="text-lg font-bold text-white mb-2">
              Mettre à jour votre dossier local (Git Pull)
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Si vous êtes déjà dans votre dossier local sur votre ordinateur, lancez simplement ces 3 lignes pour intégrer toutes les nouveautés et les correctifs :
            </p>

            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4">
              <pre className="font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                {gitPullCommand}
              </pre>
              <button
                onClick={() => handleCopy(gitPullCommand, 'pull')}
                className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copier les commandes"
              >
                {copiedKey === 'pull' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="text-xs text-emerald-400/90 flex items-center gap-2 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Le fichier <code>.npmrc</code> inclus garantit une résolution 100% propre sans conflit de version.</span>
          </div>
        </div>

        {/* Étape 2 : Nouveau Clonage depuis Zéro */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-1">
              CAS B · CLONAGE SUR UNE NOUVELLE MACHINE
            </div>
            <h2 className="text-lg font-bold text-white mb-2">
              Cloner et Démarrer l'App Web Interactive
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Ouvrez votre terminal dans votre répertoire de travail et collez ce bloc :
            </p>

            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4">
              <pre className="font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                {osTab === 'windows' ? windowsCloneAndRun : macLinuxCloneAndRun}
              </pre>
              <button
                onClick={() => handleCopy(osTab === 'windows' ? windowsCloneAndRun : macLinuxCloneAndRun, 'clone')}
                className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copier les commandes"
              >
                {copiedKey === 'clone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>L'application sera accessible sur <strong>http://localhost:3000</strong> dans votre navigateur.</span>
          </div>
        </div>
      </div>

      {/* Python Training Guide */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-1">
            ATELIER PRATIQUE PYTHON · DATASETS ET SCRIPTS AUTONOMES
          </div>
          <h2 className="text-lg font-bold text-white mb-2">
            Exécuter les Analyses Financières avec Python & Pandas
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Le répertoire <code className="text-amber-300 font-mono">/local_training</code> contient les scripts complets et les données officielles pour s'exercer en conditions réelles avec Pandas, NumPy et DuckDB :
          </p>

          <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4">
            <pre className="font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
              {osTab === 'windows' ? windowsPython : macLinuxPython}
            </pre>
            <button
              onClick={() => handleCopy(osTab === 'windows' ? windowsPython : macLinuxPython, 'py')}
              className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Copier les commandes Python"
            >
              {copiedKey === 'py' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Structure of local_training folder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs pt-2">
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
              Recueil complet des requêtes SQL d'audit, window functions (<code>LAG</code>, <code>OVER</code>) et vérification comptable.
            </p>
          </div>
        </div>
      </div>

      {/* Troubleshooting Tips */}
      <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Conseils & Résolution d'Incidents en Local :</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-slate-400">
          <li><strong>Si PowerShell bloque l'activation de l'environnement virtuel</strong> : exécutez une seule fois <code>Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass</code> dans votre PowerShell.</li>
          <li><strong>Version de Node.js recommandée</strong> : Node 18, 20 ou 22 (tapez <code>node -v</code> pour vérifier).</li>
          <li><strong>Version de Python recommandée</strong> : Python 3.10 ou supérieur (tapez <code>python --version</code>).</li>
        </ul>
      </div>
    </div>
  );
};
