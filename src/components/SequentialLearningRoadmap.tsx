import React from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  ArrowRight, 
  ShieldCheck, 
  Sliders, 
  BookOpen, 
  Code2, 
  Award, 
  Users, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { LEARNING_STEPS, LearningStep, isStepCompleted } from '../data/learningPath';
import { NavigationTab } from './Header';

interface SequentialLearningRoadmapProps {
  completedModules: Record<string, boolean>;
  completedExercises: Record<string, boolean>;
  hasPassedExam: boolean;
  masteredInterviewsCount: number;
  strictMode: boolean;
  onToggleStrictMode: () => void;
  onNavigateToStep: (tab: NavigationTab, targetId?: string) => void;
}

export const SequentialLearningRoadmap: React.FC<SequentialLearningRoadmapProps> = ({
  completedModules,
  completedExercises,
  hasPassedExam,
  masteredInterviewsCount,
  strictMode,
  onToggleStrictMode,
  onNavigateToStep,
}) => {
  // Compute completion status for each step
  const stepStatuses = LEARNING_STEPS.map((step, index) => {
    const isCompleted = isStepCompleted(
      step,
      completedModules,
      completedExercises,
      hasPassedExam,
      masteredInterviewsCount
    );

    // In strict mode, an item is unlocked if all previous steps are completed
    let isUnlocked = true;
    if (strictMode && index > 0) {
      for (let prevIdx = 0; prevIdx < index; prevIdx++) {
        if (!isStepCompleted(
          LEARNING_STEPS[prevIdx],
          completedModules,
          completedExercises,
          hasPassedExam,
          masteredInterviewsCount
        )) {
          isUnlocked = false;
          break;
        }
      }
    }

    return {
      ...step,
      isCompleted,
      isUnlocked,
    };
  });

  // Current active step = first unlocked step that is not yet completed
  const currentActiveStep = stepStatuses.find((s) => s.isUnlocked && !s.isCompleted) || stepStatuses[stepStatuses.length - 1];
  const completedCount = stepStatuses.filter((s) => s.isCompleted).length;
  const progressPct = Math.round((completedCount / (LEARNING_STEPS.length || 1)) * 100);

  const getStepIcon = (actionType: LearningStep['actionType']) => {
    switch (actionType) {
      case 'read_module':
        return <BookOpen className="w-4 h-4" />;
      case 'solve_exercise':
        return <Code2 className="w-4 h-4" />;
      case 'generate_note':
        return <FileText className="w-4 h-4" />;
      case 'pass_exam':
        return <Award className="w-4 h-4" />;
      case 'pass_interview':
        return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-6 shadow-md">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Parcours Pédagogique Linéaire & Verrouillage par Prérequis</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
            Ordre Logique d'Apprentissage par Priorité
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Chaque notion théorique débloque son application pratique correspondante. Aucune étape ne peut être abordée sans avoir validé les prérequis indispensables.
          </p>
        </div>

        {/* Strict Mode Toggle */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-950 border border-slate-800 self-start md:self-center shrink-0">
          <div className="text-right">
            <span className="text-xs font-semibold text-white block">
              {strictMode ? 'Mode Séquentiel Strict (Actif)' : 'Mode Libre (Débloqué)'}
            </span>
            <span className="text-[10px] text-slate-400">
              {strictMode ? 'Prérequis obligatoires respectés' : 'Navigation libre autorisée'}
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleStrictMode}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              strictMode ? 'bg-amber-400' : 'bg-slate-700'
            }`}
            title="Activer/Désactiver le verrouillage strict des étapes"
          >
            <div className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
              strictMode ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* Progress & Current Mission Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overall progress */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span>Progression du Cursus</span>
              <span className="font-mono text-amber-400 font-bold tabular-nums">{progressPct}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
              <div 
                className="h-full bg-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            <strong className="text-white tabular-nums">{completedCount}</strong> étapes franchies sur <strong className="text-white tabular-nums">{LEARNING_STEPS.length}</strong>
          </div>
        </div>

        {/* Current Active Step CTA */}
        <div className="md:col-span-2 p-4 rounded-xl bg-gradient-to-r from-amber-950/40 to-slate-950 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
              Votre Objectif Actuel en Cours (Étape {currentActiveStep.stepNumber})
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {currentActiveStep.title}
            </h3>
            <p className="text-xs text-slate-300 leading-snug">
              {currentActiveStep.description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToStep(currentActiveStep.targetTab, currentActiveStep.targetId)}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-md shrink-0"
          >
            <span>Lancer cette Étape</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sequential Steps List */}
      <div className="space-y-2.5">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          Chaîne Complète des 15 Paliers d'Apprentissage :
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {stepStatuses.map((step) => {
            const isCurrent = step.id === currentActiveStep.id && !step.isCompleted;

            return (
              <div
                key={step.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                  step.isCompleted
                    ? 'bg-slate-950/80 border-emerald-900/50 text-slate-300'
                    : isCurrent
                    ? 'bg-amber-950/30 border-amber-500/80 shadow-md ring-1 ring-amber-500/40'
                    : !step.isUnlocked
                    ? 'bg-slate-950/40 border-slate-900 opacity-60'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                      Étape {step.stepNumber}
                    </span>

                    {step.isCompleted ? (
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Validé</span>
                      </span>
                    ) : isCurrent ? (
                      <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1 animate-pulse">
                        <Play className="w-3 h-3 fill-current" />
                        <span>En cours</span>
                      </span>
                    ) : !step.isUnlocked ? (
                      <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>Verrouillé</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">Prêt</span>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">
                    {step.priorityLabel.split('·')[0]}
                  </span>

                  <h4 className="text-xs font-bold text-white mb-1 line-clamp-1">
                    {step.title}
                  </h4>

                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    {getStepIcon(step.actionType)}
                    <span className="truncate max-w-[120px]">{step.phaseName.split(':')[1] || step.phaseName}</span>
                  </div>

                  {step.isUnlocked ? (
                    <button
                      type="button"
                      onClick={() => onNavigateToStep(step.targetTab, step.targetId)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                        step.isCompleted
                          ? 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                          : 'text-slate-950 bg-amber-400 hover:bg-amber-300'
                      }`}
                    >
                      <span>{step.isCompleted ? 'Revoir' : 'Accéder'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-600 flex items-center gap-1 font-mono">
                      <Lock className="w-3 h-3" />
                      <span>Étape {step.stepNumber - 1} requise</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
