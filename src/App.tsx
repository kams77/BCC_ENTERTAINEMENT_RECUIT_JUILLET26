/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useState } from 'react';
import { Header, NavigationTab } from './components/Header';
import { ProgressBackup } from './components/ProgressBackup';
import { OfflineStatus } from './components/OfflineStatus';
import { ProgressionBadge } from './components/ProgressionBadge';
import { ProgressionDonutChart } from './components/ProgressionDonutChart';

import { exercises } from './data/exercises';
import { readingCurriculum } from './data/readingCurriculum';
import { mockExamQuestions } from './data/mockExam';
import { bccDatasets } from './data/bccDatasets';
import {
  STORAGE_KEYS,
  readBoolean,
  readJSON,
  writeBoolean,
  writeJSON,
} from './lib/storage';

import { GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';

// Chaque onglet est chargé à la demande : le premier affichage n'embarque que la feuille de route.
const SequentialLearningRoadmap = lazy(() =>
  import('./components/SequentialLearningRoadmap').then((m) => ({ default: m.SequentialLearningRoadmap }))
);
const ExerciseWorkspace = lazy(() =>
  import('./components/ExerciseWorkspace').then((m) => ({ default: m.ExerciseWorkspace }))
);
const ReadingModuleView = lazy(() =>
  import('./components/ReadingModuleView').then((m) => ({ default: m.ReadingModuleView }))
);
const MockExamSimulator = lazy(() =>
  import('./components/MockExamSimulator').then((m) => ({ default: m.MockExamSimulator }))
);
const DatasetExplorer = lazy(() =>
  import('./components/DatasetExplorer').then((m) => ({ default: m.DatasetExplorer }))
);
const StudyPlanView = lazy(() =>
  import('./components/StudyPlanView').then((m) => ({ default: m.StudyPlanView }))
);
const FormulaCheatSheet = lazy(() =>
  import('./components/FormulaCheatSheet').then((m) => ({ default: m.FormulaCheatSheet }))
);
const GovernorNoteGenerator = lazy(() =>
  import('./components/GovernorNoteGenerator').then((m) => ({ default: m.GovernorNoteGenerator }))
);
const LocalGuideView = lazy(() =>
  import('./components/LocalGuideView').then((m) => ({ default: m.LocalGuideView }))
);
const InterviewPrepView = lazy(() =>
  import('./components/InterviewPrepView').then((m) => ({ default: m.InterviewPrepView }))
);

const TabFallback: React.FC = () => (
  <div role="status" aria-live="polite" className="py-16 text-center text-sm text-slate-400">
    Chargement…
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('roadmap');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | undefined>(undefined);
  const [selectedModuleId, setSelectedModuleId] = useState<string | undefined>(undefined);

  // Mode strict : chaque étape terminée débloque la suivante (activé par défaut)
  const [strictMode, setStrictMode] = useState<boolean>(() => readBoolean(STORAGE_KEYS.strictMode, true));

  const handleToggleStrictMode = () => {
    setStrictMode((prev) => {
      const next = !prev;
      writeBoolean(STORAGE_KEYS.strictMode, next);
      return next;
    });
  };

  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>(() =>
    readJSON(STORAGE_KEYS.completedExercises, {})
  );
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>(() =>
    readJSON(STORAGE_KEYS.completedModules, {})
  );
  const [hasPassedExam, setHasPassedExam] = useState<boolean>(() =>
    readBoolean(STORAGE_KEYS.examPassed, false)
  );
  // Questions d'oral maîtrisées : état unique ici, pour que la feuille de route
  // se mette à jour immédiatement (avant, il n'était lu qu'au chargement de la page).
  const [masteredQuestions, setMasteredQuestions] = useState<Record<string, boolean>>(() =>
    readJSON(STORAGE_KEYS.masteredInterview, {})
  );
  const masteredInterviewsCount = Object.values(masteredQuestions).filter(Boolean).length;

  const handleToggleCompleteExercise = (exerciseId: string) => {
    setCompletedExercises((prev) => {
      const updated = { ...prev, [exerciseId]: !prev[exerciseId] };
      writeJSON(STORAGE_KEYS.completedExercises, updated);
      return updated;
    });
  };

  const handleToggleCompleteModule = (moduleId: string) => {
    setCompletedModules((prev) => {
      const updated = { ...prev, [moduleId]: !prev[moduleId] };
      writeJSON(STORAGE_KEYS.completedModules, updated);
      return updated;
    });
  };

  const handleToggleMastered = (questionId: string) => {
    setMasteredQuestions((prev) => {
      const updated = { ...prev, [questionId]: !prev[questionId] };
      writeJSON(STORAGE_KEYS.masteredInterview, updated);
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

  const quickNavTabs: { id: NavigationTab; label: string }[] = [
    { id: 'roadmap', label: 'Parcours Séquentiel' },
    { id: 'exercises', label: `Exercices (${completedExercisesCount}/${exercises.length})` },
    { id: 'reading', label: `Matières à Lire (${completedModulesCount}/${readingCurriculum.length})` },
    { id: 'formulas', label: 'Formules & Ratios' },
    { id: 'note-governor', label: 'Note Gouverneur' },
    { id: 'exam', label: 'Examen Blanc' },
    { id: 'interview', label: 'Entretien & Oral' },
    { id: 'datasets', label: 'Données BCC' },
    { id: 'study-plan', label: "Plan d'Étude" },
    { id: 'local-guide', label: 'Pack Local & GitHub' },
  ];

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

          {/* Barre de navigation rapide (petits et moyens écrans) */}
          <nav
            aria-label="Navigation rapide"
            className="flex xl:hidden items-center gap-2 mt-4 pt-4 border-t border-slate-800 overflow-x-auto text-xs"
          >
            {quickNavTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-current={activeTab === tab.id ? 'page' : undefined}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
                  activeTab === tab.id ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
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
        <Suspense fallback={<TabFallback />}>
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
            masteredQuestions={masteredQuestions}
            onToggleMastered={handleToggleMastered}
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
        </Suspense>
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
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-slate-900 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <OfflineStatus />
          <ProgressBackup />
        </div>
      </footer>
    </div>
  );
}
