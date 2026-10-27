/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ExerciseWorkspace } from './components/ExerciseWorkspace';
import { ReadingModuleView } from './components/ReadingModuleView';
import { MockExamSimulator } from './components/MockExamSimulator';
import { DatasetExplorer } from './components/DatasetExplorer';
import { StudyPlanView } from './components/StudyPlanView';

import { exercises } from './data/exercises';
import { readingCurriculum } from './data/readingCurriculum';
import { mockExamQuestions } from './data/mockExam';
import { bccDatasets } from './data/bccDatasets';

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
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'exercises' | 'reading' | 'exam' | 'datasets' | 'study-plan'>('exercises');

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

  const completedExercisesCount = Object.values(completedExercises).filter(Boolean).length;
  const completedModulesCount = Object.values(completedModules).filter(Boolean).length;

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

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center min-w-[90px]">
                <div className="text-lg font-bold text-amber-400 font-mono tabular-nums">
                  {completedExercisesCount}/{exercises.length}
                </div>
                <div className="text-[11px] text-slate-400">TP Validés</div>
              </div>

              <div className="px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center min-w-[90px]">
                <div className="text-lg font-bold text-emerald-400 font-mono tabular-nums">
                  {completedModulesCount}/{readingCurriculum.length}
                </div>
                <div className="text-[11px] text-slate-400">Fiches Lues</div>
              </div>
            </div>
          </div>

          {/* Quick Sub-navigation Bar for small viewports */}
          <div className="flex lg:hidden items-center gap-2 mt-4 pt-4 border-t border-slate-800 overflow-x-auto text-xs">
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
              onClick={() => setActiveTab('exam')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 ${
                activeTab === 'exam' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Examen Blanc
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
          </div>
        </section>

        {/* Tab Viewport */}
        {activeTab === 'exercises' && (
          <ExerciseWorkspace
            exercises={exercises}
            completedExercises={completedExercises}
            onToggleComplete={handleToggleCompleteExercise}
          />
        )}

        {activeTab === 'reading' && (
          <ReadingModuleView
            modules={readingCurriculum}
            completedModules={completedModules}
            onToggleCompleteModule={handleToggleCompleteModule}
          />
        )}

        {activeTab === 'exam' && (
          <MockExamSimulator questions={mockExamQuestions} />
        )}

        {activeTab === 'datasets' && (
          <DatasetExplorer datasets={bccDatasets} />
        )}

        {activeTab === 'study-plan' && (
          <StudyPlanView onNavigateToTab={setActiveTab} />
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
