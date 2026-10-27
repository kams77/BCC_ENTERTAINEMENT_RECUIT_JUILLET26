import React from 'react';
import { 
  Award, 
  BookOpen, 
  Code2, 
  Database, 
  CalendarDays, 
  CheckCircle2, 
  Laptop, 
  Calculator, 
  FileText,
  Users 
} from 'lucide-react';

export type NavigationTab = 
  | 'exercises' 
  | 'reading' 
  | 'formulas'
  | 'note-governor'
  | 'exam'
  | 'interview' 
  | 'datasets' 
  | 'study-plan'
  | 'local-guide';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
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
    <header className="sticky top-0 z-50 flex items-center justify-between gap-6 px-6 py-3 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
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
          <span className="text-[10px] text-amber-400 font-medium tracking-wider uppercase -mt-0.5">
            Banque Centrale du Congo · Admission
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden xl:flex items-center gap-5 text-xs font-medium text-slate-300">
        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'exercises'
              ? 'text-amber-400 border-amber-400 font-semibold'
              : 'border-transparent hover:text-white hover:border-slate-600'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Exercices</span>
        </button>

        <button
          onClick={() => setActiveTab('reading')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'reading'
              ? 'text-amber-400 border-amber-400 font-semibold'
              : 'border-transparent hover:text-white hover:border-slate-600'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Matières à Lire</span>
        </button>

        <button
          onClick={() => setActiveTab('formulas')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'formulas'
              ? 'text-amber-400 border-amber-400 font-semibold'
              : 'border-transparent hover:text-white hover:border-slate-600'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Formules & Ratios</span>
        </button>

        <button
          onClick={() => setActiveTab('note-governor')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'note-governor'
              ? 'text-amber-400 border-amber-400 font-semibold'
              : 'border-transparent hover:text-white hover:border-slate-600'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Note au Gouverneur</span>
        </button>

        <button
          onClick={() => setActiveTab('exam')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'exam'
              ? 'text-amber-400 border-amber-400 font-semibold'
              : 'border-transparent hover:text-white hover:border-slate-600'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Examen Blanc</span>
        </button>

        <button
          onClick={() => setActiveTab('interview')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'interview'
              ? 'text-amber-400 border-amber-400 font-semibold'
              : 'border-transparent hover:text-white hover:border-slate-600'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Entretien & Oral</span>
        </button>

        <button
          onClick={() => setActiveTab('datasets')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'datasets'
              ? 'text-amber-400 border-amber-400 font-semibold'
              : 'border-transparent hover:text-white hover:border-slate-600'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Données & Condensé</span>
        </button>

        <button
          onClick={() => setActiveTab('study-plan')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'study-plan'
              ? 'text-amber-400 border-amber-400 font-semibold'
              : 'border-transparent hover:text-white hover:border-slate-600'
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Plan de Révision</span>
        </button>

        <button
          onClick={() => setActiveTab('local-guide')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeTab === 'local-guide'
              ? 'text-amber-400 border-amber-400 font-semibold'
              : 'border-transparent hover:text-white hover:border-slate-600'
          }`}
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>Pack Local & GitHub</span>
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setActiveTab('local-guide')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-amber-500/20"
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>S'exercer en Local</span>
        </button>
      </div>
    </header>
  );
};
