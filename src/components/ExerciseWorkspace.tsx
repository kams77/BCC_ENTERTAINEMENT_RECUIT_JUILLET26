import React, { useRef, useState } from 'react';
import { 
  Play, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Lightbulb, 
  Table, 
  FileCode2, 
  BookMarked, 
  RotateCcw,
  Clock,
  Building2,
  HelpCircle,
  Copy,
  Check,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Exercise } from '../types';
import { Cell, ResultSet, compareNumericOutput, compareResultSets } from '../lib/grading';
import { loadSqlEngine, runSql } from '../lib/sqlRunner';
import { PythonRunError, runPython } from '../lib/pythonRunner';

export const EXERCISE_PREREQUISITES: Record<string, { moduleId: string; moduleTitle: string; stepNumber: number }> = {
  'exo-1-cleaning-multidevise': { moduleId: 'module-1-institutions-bcc', moduleTitle: 'Module 01 : Cadre Institutionnel, Missions & Statuts', stepNumber: 1 },
  'exo-5-adjudication-bons-bcc': { moduleId: 'module-2-politique-monetaire', moduleTitle: 'Module 02 : Politique Monétaire & Bons BCC', stepNumber: 3 },
  'exo-2-ratios-npl-dsif': { moduleId: 'module-3-surveillance-prudentielle', moduleTitle: 'Module 03 : Surveillance Prudentielle & Bâle II/III', stepNumber: 5 },
  'exo-3-volatilite-taux-change': { moduleId: 'module-4-macroeconomie-condense', moduleTitle: 'Module 04 : Macroéconomie & Condensé BCC', stepNumber: 7 },
  'exo-4-agregats-monetaires-m2': { moduleId: 'module-4-macroeconomie-condense', moduleTitle: 'Module 04 : Macroéconomie & Condensé BCC', stepNumber: 7 },
  'exo-6-stress-test-choc-minier': { moduleId: 'module-5-boite-a-outils-data-analyst', moduleTitle: 'Module 05 : Boîte à Outils SQL & Économétrie', stepNumber: 10 },
};

type ExecutionStatus = 'idle' | 'evaluating' | 'success' | 'failed' | 'error';

interface ExecutionResult {
  status: ExecutionStatus;
  message: string;
  issues?: string[];
  warnings?: string[];
  outputTable?: Record<string, Cell>[];
  stdout?: string;
}

