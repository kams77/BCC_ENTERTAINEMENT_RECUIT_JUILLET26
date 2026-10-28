import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Play, 
  Pause, 
  Flame, 
  Zap, 
  Hourglass, 
  TrendingUp, 
  AlertTriangle,
  History,
  Timer as TimerIcon,
  HelpCircle,
  Building,
  Lock,
  ArrowRight
} from 'lucide-react';
import { ExamQuestion } from '../types';
import { STORAGE_KEYS, writeBoolean } from '../lib/storage';

interface MockExamSimulatorProps {
  questions: ExamQuestion[];
  strictMode?: boolean;
  isUnlocked?: boolean;
  prerequisiteMessage?: string;
  onNavigateToPrerequisites?: () => void;
  onExamPassed?: () => void;
}

export type ExamDurationMode = 'sprint-20' | 'standard-30' | 'deep-45' | 'free';

export const MockExamSimulator: React.FC<MockExamSimulatorProps> = ({ 
  questions,
  strictMode = true,
  isUnlocked = true,
  prerequisiteMessage,
  onNavigateToPrerequisites,
  onExamPassed,
}) => {
  const [examState, setExamState] = useState<'intro' | 'running' | 'completed'>('intro');
  const [selectedDurationMode, setSelectedDurationMode] = useState<ExamDurationMode>('standard-30');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});

  // Time state
  const [initialTimeSeconds, setInitialTimeSeconds] = useState<number>(30 * 60);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(30 * 60);
  const [elapsedTotalSeconds, setElapsedTotalSeconds] = useState<number>(0);
  
  // Tracking per question: records total seconds spent on each question id
  const [timeSpentPerQuestion, setTimeSpentPerQuestion] = useState<Record<string, number>>({});
  const [activeQuestionSeconds, setActiveQuestionSeconds] = useState<number>(0);

  // Sound/Vibration alert toggles
  const [audioAlertsEnabled, setAudioAlertsEnabled] = useState<boolean>(true);
  const [lastAlertFired, setLastAlertFired] = useState<string | null>(null);

  // Active question timer tracker
  const currentQ = questions[currentIndex];

  // Tick timer every second
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (examState === 'running' && !isPaused) {
      interval = setInterval(() => {
        // Increment question-specific time
        setActiveQuestionSeconds((prev) => prev + 1);

        // Track total elapsed
        setElapsedTotalSeconds((prev) => prev + 1);

        // If not in free mode, countdown
        if (selectedDurationMode !== 'free') {
          setTimeLeftSeconds((prev) => {
            if (prev <= 1) {
              clearInterval(interval!);
              handleSubmitExam();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [examState, isPaused, selectedDurationMode]);

  // Sync active question seconds into dictionary whenever index changes
  const switchQuestion = (newIndex: number) => {
    if (newIndex === currentIndex) return;

    // Save active question time
    if (currentQ) {
      setTimeSpentPerQuestion((prev) => ({
        ...prev,
        [currentQ.id]: (prev[currentQ.id] || 0) + activeQuestionSeconds,
      }));
    }

    setActiveQuestionSeconds(0);
    setCurrentIndex(newIndex);
  };

  const handleStartExam = () => {
    let initialSecs = 30 * 60;
    if (selectedDurationMode === 'sprint-20') initialSecs = 20 * 60;
    if (selectedDurationMode === 'deep-45') initialSecs = 45 * 60;
    if (selectedDurationMode === 'free') initialSecs = 0;

    setInitialTimeSeconds(initialSecs);
    setTimeLeftSeconds(initialSecs);
    setElapsedTotalSeconds(0);
    setActiveQuestionSeconds(0);
    setTimeSpentPerQuestion({});
    setUserAnswers({});
    setCurrentIndex(0);
    setIsPaused(false);
    setExamState('running');
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitExam = () => {
    // Record current active question time
    if (currentQ) {
      setTimeSpentPerQuestion((prev) => ({
        ...prev,
        [currentQ.id]: (prev[currentQ.id] || 0) + activeQuestionSeconds,
      }));
    }
    setIsPaused(false);
    setExamState('completed');

    // Calculate pass status (>= 70%) and record
    const totalPts = questions.reduce((acc, q) => acc + q.points, 0);
    const earnedPts = questions.reduce((acc, q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        return acc + q.points;
      }
      return acc;
    }, 0);
    if ((earnedPts / (totalPts || 1)) >= 0.70) {
      writeBoolean(STORAGE_KEYS.examPassed, true);
      onExamPassed?.();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculated metrics
  const totalPoints = questions.reduce((acc, q) => acc + q.points, 0);
  const earnedPoints = questions.reduce((acc, q) => {
    if (userAnswers[q.id] === q.correctIndex) {
      return acc + q.points;
    }
    return acc;
  }, 0);
  const scorePercentage = Math.round((earnedPoints / totalPoints) * 100);
  const isAdmitted = scorePercentage >= 70; // 70% threshold

  // Time metrics
  const totalAnswered = Object.keys(userAnswers).length;
  const questionsRemaining = questions.length - totalAnswered;
  const avgPaceRemaining = selectedDurationMode !== 'free' && questionsRemaining > 0 
    ? Math.round(timeLeftSeconds / questionsRemaining) 
    : 0;

  // Pressure state
  const isCriticalTime = selectedDurationMode !== 'free' && timeLeftSeconds <= 300 && timeLeftSeconds > 0; // <= 5 min
  const isLastMinute = selectedDurationMode !== 'free' && timeLeftSeconds <= 60 && timeLeftSeconds > 0; // <= 1 min

  // Recommended pace per question
  const recommendedSecsPerQ = selectedDurationMode === 'sprint-20' 
    ? 80 
    : selectedDurationMode === 'standard-30' 
    ? 120 
    : 180;
  
  const isQuestionTakingTooLong = activeQuestionSeconds > recommendedSecsPerQ * 1.5;

  // Section breakdown
  const sections = [
    'Partie 1: Réglementation & Missions BCC',
    'Partie 2: Calculs Financiers & Ratios',
    'Partie 3: Analyse de Données & SQL/Python'
  ] as const;

  const sectionScores = sections.map((sec) => {
    const secQuestions = questions.filter((q) => q.section === sec);
    const secTotal = secQuestions.reduce((a, b) => a + b.points, 0);
    const secEarned = secQuestions.reduce((a, b) => (userAnswers[b.id] === b.correctIndex ? a + b.points : a), 0);
    const secTime = secQuestions.reduce((a, b) => a + (timeSpentPerQuestion[b.id] || 0), 0);

    return {
      section: sec,
      earned: secEarned,
      total: secTotal,
      percentage: Math.round((secEarned / (secTotal || 1)) * 100),
      timeSpent: secTime,
    };
  });

  // Find longest & fastest questions
  interface QuestionTimeStat {
    id: string;
    time: number;
    index: number;
  }

  let slowestQuestion: QuestionTimeStat | null = null;
  let fastestQuestion: QuestionTimeStat | null = null;

  for (let idx = 0; idx < questions.length; idx++) {
    const q = questions[idx];
    const t = timeSpentPerQuestion[q.id] || 0;
    if (t > 0) {
      if (!slowestQuestion || t > (slowestQuestion as QuestionTimeStat).time) {
        slowestQuestion = { id: q.id, time: t, index: idx + 1 };
      }
      if (!fastestQuestion || t < (fastestQuestion as QuestionTimeStat).time) {
        fastestQuestion = { id: q.id, time: t, index: idx + 1 };
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ---------------- INTRO SCREEN & MODE SELECTION ---------------- */}
      {examState === 'intro' && (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto">
            <TimerIcon className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Simulateur d'Examen Blanc · Conditions Réelles du Concours BCC
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto mt-2 leading-relaxed">
              Choisissez votre niveau de pression temporelle pour vous entraîner à la cadence et au stress d'admission à la Banque Centrale du Congo.
            </p>
          </div>

          {/* Mode Selection Cards */}
          <div className="text-left space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              1. Sélectionnez le Niveau de Pression Temporelle :
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Option 1: Standard */}
              <button
                type="button"
                onClick={() => setSelectedDurationMode('standard-30')}
                className={`p-4 rounded-xl border transition-all text-left flex flex-col justify-between ${
                  selectedDurationMode === 'standard-30'
                    ? 'bg-amber-950/40 border-amber-500 shadow-md ring-1 ring-amber-500'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>30 Minutes</span>
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300">
                      Standard BCC
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">Cadence Concours Officiel</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    2 minutes par question. Rythme officiel recommandé par la DRH de la Banque Centrale du Congo.
                  </p>
                </div>
              </button>

              {/* Option 2: Sprint Pression Maximale */}
              <button
                type="button"
                onClick={() => setSelectedDurationMode('sprint-20')}
                className={`p-4 rounded-xl border transition-all text-left flex flex-col justify-between ${
                  selectedDurationMode === 'sprint-20'
                    ? 'bg-red-950/40 border-red-500 shadow-md ring-1 ring-red-500'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      <span>20 Minutes</span>
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-red-400/10 text-red-300">
                      Haute Pression
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">Sprint Admission Express</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    1 min 20s par question. Simule l'imprévu, le stress d'examen et teste la rapidité de calcul mental financier.
                  </p>
                </div>
              </button>

              {/* Option 3: Deep Review */}
              <button
                type="button"
                onClick={() => setSelectedDurationMode('deep-45')}
                className={`p-4 rounded-xl border transition-all text-left flex flex-col justify-between ${
                  selectedDurationMode === 'deep-45'
                    ? 'bg-blue-950/40 border-blue-500 shadow-md ring-1 ring-blue-500'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-blue-400 flex items-center gap-1">
                      <Hourglass className="w-3.5 h-3.5" />
                      <span>45 Minutes</span>
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-400/10 text-blue-300">
                      Approfondi
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">Préparation Méthodique</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    3 minutes par question. Idéal pour vérifier posément les équations de Bâle et les requêtes SQL.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Key Exam Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block mb-1">
                Volume de l'Épreuve
              </span>
              <div className="text-lg font-bold text-white font-mono">15 Questions</div>
              <p className="text-xs text-slate-400 mt-1">Loi 18/027, Ratios de Solvabilité CAR, NPL, SQL & Pandas.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block mb-1">
                Barème d'Admissibilité
              </span>
              <div className="text-lg font-bold text-white font-mono">70 % Requis</div>
              <p className="text-xs text-slate-400 mt-1">Seuil minimal strict d'accès à l'entretien avec le jury.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block mb-1">
                Suivi Temporel Actif
              </span>
              <div className="text-lg font-bold text-white font-mono">Chrono par Question</div>
              <p className="text-xs text-slate-400 mt-1">Bilan analytique de votre cadence et gestion du stress en fin d'épreuve.</p>
            </div>
          </div>

          {strictMode && !isUnlocked ? (
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-amber-500/40 text-center max-w-xl mx-auto flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
                  Étape 14 · Examen d'Admissibilité Écrite
                </span>
                <h4 className="text-base font-bold text-white mb-1">
                  Épreuve Finale Verrouillée
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {prerequisiteMessage || "Pour se présenter à l'épreuve écrite d'admission dans des conditions réelles, vous devez d'abord valider les modules théoriques et exercices techniques préalables."}
                </p>
              </div>

              {onNavigateToPrerequisites && (
                <button
                  type="button"
                  onClick={onNavigateToPrerequisites}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-md"
                >
                  <span>Consulter le Parcours Séquentiel</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={handleStartExam}
              className="w-full md:w-auto md:px-8 py-3.5 mx-auto text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Démarrer l'Épreuve sous Chronomètre</span>
            </button>
          )}
        </div>
      )}

      {/* ---------------- ACTIVE EXAM RUNNING ---------------- */}
      {examState === 'running' && (
        <div className="flex flex-col gap-4">
          {/* Top Interactive Timer Bar */}
          <div className={`p-4 rounded-2xl border transition-all duration-300 flex flex-wrap items-center justify-between gap-4 ${
            isLastMinute
              ? 'bg-red-950/60 border-red-600 ring-2 ring-red-500/50 animate-pulse'
              : isCriticalTime
              ? 'bg-amber-950/40 border-amber-500/80'
              : 'bg-slate-900 border-slate-800'
          }`}>
            {/* Left: Overall Countdown */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
                isLastMinute
                  ? 'bg-red-900 text-white border-red-500'
                  : isCriticalTime
                  ? 'bg-amber-900/60 text-amber-200 border-amber-600'
                  : 'bg-slate-950 text-slate-200 border-slate-800'
              }`}>
                <Clock className={`w-4 h-4 ${isLastMinute ? 'text-white animate-spin' : isCriticalTime ? 'text-amber-400' : 'text-amber-400'}`} />
                <span className="font-mono text-lg font-bold tabular-nums">
                  {formatTime(timeLeftSeconds)}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Restant
                </span>
              </div>

              {/* Pause / Resume Button */}
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{isPaused ? 'Reprendre' : 'Pause'}</span>
              </button>

              {isCriticalTime && (
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-red-400 animate-pulse">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Pression Max : &lt; 5 min !</span>
                </div>
              )}
            </div>

            {/* Right: Question Specific Timer & Pacing */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <TimerIcon className={`w-3.5 h-3.5 ${isQuestionTakingTooLong ? 'text-red-400' : 'text-slate-400'}`} />
                <span className="text-slate-400">Temps question :</span>
                <span className={`font-mono font-bold tabular-nums ${isQuestionTakingTooLong ? 'text-red-400' : 'text-white'}`}>
                  {formatTime(activeQuestionSeconds + (timeSpentPerQuestion[currentQ.id] || 0))}
                </span>
                <span className="text-[11px] text-slate-500">
                  (~{Math.floor(recommendedSecsPerQ / 60)}m{recommendedSecsPerQ % 60}s conseillé)
                </span>
              </div>

              <button
                type="button"
                onClick={handleSubmitExam}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
              >
                Rendre ma Copie
              </button>
            </div>
          </div>

          {/* If Paused Overlay */}
          {isPaused ? (
            <div className="p-12 rounded-2xl bg-slate-900/90 border border-slate-800 text-center flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Pause className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-white">Épreuve Suspendue Temporairement</h2>
              <p className="text-xs text-slate-400 max-w-md">
                Les questions sont masquées pour garantir les conditions réelles d'examen sans prise d'avantage non réglementaire. Le chronomètre est en pause.
              </p>
              <button
                type="button"
                onClick={() => setIsPaused(false)}
                className="px-6 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-sm flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Reprendre l'Épreuve</span>
              </button>
            </div>
          ) : (
            <>
              {/* Question Navigation Grid */}
              <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
                <div className="flex items-center gap-1.5">
                  {questions.map((q, idx) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isCur = idx === currentIndex;
                    const qTime = (timeSpentPerQuestion[q.id] || 0) + (isCur ? activeQuestionSeconds : 0);

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => switchQuestion(idx)}
                        className={`w-9 h-9 rounded-lg text-xs font-mono font-medium shrink-0 transition-all flex flex-col items-center justify-center ${
                          isCur
                            ? 'bg-amber-400 text-slate-950 font-bold shadow-md ring-2 ring-amber-300'
                            : isAnswered
                            ? 'bg-slate-800 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-950 text-slate-500 hover:text-slate-200'
                        }`}
                        title={`Question ${idx + 1} (${qTime > 0 ? formatTime(qTime) : 'Non visitée'})`}
                      >
                        <span>{idx + 1}</span>
                        {qTime > 0 && (
                          <span className="text-[8px] opacity-75 tabular-nums -mt-0.5">
                            {Math.floor(qTime / 60)}m
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs text-slate-400 pr-2 shrink-0 hidden sm:block">
                  <span className="font-semibold text-white">{totalAnswered}</span>/{questions.length} traitées
                </div>
              </div>

              {/* Active Question Card */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-5">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                  <span className="text-amber-400 font-semibold">{currentQ.section}</span>
                  <div className="flex items-center gap-3">
                    {avgPaceRemaining > 0 && (
                      <span className="text-[11px] text-slate-400">
                        Cadence disponible : ~{avgPaceRemaining}s / question
                      </span>
                    )}
                    <span className="font-mono text-slate-300">{currentQ.points} {currentQ.points > 1 ? 'points' : 'point'}</span>
                  </div>
                </div>

                {currentQ.contextSnippet && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                    {currentQ.contextSnippet}
                  </div>
                )}

                <h2 className="text-base font-bold text-white leading-snug">
                  {currentQ.question}
                </h2>

                {/* Answer Options */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentQ.id] === optIdx;

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(currentQ.id, optIdx)}
                        className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-slate-800/90 border-amber-500 text-white shadow-md ring-1 ring-amber-500'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                        }`}
                      >
                        <span>{opt}</span>
                        <div className={`w-4 h-4 rounded-full border shrink-0 ml-3 flex items-center justify-center ${
                          isSelected ? 'border-amber-400 bg-amber-400' : 'border-slate-600'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Next / Prev */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    disabled={currentIndex === 0}
                    onClick={() => switchQuestion(currentIndex - 1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Question précédente</span>
                  </button>

                  <button
                    type="button"
                    disabled={currentIndex === questions.length - 1}
                    onClick={() => switchQuestion(currentIndex + 1)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg disabled:opacity-40"
                  >
                    <span>Question suivante</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ---------------- COMPLETED EXAM RESULTS WITH TIME ANALYTICS ---------------- */}
      {examState === 'completed' && (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-6">
          <div className="text-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
              isAdmitted 
                ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-400' 
                : 'bg-amber-950/60 border border-amber-500/50 text-amber-400'
            }`}>
              {isAdmitted ? <ShieldCheck className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
            </div>

            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Résultat Officieux du Concours d'Admission BCC
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-1">
              {scorePercentage}% ({earnedPoints} / {totalPoints} points)
            </h1>

            <div className="mt-3">
              {isAdmitted ? (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 text-xs font-semibold">
                  <span>Admissibilité Favorable (Score &gt;= 70%)</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/60 text-amber-300 text-xs font-semibold">
                  <span>Non Admissible (Seuil requis : 70%)</span>
                </div>
              )}
            </div>
          </div>

          {/* Time Management Report Card (NEW FEATURE) */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <TimerIcon className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Bilan de Gestion du Temps & Résistance à la Pression
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">
                Temps total utilisé : {formatTime(elapsedTotalSeconds)}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Temps Moyen / Question</span>
                <span className="font-mono text-base font-bold text-white">
                  {Math.round(elapsedTotalSeconds / (questions.length || 1))} secondes
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Rythme Global</span>
                <span className="text-xs font-semibold text-emerald-400">
                  {elapsedTotalSeconds <= initialTimeSeconds ? 'Dans les Délais' : 'Dépassement'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Question la plus Rapide</span>
                <span className="font-mono text-xs font-bold text-amber-400">
                  {fastestQuestion ? `Q${fastestQuestion.index} (${formatTime(fastestQuestion.time)})` : '-'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Goulot d'Étranglement</span>
                <span className="font-mono text-xs font-bold text-red-400">
                  {slowestQuestion ? `Q${slowestQuestion.index} (${formatTime(slowestQuestion.time)})` : '-'}
                </span>
              </div>
            </div>

            {/* Time per section */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Temps passé par Domaine Métier :
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                {sectionScores.map((sec, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-300 truncate max-w-[170px]">{sec.section.split(':')[1] || sec.section}</span>
                    <span className="font-mono font-bold text-amber-300 tabular-nums">
                      {formatTime(sec.timeSpent)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {sectionScores.map((sec, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block line-clamp-1 mb-1">
                    {sec.section}
                  </span>
                  <div className="text-xl font-bold text-white font-mono">
                    {sec.earned} / {sec.total} pts
                  </div>
                </div>
                <div className="mt-2 text-xs font-semibold text-amber-400">
                  {sec.percentage}% de réussite
                </div>
              </div>
            ))}
          </div>

          {/* Assessment & Advice */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
            <h3 className="font-semibold text-amber-300 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-amber-400" />
              <span>Diagnostic de Cadence & Recommandation Jury BCC :</span>
            </h3>
            <p className="leading-relaxed">
              {isAdmitted
                ? "Félicitations. Vous avez su allier justesse technique et respect de la contrainte horaire. Lors de l'épreuve présentielle de la BCC, conservez cette discipline : ne dépassez jamais 2 minutes sur une question théorique afin de sanctuariser du temps pour les calculs de ratios (NPL, CAR) et les requêtes SQL."
                : "Votre score est en deçà du seuil requis. Les données de suivi temporel indiquent des temps de réflexion trop prolongés sur certaines questions complexes. Entraînez-vous à poser directement les formules (Instruction 15 et Bâle II) pour réduire votre temps de réponse."}
            </p>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-base font-bold text-white">
              Corrigé Détaillé et Analyse du Temps par Question
            </h2>

            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;
                const timeSpent = timeSpentPerQuestion[q.id] || 0;

                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-amber-400">Q{idx + 1}.</span>
                        <p className="font-medium text-slate-200">{q.question}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {formatTime(timeSpent)}
                        </span>
                        {isCorrect ? (
                          <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>+{q.points} pt</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-400 font-semibold">
                            <XCircle className="w-4 h-4" />
                            <span>0 pt</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-slate-400 space-y-1 pl-5">
                      <p>
                        Votre réponse :{' '}
                        <strong className={isCorrect ? 'text-emerald-300' : 'text-red-300'}>
                          {userChoice !== undefined ? q.options[userChoice] : 'Non répondue'}
                        </strong>
                      </p>
                      {!isCorrect && (
                        <p>
                          Bonne réponse attendue :{' '}
                          <strong className="text-emerald-300">{q.options[q.correctIndex]}</strong>
                        </p>
                      )}
                      <p className="text-slate-300 pt-1 border-t border-slate-800/60">
                        <strong className="text-amber-300">Explication BCC :</strong> {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartExam}
            className="w-full py-3.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repasser un Examen Blanc avec Minuteur</span>
          </button>
        </div>
      )}
    </div>
  );
};
