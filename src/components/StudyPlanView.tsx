import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Target, 
  Lightbulb, 
  ArrowRight,
  BookOpen,
  Code2,
  Award
} from 'lucide-react';
import { studyPlans, StudyPlan } from '../data/studyPlans';
import { STORAGE_KEYS, readJSON, writeJSON } from '../lib/storage';

interface StudyPlanViewProps {
  onNavigateToTab: (tab: 'exercises' | 'reading' | 'exam') => void;
}

export const StudyPlanView: React.FC<StudyPlanViewProps> = ({ onNavigateToTab }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<'plan-7-days' | 'plan-14-days'>('plan-14-days');
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() =>
    readJSON(STORAGE_KEYS.studyTasks, {})
  );

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev, [taskId]: !prev[taskId] };
      writeJSON(STORAGE_KEYS.studyTasks, updated);
      return updated;
    });
  };

  const currentPlan = studyPlans.find((p) => p.id === selectedPlanId) || studyPlans[1];

  // Progress metrics
  const totalActions = currentPlan.days.reduce((acc, d) => acc + d.keyActions.length, 0);
  const doneActions = currentPlan.days.reduce((acc, d) => {
    return acc + d.keyActions.filter((_, idx) => completedTasks[`${currentPlan.id}_d${d.dayNumber}_a${idx}`]).length;
  }, 0);
  const progressPct = Math.round((doneActions / (totalActions || 1)) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Plan Header & Switcher */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Feuille de Route Personnalisée
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Planning de Révision pour l'Admission BCC
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Programme méthodique synchronisant lectures théoriques, exercices de code SQL/Pandas et examens blancs chronométrés.
          </p>
        </div>

        {/* Plan Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setSelectedPlanId('plan-7-days')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              selectedPlanId === 'plan-7-days'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sprint 7 Jours
          </button>
          <button
            onClick={() => setSelectedPlanId('plan-14-days')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              selectedPlanId === 'plan-14-days'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Programme 14 Jours (Recommandé)
          </button>
        </div>
      </div>

      {/* Progress & Strategy Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Progression du Programme</span>
              <span className="font-mono text-amber-400 font-bold">{progressPct}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden">
              <div 
                className="h-full bg-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            <strong className="text-white tabular-nums">{doneActions}</strong> actions terminées sur <strong className="text-white tabular-nums">{totalActions}</strong>
          </div>
        </div>

        <div className="md:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Recommandations Clés du Jury d'Admission :</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {currentPlan.strategyTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">·</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Days Schedule Timeline */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>Calendrier Détaillé Jour par Jour</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentPlan.days.map((day) => {
            const allDayActionsDone = day.keyActions.every((_, idx) =>
              completedTasks[`${currentPlan.id}_d${day.dayNumber}_a${idx}`]
            );

            return (
              <div
                key={day.dayNumber}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  allDayActionsDone
                    ? 'bg-slate-900/40 border-emerald-900/50'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                      Jour {day.dayNumber}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="tabular-nums">~{day.estimatedHours}h d'étude</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">
                    {day.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    {day.focus}
                  </p>

                  {/* Checklist of Actions */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Objectifs du jour :
                    </span>
                    {day.keyActions.map((action, aIdx) => {
                      const taskId = `${currentPlan.id}_d${day.dayNumber}_a${aIdx}`;
                      const isChecked = !!completedTasks[taskId];

                      return (
                        <button
                          key={aIdx}
                          onClick={() => toggleTask(taskId)}
                          className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-start gap-2.5 transition-colors ${
                            isChecked
                              ? 'bg-emerald-950/30 border-emerald-800/50 text-slate-300 line-through'
                              : 'bg-slate-950/60 border-slate-800/80 text-slate-200 hover:bg-slate-800/40'
                          }`}
                        >
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isChecked ? 'text-emerald-400' : 'text-slate-600'
                          }`} />
                          <span className="leading-snug">{action}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Navigation Links */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/60 text-xs">
                  {day.readingModules.length > 0 && (
                    <button
                      onClick={() => onNavigateToTab('reading')}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Lire le module</span>
                    </button>
                  )}
                  {day.recommendedExercises.length > 0 && (
                    <button
                      onClick={() => onNavigateToTab('exercises')}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1 ml-auto"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Faire l'exercice</span>
                    </button>
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