function toObjects(result: ResultSet): Record<string, Cell>[] {
  return result.rows.map((row) => Object.fromEntries(result.columns.map((col, i) => [col, row[i]])));
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

interface ExerciseWorkspaceProps {
  exercises: Exercise[];
  completedExercises: Record<string, boolean>;
  completedModules: Record<string, boolean>;
  strictMode: boolean;
  onToggleComplete: (exerciseId: string) => void;
  onNavigateToModule?: (moduleId: string) => void;
  initialExerciseId?: string;
}

export const ExerciseWorkspace: React.FC<ExerciseWorkspaceProps> = ({
  exercises,
  completedExercises,
  completedModules,
  strictMode,
  onToggleComplete,
  onNavigateToModule,
  initialExerciseId,
}) => {
  const [selectedExoId, setSelectedExoId] = useState<string>(initialExerciseId || exercises[0].id);
  const [language, setLanguage] = useState<'sql' | 'python'>('sql');
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'editor' | 'data' | 'solution'>('editor');
  
  // Custom code state per exercise and language
  const [userCode, setUserCode] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    exercises.forEach((ex) => {
      initial[`${ex.id}_sql`] = ex.initialCodeSQL;
      initial[`${ex.id}_python`] = ex.initialCodePython;
    });
    return initial;
  });

  const [executionResult, setExecutionResult] = useState<ExecutionResult>({ status: 'idle', message: '' });
  // Identifie la dernière exécution lancée : une réponse tardive (changement d'exercice
  // ou de langage entre-temps) est ignorée.
  const runIdRef = useRef(0);
  const resetResult = () => {
    runIdRef.current += 1;
    setExecutionResult({ status: 'idle', message: '' });
  };

  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  React.useEffect(() => {
    if (initialExerciseId) {
      setSelectedExoId(initialExerciseId);
      resetResult();
      setRevealedHints(0);
    }
  }, [initialExerciseId]);

  const currentExercise = exercises.find((ex) => ex.id === selectedExoId) || exercises[0];
  const codeKey = `${currentExercise.id}_${language}`;
  const currentCode = userCode[codeKey] ?? (language === 'sql' ? currentExercise.initialCodeSQL : currentExercise.initialCodePython);

  const handleCodeChange = (newCode: string) => {
    setUserCode((prev) => ({
      ...prev,
      [codeKey]: newCode,
    }));
  };

  const handleResetCode = () => {
    const defaultCode = language === 'sql' ? currentExercise.initialCodeSQL : currentExercise.initialCodePython;
    handleCodeChange(defaultCode);
    resetResult();
  };

  const handleExecute = async () => {
    const exercise = currentExercise;
    const lang = language;
    const code = currentCode;
    const runId = ++runIdRef.current;
    const isCurrent = () => runIdRef.current === runId;

    setExecutionResult({
      status: 'evaluating',
      message:
        lang === 'sql'
          ? 'Exécution de votre requête SQL…'
          : 'Exécution de votre script Python… (au premier lancement, le moteur Python se charge : cela peut prendre un moment)',
    });

    const tableName = exercise.datasetName.replace(/\.csv$/i, '');
    const rows = exercise.sampleData;

    const finish = (grade: { passed: boolean; issues: string[]; warnings: string[] }, extra: Partial<ExecutionResult>) => {
      if (!isCurrent()) return;
      setExecutionResult({
        status: grade.passed ? 'success' : 'failed',
        message: grade.passed
          ? 'Résultat conforme : votre solution produit bien le résultat attendu.'
          : "Le résultat n'est pas encore conforme.",
        issues: grade.issues,
        warnings: grade.warnings,
        ...extra,
      });
      if (grade.passed && !completedExercises[exercise.id]) {
        onToggleComplete(exercise.id);
      }
    };

    try {
      if (lang === 'sql') {
        await loadSqlEngine();
        const expected = await runSql(tableName, rows, exercise.solutionSQL);
        let actual: ResultSet;
        try {
          actual = await runSql(tableName, rows, code);
        } catch (error) {
          if (!isCurrent()) return;
          setExecutionResult({
            status: 'error',
            message: 'Erreur dans votre requête SQL',
            issues: [errorMessage(error)],
          });
          return;
        }
        finish(compareResultSets(actual, expected), { outputTable: toObjects(actual) });
      } else {
        const expectedOutput = await runPython(exercise.solutionPython, rows);
        let output: string;
        try {
          output = await runPython(code, rows);
        } catch (error) {
          if (error instanceof PythonRunError && error.kind !== 'engine') {
            if (!isCurrent()) return;
            setExecutionResult({
              status: 'error',
              message: error.kind === 'timeout' ? 'Exécution interrompue' : 'Erreur dans votre script Python',
              issues: [error.message],
            });
            return;
          }
          throw error;
        }
        finish(compareNumericOutput(output, expectedOutput), { stdout: output });
      }
    } catch (error) {
      if (!isCurrent()) return;
      setExecutionResult({
        status: 'error',
        message: "Le moteur d'exécution n'est pas disponible",
        issues: [
          error instanceof PythonRunError
            ? error.message
            : 'Une connexion Internet est nécessaire au premier lancement pour charger le moteur. Une fois chargé, il reste disponible hors ligne.',
        ],
      });
    }
  };

  const handleCopySolution = () => {
    const textToCopy = language === 'sql' ? currentExercise.solutionSQL : currentExercise.solutionPython;
    navigator.clipboard.writeText(textToCopy);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const isCompleted = !!completedExercises[currentExercise.id];
  const currentPrereq = EXERCISE_PREREQUISITES[currentExercise.id];
  const isCurrentExoLocked = strictMode && currentPrereq && !completedModules[currentPrereq.moduleId];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-80px)]">
      {/* Sidebar List of Exercises (3 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">Série d'Exercices Techniques</h2>
            <p className="text-xs text-slate-400">Cas pratiques réels pour le test d'admission</p>
          </div>
          <span className="text-xs text-amber-400 font-semibold tabular-nums">
            {exercises.length} exercices
          </span>
        </div>

        <div className="flex flex-col gap-2 max-h-[750px] overflow-y-auto pr-1">
          {exercises.map((exo, index) => {
            const isSelected = exo.id === selectedExoId;
            const completed = !!completedExercises[exo.id];
            const prereq = EXERCISE_PREREQUISITES[exo.id];
            const isLocked = strictMode && prereq && !completedModules[prereq.moduleId];

            return (
              <button
                key={exo.id}
                onClick={() => {
                  setSelectedExoId(exo.id);
                  resetResult();
                  setRevealedHints(0);
                }}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-slate-800/90 border-amber-500/60 shadow-md ring-1 ring-amber-500/30'
                    : isLocked
                    ? 'bg-slate-950/40 border-slate-900 opacity-60 hover:opacity-90'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-amber-400">
                      Exercice {index + 1}
                    </span>
                    {isLocked && (
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Étape {prereq.stepNumber}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{exo.estimatedTimeMin} min</span>
                  </div>
                </div>

                <h3 className="text-sm font-medium text-slate-100 line-clamp-2 mb-2">
                  {exo.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate max-w-[150px] text-[11px] text-slate-400">
                    {exo.department.split(' ')[0]}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-300">
                      {exo.difficulty}
                    </span>
                    {completed ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isLocked ? (
                      <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Tips Box */}
        <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 space-y-1.5 mt-auto">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Exigences Jury BCC</span>
          </div>
          <p className="leading-relaxed">
            Pour le poste de Data Analyst, la BCC évalue votre rigueur de conversion multidevise (CDF/USD) et la pertinence économique de vos agrégations.
          </p>
        </div>
      </div>

      {/* Main Workspace (8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        {/* Top Exercise Details Card */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-amber-400">{currentExercise.department}</span>
              <span>·</span>
              <span>{currentExercise.category}</span>
              <span>·</span>
              <span className="tabular-nums">{currentExercise.estimatedTimeMin} minutes</span>
            </div>

            <div className="flex items-center gap-2">
              {isCurrentExoLocked ? (
                <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-500">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Prérequis Requis</span>
                </span>
              ) : (
                <button
                  onClick={() => onToggleComplete(currentExercise.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    isCompleted
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50 hover:bg-emerald-900/50'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{isCompleted ? 'Marqué comme Réussi' : 'Marquer comme Traité'}</span>
                </button>
              )}
            </div>
          </div>

          <h1 className="text-xl font-bold text-white tracking-tight">
            {currentExercise.title}
          </h1>

          <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
            <p><strong className="text-amber-300">Contexte Métier BCC :</strong> {currentExercise.context}</p>
            <p><strong className="text-amber-300">Objectif Technique :</strong> {currentExercise.objective}</p>
          </div>

          {/* Regulatory Note Banner */}
          <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-700/40 text-xs text-amber-200/90 flex items-start gap-2">
            <BookMarked className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-300">Référence Réglementaire BCC : </span>
              <span>{currentExercise.bccContextNotes}</span>
            </div>
          </div>
        </div>

        {isCurrentExoLocked ? (
          /* Locked State Gate */
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-amber-500/40 flex flex-col items-center text-center gap-5 shadow-xl my-2">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Priorité Pédagogique BCC · Étape {currentPrereq.stepNumber} requise
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Exercice Verrouillé par le Parcours Séquentiel
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Conformément à la règle de progression stricte de la BCC, chaque exercice technique s'appuie sur un socle réglementaire et conceptuel préalable. Vous devez d'abord valider le module théorique correspondant.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-left w-full max-w-lg space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Module Théorique Prérequis Indispensable :
              </span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <BookMarked className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {currentPrereq.moduleTitle}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Fiche légale & questionnaire QCM d'assimilation
                    </span>
                  </div>
                </div>
                <span className="text-amber-400 font-mono text-xs font-bold shrink-0">
                  À valider
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {onNavigateToModule && (
                <button
                  type="button"
                  onClick={() => onNavigateToModule(currentPrereq.moduleId)}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-md"
                >
                  <span>Étudier le Module Prérequis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Workspace Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-slate-900/90 rounded-xl border border-slate-800">
          {/* Segmented Controls for Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg">
            <button
              onClick={() => setActiveWorkspaceTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeWorkspaceTab === 'editor'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Console de Code</span>
            </button>
            <button
              onClick={() => setActiveWorkspaceTab('data')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeWorkspaceTab === 'data'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Données Brutes ({currentExercise.sampleData.length} lignes)</span>
            </button>
            <button
              onClick={() => setActiveWorkspaceTab('solution')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeWorkspaceTab === 'solution'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Solution & Débriefing</span>
            </button>
          </div>

          {/* Language Selector + Run Actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg">
              <button
                onClick={() => { setLanguage('sql'); resetResult(); }}
                className={`px-2.5 py-1 text-xs font-semibold rounded ${
                  language === 'sql'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                SQL
              </button>
              <button
                onClick={() => { setLanguage('python'); resetResult(); }}
                className={`px-2.5 py-1 text-xs font-semibold rounded ${
                  language === 'python'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Python / Pandas
              </button>
            </div>

            <button
              onClick={handleResetCode}
              title="Réinitialiser le code de départ"
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleExecute}
              disabled={executionResult.status === 'evaluating'}
              className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{executionResult.status === 'evaluating' ? 'Validation...' : 'Exécuter & Vérifier'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Code Editor & Execution Output */}
        {activeWorkspaceTab === 'editor' && (
          <div className="flex flex-col gap-4">
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
                <span className="font-mono">
                  {language === 'sql' ? 'script_requete_bcc.sql' : 'analyse_donnees_bcc.py'}
                </span>
                <span>Modifiable · Test en direct</span>
              </div>
              <textarea
                value={currentCode}
                onChange={(e) => handleCodeChange(e.target.value)}
                rows={12}
                className="w-full p-4 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-y selection:bg-amber-500/30"
                spellCheck={false}
              />
            </div>

            {/* Hints Section */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Indices de Résolution ({revealedHints}/{currentExercise.hints.length})</span>
                </div>
                {revealedHints < currentExercise.hints.length && (
                  <button
                    onClick={() => setRevealedHints((h) => Math.min(h + 1, currentExercise.hints.length))}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Débloquer l'indice {revealedHints + 1}</span>
                  </button>
                )}
              </div>

              {revealedHints > 0 && (
                <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                  {currentExercise.hints.slice(0, revealedHints).map((hint, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-mono">[{idx + 1}]</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Execution Result Container */}
            {executionResult.status !== 'idle' && (
              <div
                role="status"
                aria-live="polite"
                className={`p-4 rounded-2xl border ${
                  executionResult.status === 'success'
                    ? 'bg-emerald-950/20 border-emerald-800/60'
                    : executionResult.status === 'failed' || executionResult.status === 'error'
                    ? 'bg-red-950/20 border-red-900/60'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {executionResult.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : executionResult.status === 'failed' || executionResult.status === 'error' ? (
                    <XCircle className="w-5 h-5 text-red-400" />
                  ) : (
                    <HelpCircle className="w-5 h-5 text-amber-400 animate-spin" />
                  )}
                  <h4 className="text-sm font-semibold text-white">{executionResult.message}</h4>
                </div>

                {executionResult.issues && executionResult.issues.length > 0 && (
                  <ul className="mb-3 space-y-1 text-xs text-red-200">
                    {executionResult.issues.map((issue, i) => (
                      <li key={i} className="font-mono whitespace-pre-wrap">{issue}</li>
                    ))}
                    {(executionResult.status === 'failed' || executionResult.status === 'error') && (
                      <li className="font-sans text-slate-400 pt-1">
                        Astuce : débloquez un indice ci-dessus, ou comparez avec la solution une fois votre essai terminé.
                      </li>
                    )}
                  </ul>
                )}

                {executionResult.warnings && executionResult.warnings.length > 0 && (
                  <ul className="mb-3 space-y-1 text-xs text-amber-300">
                    {executionResult.warnings.map((warning, i) => (
                      <li key={i}>{warning}</li>
                    ))}
                  </ul>
                )}

                {executionResult.outputTable && executionResult.outputTable.length > 0 && (
                  <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                        <tr>
                          {Object.keys(executionResult.outputTable[0]).map((col) => (
                            <th key={col} className="px-3 py-2 font-semibold">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {executionResult.outputTable.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-900/40">
                            {Object.values(row).map((val, j) => (
                              <td key={j} className="px-3 py-1.5 tabular-nums">
                                {typeof val === 'number' ? val.toLocaleString('fr-FR') : val === null ? 'NULL' : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {executionResult.stdout !== undefined && executionResult.stdout.trim() !== '' && (
                  <pre className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300 font-mono">
                    {executionResult.stdout}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Raw Data Table */}
        {activeWorkspaceTab === 'data' && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">{currentExercise.datasetName}</h3>
                <p className="text-xs text-slate-400">{currentExercise.datasetDescription}</p>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {currentExercise.sampleData.length} enregistrements
              </span>
            </div>

            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="sticky top-0 bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    {currentExercise.columns.map((col) => (
                      <th key={col.key} className="px-4 py-2.5 font-semibold">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {currentExercise.sampleData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                      {currentExercise.columns.map((col) => {
                        const val = row[col.key];
                        return (
                          <td key={col.key} className={`px-4 py-2.5 ${col.type === 'number' ? 'font-mono tabular-nums' : ''}`}>
                            {typeof val === 'number' ? val.toLocaleString('fr-FR') : (val ?? '-')}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Detailed Solution & Financial Debrief */}
        {activeWorkspaceTab === 'solution' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-5">
            {currentExercise.expectedResultMetric && (
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-600/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    {currentExercise.expectedResultMetric.label}
                  </span>
                  <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums mt-0.5">
                    {currentExercise.expectedResultMetric.value}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {currentExercise.expectedResultMetric.explanation}
                  </p>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-base font-bold text-white mb-2">
                Analyse & Explication Économico-Financière
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentExercise.solutionExplanation}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Code de Solution Recommandé ({language.toUpperCase()})
                </span>
                <button
                  onClick={handleCopySolution}
                  className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copié !' : 'Copier'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto">
                <code>{language === 'sql' ? currentExercise.solutionSQL : currentExercise.solutionPython}</code>
              </pre>
            </div>
          </div>
        )}
      </>
    )}
  </div>
</div>
);
};
