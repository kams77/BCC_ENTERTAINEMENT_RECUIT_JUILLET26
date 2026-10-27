/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, NavigationTab } from './components/Header';
import { ExerciseWorkspace } from './components/ExerciseWorkspace';
import { ReadingModuleView } from './components/ReadingModuleView';
import { MockExamSimulator } from './components/MockExamSimulator';
import { DatasetExplorer } from './components/DatasetExplorer';
import { StudyPlanView } from './components/StudyPlanView';
import { FormulaCheatSheet } from './components/FormulaCheatSheet';
import { GovernorNoteGenerator } from './components/GovernorNoteGenerator';
import { LocalGuideView } from './components/LocalGuideView';
import { ProgressionBadge } from './components/ProgressionBadge';
import { ProgressionDonutChart } from './components/ProgressionDonutChart';
import { InterviewPrepView } from './components/InterviewPrepView';
import { SequentialLearningRoadmap } from './components/SequentialLearningRoadmap';

import { exercises } from './data/exercises';
import { readingCurriculum } from './data/readingCurriculum';
import { mockExamQuestions } from './data/mockExam';
import { bccDatasets } from './data/bccDatasets';
import { LEARNING_STEPS, isStepCompleted } from './data/learningPath';

import { 
  Award, 
  BookOpen, 
  Code2, 
  Database, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  TrendingUp, 
  ShieldAlert,
  GraduationCap,
  Calculator,
  FileText,
  Laptop,
  ShieldCheck,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('roadmap');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | undefined>(undefined);
  const [selectedModuleId, setSelectedModuleId] = useState<string | undefined>(undefined);

  // Strict mode: requires prerequisites before unlocking subsequent steps
  const [strictMode, setStrictMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('bcc_prep_strict_mode');
      return saved !== null ? saved === 'true' : true; // Default true: strict progression
    } catch {
      return true;
    }
  });

  const handleToggleStrictMode = () => {
    setStrictMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('bcc_prep_strict_mode', String(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  // Persisted state for completed exercises
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('bcc_prep_completed_exercises');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persisted state for read modules
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('bcc_prep_completed_modules');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track exam passed
  const [hasPassedExam, setHasPassedExam] = useState<boolean>(() => {
    try {
      return localStorage.getItem('bcc_prep_exam_passed') === 'true';
    } catch {
      return false;
    }
  });

  // Track mastered interviews count
  const [masteredInterviewsCount, setMasteredInterviewsCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('bcc_prep_mastered_interview');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Object.values(parsed).filter(Boolean).length;
      }
      return 0;
    } catch {
      return 0;
    }
  });

  const handleToggleCompleteExercise = (exerciseId: string) => {
    setCompletedExercises((prev) => {
      const updated = { ...prev, [exerciseId]: !prev[exerciseId] };
      try {
        localStorage.setItem('bcc_prep_completed_exercises', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const handleToggleCompleteModule = (moduleId: string) => {
    setCompletedModules((prev) => {
      const updated = { ...prev, [moduleId]: !prev[moduleId] };
      try {
        localStorage.setItem('bcc_prep_completed_modules', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const handleNavigateToStep = (tab: NavigationTab, targetId?: string) => {
    if (tab === 'exercises' && targetId) {
      setSelectedExerciseId(targetId);
    }
    if (tab === 'reading' && targetId) {
      setSelectedModuleId(targetId);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completedExercisesCount = Object.values(completedExercises).filter(Boolean).length;
  const completedModulesCount = Object.values(completedModules).filter(Boolean).length;

  // Prerequisites gating
  const isNoteUnlocked = !strictMode || !!completedModules['module-6-methodologie-admission'];
  const isExamUnlocked = !strictMode || (completedModulesCount >= 4 && completedExercisesCount >= 4);
  const isInterviewUnlocked = !strictMode || hasPassedExam;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedExercisesCount={completedExercisesCount}
        totalExercisesCount={exercises.length}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Candidate Welcome Banner */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wider uppercase">
                <GraduationCap className="w-4 h-4" />
                <span>Candidat Data Analyste · Concours d'Admission BCC RDC</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Plateforme Officieuse d'Entraînement & de Révision Intensive
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Préparez-vous à exceller aux épreuves techniques : traitement de données financières en Francs Congolais (CDF) et Dollars (USD), calcul des ratios de solvabilité Bâle II/III, adjudication des Bons BCC et modélisation économétrique.
              </p>
            </div>

            {/* Quick Visuals: Donut Chart & Progression Badge */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <ProgressionDonutChart
                completedExercisesCount={completedExercisesCount}
                totalExercisesCount={exercises.length}
                completedModulesCount={completedModulesCount}
                totalModulesCount={readingCurriculum.length}
              />

              <ProgressionBadge
                completedExercisesCount={completedExercisesCount}
                totalExercisesCount={exercises.length}
                completedModulesCount={completedModulesCount}
                totalModulesCount={readingCurriculum.length}
              />
            </div>
          </div>

          {/* Quick Sub-navigation Bar for small/medium viewports */}
          <div className="flex xl:hidden items-center gap-2 mt-4 pt-4 border-t border-slate-800 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'roadmap' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Parcours Séquentiel</span>
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
                activeTab === 'exercises' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Exercices ({completedExercisesCount}/{exercises.length})
            </button>
            <button
              onClick={() => setActiveTab('reading')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
                activeTab === 'reading' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Matières à Lire ({completedModulesCount}/{readingCurriculum.length})
            </button>
            <button
              onClick={() => setActiveTab('formulas')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
                activeTab === 'formulas' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Formules & Ratios
            </button>
            <button
              onClick={() => setActiveTab('note-governor')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
                activeTab === 'note-governor' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Note Gouverneur
            </button>
            <button
              onClick={() => setActiveTab('exam')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
                activeTab === 'exam' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Examen Blanc
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
                activeTab === 'interview' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Entretien & Oral
            </button>
            <button
              onClick={() => setActiveTab('datasets')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
                activeTab === 'datasets' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Données BCC
            </button>
            <button
              onClick={() => setActiveTab('study-plan')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
                activeTab === 'study-plan' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Plan d'Étude
            </button>
            <button
              onClick={() => setActiveTab('local-guide')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
                activeTab === 'local-guide' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Pack Local & GitHub
            </button>
          </div>
        </section>

        {/* Global Progression Alert Banner when not on roadmap */}
        {activeTab !== 'roadmap' && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong className="text-white">Ordre Pédagogique Linéaire : </strong>
                {strictMode ? (
                  <span className="text-amber-300 font-medium">Mode Strict Actif (Chaque étape terminée débloque la suivante)</span>
                ) : (
                  <span className="text-slate-400">Mode Libre Débloqué</span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleStrictMode}
                className="text-[11px] text-slate-400 hover:text-slate-200 underline"
              >
                {strictMode ? 'Passer en Mode Libre' : 'Activer Mode Strict'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('roadmap')}
                className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20"
              >
                <span>Chaîne des 15 Paliers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab Viewport */}
        {activeTab === 'roadmap' && (
          <SequentialLearningRoadmap
            completedModules={completedModules}
            completedExercises={completedExercises}
            hasPassedExam={hasPassedExam}
            masteredInterviewsCount={masteredInterviewsCount}
            strictMode={strictMode}
            onToggleStrictMode={handleToggleStrictMode}
            onNavigateToStep={handleNavigateToStep}
          />
        )}

        {activeTab === 'exercises' && (
          <ExerciseWorkspace
            exercises={exercises}
            completedExercises={completedExercises}
            completedModules={completedModules}
            strictMode={strictMode}
            initialExerciseId={selectedExerciseId}
            onToggleComplete={handleToggleCompleteExercise}
            onNavigateToModule={(modId) => handleNavigateToStep('reading', modId)}
          />
        )}

        {activeTab === 'reading' && (
          <ReadingModuleView
            modules={readingCurriculum}
            completedModules={completedModules}
            strictMode={strictMode}
            initialModuleId={selectedModuleId}
            onToggleCompleteModule={handleToggleCompleteModule}
            onNavigateToExercise={(exoId) => handleNavigateToStep('exercises', exoId)}
          />
        )}

        {activeTab === 'formulas' && (
          <FormulaCheatSheet />
        )}

        {activeTab === 'note-governor' && (
          <GovernorNoteGenerator
            strictMode={strictMode}
            isUnlocked={isNoteUnlocked}
            onNavigateToRoadmap={() => setActiveTab('roadmap')}
          />
        )}

        {activeTab === 'exam' && (
          <MockExamSimulator
            questions={mockExamQuestions}
            strictMode={strictMode}
            isUnlocked={isExamUnlocked}
            prerequisiteMessage="Pour se présenter à l'épreuve écrite d'admission dans des conditions réelles, vous devez valider au moins 4 modules théoriques et 4 exercices pratiques."
            onNavigateToPrerequisites={() => setActiveTab('roadmap')}
            onExamPassed={() => setHasPassedExam(true)}
          />
        )}

        {activeTab === 'interview' && (
          <InterviewPrepView
            strictMode={strictMode}
            isUnlocked={isInterviewUnlocked}
            onNavigateToRoadmap={() => setActiveTab('roadmap')}
          />
        )}

        {activeTab === 'datasets' && (
          <DatasetExplorer datasets={bccDatasets} />
        )}

        {activeTab === 'study-plan' && (
          <StudyPlanView onNavigateToTab={setActiveTab} />
        )}

        {activeTab === 'local-guide' && (
          <LocalGuideView />
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">BCC DataPrep</span>
            <span>—</span>
            <span>Préparation au Concours de Recrutement Data Analyste</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Banque Centrale du Congo</span>
            <span>·</span>
            <span>Boulevard Colonel Tshatshi, Gombe, Kinshasa</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
