import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  Code2, 
  Database, 
  CalendarDays, 
  Calculator, 
  FileText,
  Users,
  ShieldCheck,
  Laptop,
  Menu,
  X,
  Lock,
  Unlock,
  ExternalLink
} from 'lucide-react';

export type NavigationTab = 
  | 'roadmap'
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
  strictMode?: boolean;
  onToggleStrictMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  completedExercisesCount,
  totalExercisesCount,
  strictMode = true,
  onToggleStrictMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'roadmap', label: 'Parcours', icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> },
    { tab: 'exercises', label: 'Exercices', icon: <Code2 className="w-3.5 h-3.5" /> },
    { tab: 'reading', label: 'Matières à Lire', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { tab: 'formulas', label: 'Formules & Ratios', icon: <Calculator className="w-3.5 h-3.5" /> },
    { tab: 'note-governor', label: 'Note Gouverneur', icon: <FileText className="w-3.5 h-3.5" /> },
    { tab: 'exam', label: 'Examen Blanc', icon: <Award className="w-3.5 h-3.5" /> },
    { tab: 'interview', label: 'Grand Oral', icon: <Users className="w-3.5 h-3.5" /> },
    { tab: 'datasets', label: 'Données BCC', icon: <Database className="w-3.5 h-3.5" /> },
    { tab: 'study-plan', label: 'Calendrier', icon: <CalendarDays className="w-3.5 h-3.5" /> },
    { tab: 'local-guide', label: 'Pack Local & GitHub', icon: <Laptop className="w-3.5 h-3.5" /> },
  ];

  const handleSelectTab = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between gap-6 px-4 lg:px-8 py-2.5 bg-slate-950/95 backdrop-blur-md border-b border-amber-500/20 shadow-lg shadow-black/40">
        {/* Zone 1: Sovereign Brand Mark & Seal */}
        <div 
          onClick={() => handleSelectTab('roadmap')}
          className="cursor-pointer flex items-center gap-3 shrink-0 group"
          title="Banque Centrale du Congo - Portail d'Admission"
        >
          {/* Official BCC Seal Emblem */}
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-md shadow-amber-500/20 flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {/* Central Bank Shield & Star Motif */}
                <path d="M12 2L4 5v6.5C4 17 7.5 21 12 22c4.5-1 8-5 8-10.5V5l-8-3z" stroke="currentColor" fill="rgba(245, 158, 11, 0.1)" />
                <polygon points="12,7 13.5,10.5 17,11 14.5,13.5 15,17 12,15 9,17 9.5,13.5 7,11 10.5,10.5" fill="currentColor" stroke="none" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-sovereign text-sm lg:text-base font-bold tracking-wider text-amber-400 whitespace-nowrap shrink-0 drop-shadow-sm">
              BANQUE CENTRALE DU CONGO
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase -mt-0.5">
              Institut d'Émission · Admission Data Analyste
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links for Large Viewports */}
        <nav className="hidden 2xl:flex items-center gap-5 text-xs font-medium text-slate-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleSelectTab(item.tab)}
                className={`flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  isActive
                    ? 'text-amber-400 border-amber-400 font-semibold'
                    : 'border-transparent text-slate-300 hover:text-white hover:border-slate-600'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Medium Viewport Tabs (Prioritized) */}
        <nav className="hidden md:flex 2xl:hidden items-center gap-3 text-xs font-medium text-slate-300">
          <button
            onClick={() => handleSelectTab('roadmap')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap py-1 border-b-2 ${
              activeTab === 'roadmap' ? 'text-amber-400 border-amber-400 font-semibold' : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Parcours</span>
          </button>
          <button
            onClick={() => handleSelectTab('exercises')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap py-1 border-b-2 ${
              activeTab === 'exercises' ? 'text-amber-400 border-amber-400 font-semibold' : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Exercices</span>
          </button>
          <button
            onClick={() => handleSelectTab('reading')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap py-1 border-b-2 ${
              activeTab === 'reading' ? 'text-amber-400 border-amber-400 font-semibold' : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Théorie</span>
          </button>
          <button
            onClick={() => handleSelectTab('exam')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap py-1 border-b-2 ${
              activeTab === 'exam' ? 'text-amber-400 border-amber-400 font-semibold' : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Examen</span>
          </button>
          <button
            onClick={() => handleSelectTab('interview')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap py-1 border-b-2 ${
              activeTab === 'interview' ? 'text-amber-400 border-amber-400 font-semibold' : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Oral Jury</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Strict Mode Toggle Button */}
          {onToggleStrictMode && (
            <button
              onClick={onToggleStrictMode}
              type="button"
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                strictMode
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-950/60'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title={strictMode ? 'Mode Séquentiel Strict ACTIF (Déblocage linéaire obligatoire)' : 'Mode Libre ACTIF (Tous les modules ouverts)'}
            >
              {strictMode ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3 text-slate-400" />}
              <span className="hidden lg:inline">{strictMode ? 'Mode Séquentiel' : 'Mode Libre'}</span>
            </button>
          )}

          {/* Primary Action Button */}
          <button
            onClick={() => handleSelectTab('local-guide')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all whitespace-nowrap shrink-0 shadow-md shadow-amber-500/20 active:scale-95"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Pack Local & GitHub</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="2xl:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Ouvrir le menu de navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile / Tablet Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="2xl:hidden fixed inset-x-0 top-[53px] z-40 bg-slate-950/98 border-b border-amber-500/20 p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="max-w-md mx-auto flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-slate-800 text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-amber-400 text-[10px]">
                Programme d'Admission BCC
              </span>
              {onToggleStrictMode && (
                <button
                  onClick={onToggleStrictMode}
                  className="flex items-center gap-1 text-xs text-amber-300 hover:underline"
                >
                  {strictMode ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                  <span>{strictMode ? 'Séquentiel actif' : 'Mode libre'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {navItems.map((item) => (
                <button
                  key={item.tab}
                  onClick={() => handleSelectTab(item.tab)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-left transition-colors ${
                    activeTab === item.tab
                      ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
