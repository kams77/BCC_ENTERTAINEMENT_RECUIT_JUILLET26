import React from 'react';
import { Award, BookOpen, Code2, Database, CalendarDays, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'exercises' | 'reading' | 'exam' | 'datasets' | 'study-plan';
  setActiveTab: (tab: 'exercises' | 'reading' | 'exam' | 'datasets' | 'study-plan') => void;
  completedExercisesCount: number;
  totalExercisesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  completedExercisesCount,
  totalExercisesCount,
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Zone 1: Single text element wordmark */}
      <div 
        onClick={() => setActiveTab('exercises')}
        className="cursor-pointer flex items-center gap-3 shrink-0"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-bold text-slate-950 shadow-sm text-sm">
          BCC
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0">
            BCC DataPrep
          </span>
          <span className="text-[11px] text-amber-400 font-medium tracking-wider uppercase -mt-0.5">
            Banque Centrale du Congo · Admission
          </span>
        </div>
      </div>

      {/* Zone 2: 5 clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'exercises'
              ? 'text-amber-400 border-amber-400 font-semibold'
              : 'border-transparent hover:text-white hover:border-slate-600'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Exercices Pratiques</span>
        </button>

        <button
          onClick={() => setActiveTab('reading')}
          className={`flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'reading'
              ? 'text-amber-400 border-amber-400 font-semibold'
              : 'border-transparent hover:text-white hover:border-slate-600'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Matières à Lire</span>
        </button>

        <button
          onClick={() => setActiveTab('exam')}
          className={`flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'exam'
              ? 'text-amber-400 border-amber-400 font-semibold'
              : 'border-transparent hover:text-white hover:border-slate-600'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Examen Blanc</span>
        </button>

        <button
          onClick={() => setActiveTab('datasets')}
          className={`flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'datasets'
              ? 'text-amber-400 border-amber-400 font-semibold'
              : 'border-transparent hover:text-white hover:border-slate-600'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Données & Condensé</span>
        </button>

        <button
          onClick={() => setActiveTab('study-plan')}
          className={`flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'study-plan'
              ? 'text-amber-400 border-amber-400 font-semibold'
              : 'border-transparent hover:text-white hover:border-slate-600'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Plan de Révision</span>
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Progression :</span>
          <span className="font-semibold text-white tabular-nums">
            {completedExercisesCount}/{totalExercisesCount}
          </span>
        </div>
        <button
          onClick={() => setActiveTab('exam')}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-amber-500/20"
        >
          Lancer l'Examen Blanc
        </button>
      </div>
    </header>
  );
};
