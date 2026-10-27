import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  Scale, 
  Calculator, 
  Bookmark, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  RotateCcw,
  Lock
} from 'lucide-react';
import { ReadingModule } from '../types';

interface ReadingModuleViewProps {
  modules: ReadingModule[];
  completedModules: Record<string, boolean>;
  strictMode?: boolean;
  onToggleCompleteModule: (moduleId: string) => void;
  onNavigateToExercise?: (exerciseId: string) => void;
  initialModuleId?: string;
}

export const ReadingModuleView: React.FC<ReadingModuleViewProps> = ({
  modules,
  completedModules,
  strictMode = true,
  onToggleCompleteModule,
  onNavigateToExercise,
  initialModuleId,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(initialModuleId || modules[0].id);
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (initialModuleId) {
      setSelectedModuleId(initialModuleId);
    }
  }, [initialModuleId]);

  const currentModule = modules.find((m) => m.id === selectedModuleId) || modules[0];
  const isCompleted = !!completedModules[currentModule.id];

  const handleSelectQuizAnswer = (questionId: string, optionIndex: number) => {
    setUserQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleValidateQuiz = () => {
    setQuizSubmitted((prev) => ({
      ...prev,
      [currentModule.id]: true,
    }));
    if (!completedModules[currentModule.id]) {
      onToggleCompleteModule(currentModule.id);
    }
  };

  const handleResetQuiz = () => {
    setQuizSubmitted((prev) => ({
      ...prev,
      [currentModule.id]: false,
    }));
    const newAnswers = { ...userQuizAnswers };
    currentModule.quiz.forEach((q) => delete newAnswers[q.id]);
    setUserQuizAnswers(newAnswers);
  };

  // Compute quiz score
  const isSubmitted = !!quizSubmitted[currentModule.id];
  let quizScore = 0;
  if (isSubmitted) {
    currentModule.quiz.forEach((q) => {
      if (userQuizAnswers[q.id] === q.correctIndex) {
        quizScore += 1;
      }
    });
  }

  const currentModIndex = modules.findIndex((m) => m.id === currentModule.id);
  const prevMod = currentModIndex > 0 ? modules[currentModIndex - 1] : null;
  const isCurrentModuleLocked = strictMode && currentModIndex > 0 && prevMod && !completedModules[prevMod.id];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-80px)]">
      {/* Module Index Sidebar (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">Programme de Révision BCC</h2>
            <p className="text-xs text-slate-400">Fondements légaux, politiques & prudentiels</p>
          </div>
          <span className="text-xs text-amber-400 font-semibold tabular-nums">
            {modules.length} modules
          </span>
        </div>

        <div className="flex flex-col gap-2 max-h-[750px] overflow-y-auto pr-1">
          {modules.map((mod, index) => {
            const isSelected = mod.id === selectedModuleId;
            const completed = !!completedModules[mod.id];
            const pMod = index > 0 ? modules[index - 1] : null;
            const isLocked = strictMode && index > 0 && pMod && !completedModules[pMod.id];

            return (
              <button
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
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
                    <span className="text-xs font-mono font-bold text-amber-400">
                      Module {mod.moduleNumber}
                    </span>
                    {isLocked ? (
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Mod. {pMod?.moduleNumber} req.</span>
                      </span>
                    ) : (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        mod.priority === 'Priorité Absolue'
                          ? 'bg-red-950/60 text-red-300 border border-red-800/50'
                          : 'bg-amber-950/60 text-amber-300 border border-amber-800/50'
                      }`}>
                        {mod.priority}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{mod.estimatedReadingTime}</span>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-slate-100 line-clamp-1 mb-1">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-2">
                  {mod.subtitle}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
                  <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                    {mod.category}
                  </span>
                  {completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isLocked ? (
                    <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Module Content (8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Module Header Card */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono text-amber-400 font-bold">MODULE {currentModule.moduleNumber}</span>
              <span>·</span>
              <span>{currentModule.category}</span>
              <span>·</span>
              <span className="tabular-nums">Lecture : {currentModule.estimatedReadingTime}</span>
            </div>

            {isCurrentModuleLocked ? (
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-500">
                <Lock className="w-3.5 h-3.5" />
                <span>Prérequis Requis</span>
              </span>
            ) : (
              <button
                onClick={() => onToggleCompleteModule(currentModule.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  isCompleted
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50 hover:bg-emerald-900/50'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700'
                }`}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{isCompleted ? 'Fiche Validée' : 'Marquer comme Lu'}</span>
              </button>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {currentModule.title}
            </h1>
            <p className="text-sm font-medium text-amber-300/90 mt-1">
              {currentModule.subtitle}
            </p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
            {currentModule.summary}
          </p>

          {/* Key Takeaways */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Points Clés à Retenir pour l'Examen</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {currentModule.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Official References */}
          <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-300">Références Officielles :</span>
            {currentModule.officialReferences.map((ref, i) => (
              <span key={i} className="text-slate-400 italic">
                « {ref} »{i < currentModule.officialReferences.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </div>
        </div>

        {isCurrentModuleLocked ? (
          /* Locked State Gate */
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-amber-500/40 flex flex-col items-center text-center gap-5 shadow-xl my-2">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Progression Linéaire BCC · Module {prevMod?.moduleNumber} requis
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Module Théorique Verrouillé
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Selon le règlement du concours et les priorités de la BCC, chaque domaine d'expertise repose sur la maîtrise des fondamentaux précédents. Vous devez valider le module prérequis et son QCM avant d'aborder celui-ci.
              </p>
            </div>

            {prevMod && (
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-left w-full max-w-lg space-y-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Module Préalable Obligatoire :
                </span>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Module {prevMod.moduleNumber} : {prevMod.title}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {prevMod.category} · QCM et points clés à valider
                      </span>
                    </div>
                  </div>
                  <span className="text-amber-400 font-mono text-xs font-bold shrink-0">
                    Non validé
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {prevMod && (
                <button
                  type="button"
                  onClick={() => setSelectedModuleId(prevMod.id)}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-md"
                >
                  <span>Étudier le Module {prevMod.moduleNumber}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <>

        {/* In-Depth Sections */}
        <div className="space-y-6">
          {currentModule.contentSections.map((section, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-white tracking-tight">
                {section.heading}
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-3 font-normal">
                {section.body}
              </div>

              {/* Callouts (Laws, Formulas, Notes) */}
              {section.callout && (
                <div className={`p-4 rounded-xl border ${
                  section.callout.type === 'law'
                    ? 'bg-blue-950/30 border-blue-800/50 text-blue-200'
                    : section.callout.type === 'formula'
                    ? 'bg-amber-950/30 border-amber-800/50 text-amber-200'
                    : 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200'
                }`}>
                  <div className="flex items-center gap-2 mb-1.5 font-semibold text-xs tracking-wider uppercase">
                    {section.callout.type === 'law' && <Scale className="w-4 h-4 text-blue-400" />}
                    {section.callout.type === 'formula' && <Calculator className="w-4 h-4 text-amber-400" />}
                    {section.callout.type === 'bcc-note' && <Bookmark className="w-4 h-4 text-emerald-400" />}
                    <span>{section.callout.title}</span>
                  </div>
                  <pre className="font-mono text-xs whitespace-pre-line leading-relaxed">
                    {section.callout.content}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* End of Module Mini-Quiz */}
        {currentModule.quiz.length > 0 && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  <span>Quiz d'Assimilation Immédiate</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Validez votre compréhension avant de passer au module suivant.
                </p>
              </div>

              {isSubmitted && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-amber-400 tabular-nums">
                    Score : {quizScore} / {currentModule.quiz.length}
                  </span>
                  <button
                    onClick={handleResetQuiz}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                    title="Recommencer le quiz"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {currentModule.quiz.map((q, qIndex) => {
                const selectedOption = userQuizAnswers[q.id];
                const isCorrect = isSubmitted && selectedOption === q.correctIndex;
                const isWrong = isSubmitted && selectedOption !== undefined && selectedOption !== q.correctIndex;

                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">Q{qIndex + 1}.</span>
                      <p className="text-sm font-medium text-slate-200">{q.question}</p>
                    </div>

                    <div className="space-y-2 pl-5">
                      {q.options.map((opt, optIndex) => {
                        let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700';

                        if (selectedOption === optIndex) {
                          btnStyle = 'bg-slate-800 border-amber-500 text-white shadow-sm ring-1 ring-amber-500';
                        }

                        if (isSubmitted) {
                          if (optIndex === q.correctIndex) {
                            btnStyle = 'bg-emerald-950/60 border-emerald-600 text-emerald-200 font-semibold';
                          } else if (selectedOption === optIndex && selectedOption !== q.correctIndex) {
                            btnStyle = 'bg-red-950/60 border-red-600 text-red-200';
                          }
                        }

                        return (
                          <button
                            key={optIndex}
                            disabled={isSubmitted}
                            onClick={() => handleSelectQuizAnswer(q.id, optIndex)}
                            className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && optIndex === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isSubmitted && (
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 mt-2 space-y-1">
                        <p><strong className="text-amber-300">Explication :</strong> {q.explanation}</p>
                        {q.bccReference && (
                          <p className="text-[11px] text-slate-400 italic">Source : {q.bccReference}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!isSubmitted && (
              <button
                onClick={handleValidateQuiz}
                disabled={Object.keys(userQuizAnswers).length < currentModule.quiz.length}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:hover:bg-amber-400 rounded-xl transition-colors shadow-sm"
              >
                Valider mes Réponses
              </button>
            )}
          </div>
        )}
        </>
      )}
    </div>
  </div>
);
};
