import React, { useState, useEffect } from 'react';
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
  TrendingUp,
  FileSpreadsheet,
  Building
} from 'lucide-react';
import { ExamQuestion } from '../types';

interface MockExamSimulatorProps {
  questions: ExamQuestion[];
}

export const MockExamSimulator: React.FC<MockExamSimulatorProps> = ({ questions }) => {
  const [examState, setExamState] = useState<'intro' | 'running' | 'completed'>('intro');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(35 * 60); // 35 minutes
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (examState === 'running' && isTimerRunning && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            setExamState('completed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [examState, isTimerRunning, timeLeftSeconds]);

  const handleStartExam = () => {
    setExamState('running');
    setIsTimerRunning(true);
    setTimeLeftSeconds(35 * 60);
    setUserAnswers({});
    setCurrentIndex(0);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitExam = () => {
    setIsTimerRunning(false);
    setExamState('completed');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Score computation
  const totalPoints = questions.reduce((acc, q) => acc + q.points, 0);
  const earnedPoints = questions.reduce((acc, q) => {
    if (userAnswers[q.id] === q.correctIndex) {
      return acc + q.points;
    }
    return acc;
  }, 0);
  const scorePercentage = Math.round((earnedPoints / totalPoints) * 100);
  const isAdmitted = scorePercentage >= 70; // Seuil d'admissibilité BCC standard = 70%

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
    return {
      section: sec,
      earned: secEarned,
      total: secTotal,
      percentage: Math.round((secEarned / (secTotal || 1)) * 100),
    };
  });

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro Screen */}
      {examState === 'intro' && (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Simulateur d'Examen d'Admission Data Analyste (BCC RDC)
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto mt-2 leading-relaxed">
              Épreuve blanche conçue selon les standards d'évaluation du Département des Ressources Humaines et des Directions Métiers (DSIF / DRE) de la Banque Centrale du Congo.
            </p>
          </div>

          {/* Key exam conditions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block mb-1">
                Format
              </span>
              <div className="text-lg font-bold text-white font-mono">15 Questions</div>
              <p className="text-xs text-slate-400 mt-1">3 sections pondérées selon leur criticité métier.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block mb-1">
                Durée Maximale
              </span>
              <div className="text-lg font-bold text-white font-mono">35 Minutes</div>
              <p className="text-xs text-slate-400 mt-1">Gestion du temps chronométré en situation réelle.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block mb-1">
                Barème d'Admission
              </span>
              <div className="text-lg font-bold text-white font-mono">70 % Requis</div>
              <p className="text-xs text-slate-400 mt-1">Seuil minimal d'admissibilité pour l'entretien oral.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-left text-xs text-slate-300 space-y-2">
            <h3 className="font-semibold text-white">Consignes d'Épreuve :</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Aucun point négatif n'est appliqué en cas de mauvaise réponse.</li>
              <li>Les calculs financiers supposent l'application stricte des instructions de la BCC (taux de 10% pour le CAR, 2 850 CDF/USD).</li>
              <li>Vous pouvez naviguer librement entre les questions avant de soumettre définitivement votre copie.</li>
            </ul>
          </div>

          <button
            onClick={handleStartExam}
            className="w-full md:w-auto md:px-8 py-3 mx-auto text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-400/20"
          >
            Commencer l'Épreuve Chronométrée
          </button>
        </div>
      )}

      {/* Active Exam Running */}
      {examState === 'running' && (
        <div className="flex flex-col gap-5">
          {/* Top Exam Header with Timer & Progress */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-base text-amber-400 tabular-nums">
                  {formatTime(timeLeftSeconds)}
                </span>
              </div>
              <span className="text-xs text-slate-500">|</span>
              <span className="text-xs text-slate-400">
                Question <strong className="text-white">{currentIndex + 1}</strong> sur {questions.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden sm:inline">
                {Object.keys(userAnswers).length} / {questions.length} traitées
              </span>
              <button
                onClick={handleSubmitExam}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
              >
                Terminer & Soumettre
              </button>
            </div>
          </div>

          {/* Question Grid Bar */}
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCur = idx === currentIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-medium shrink-0 transition-colors ${
                    isCur
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : isAnswered
                      ? 'bg-slate-800 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-950 text-slate-500 hover:text-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Active Question Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-5">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span className="text-amber-400 font-semibold">{currentQ.section}</span>
              <span className="font-mono">{currentQ.points} {currentQ.points > 1 ? 'points' : 'point'}</span>
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

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((c) => c - 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Question précédente</span>
              </button>

              <button
                disabled={currentIndex === questions.length - 1}
                onClick={() => setCurrentIndex((c) => c + 1)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg disabled:opacity-40"
              >
                <span>Question suivante</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completed Exam Results */}
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
              Résultat du Test d'Admission
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-1">
              {scorePercentage}% ({earnedPoints} / {totalPoints} points)
            </h1>

            <div className="mt-3">
              {isAdmitted ? (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 text-xs font-semibold">
                  <span>Admissibilité Favorable pour la BCC (Score supérieur au seuil de 70%)</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/60 text-amber-300 text-xs font-semibold">
                  <span>Score insuffisant pour l'admissibilité (Seuil minimal : 70%)</span>
                </div>
              )}
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

          {/* Assessment & Advice for oral jury */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
            <h3 className="font-semibold text-amber-300 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-amber-400" />
              <span>Évaluation du Profil par le Jury de la BCC :</span>
            </h3>
            <p className="leading-relaxed">
              {isAdmitted
                ? "Excellent niveau technique. Vos bases sur la Loi 18/027, le calcul prudentiel des NPL et les jointures SQL démontrent votre capacité à produire des rapports d'aide à la décision pour le Comité de Politique Monétaire (CPM). Préparez-vous à exposer oralement vos démarches lors de l'entretien d'embauche."
                : "Des lacunes ont été constatées sur les calculs prudentiels ou sur le cadre de politique monétaire congolais. Relisez attentivement le Module 2 (Bons BCC) et le Module 3 (Ratios de Bâle / Instruction 15), puis refaites les exercices pratiques associés avant de retenter l'examen."}
            </p>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-base font-bold text-white">
              Corrigé Détaillé et Analyse des Réponses
            </h2>

            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-amber-400">Q{idx + 1}.</span>
                        <p className="font-medium text-slate-200">{q.question}</p>
                      </div>
                      {isCorrect ? (
                        <div className="flex items-center gap-1 text-emerald-400 font-semibold shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correct (+{q.points} pt)</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-400 font-semibold shrink-0">
                          <XCircle className="w-4 h-4" />
                          <span>Incorrect (0 pt)</span>
                        </div>
                      )}
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
            onClick={handleStartExam}
            className="w-full py-3 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Refaire l'Épreuve Complète</span>
          </button>
        </div>
      )}
    </div>
  );
};
