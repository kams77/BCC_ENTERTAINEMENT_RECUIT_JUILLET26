import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Search, 
  BookOpen, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Award,
  Building,
  HelpCircle,
  Eye,
  EyeOff,
  Flame,
  MessageSquare
} from 'lucide-react';
import { interviewQuestions, oralExamMethodology, InterviewQuestion } from '../data/interviewQuestions';

export const InterviewPrepView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'simulator' | 'bank' | 'methodology'>('simulator');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Simulator state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(120); // 2 minutes to respond
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  
  // Track mastered questions in localStorage
  const [masteredQuestions, setMasteredQuestions] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('bcc_prep_mastered_interview');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleMastered = (questionId: string) => {
    setMasteredQuestions((prev) => {
      const updated = { ...prev, [questionId]: !prev[questionId] };
      try {
        localStorage.setItem('bcc_prep_mastered_interview', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  // Timer countdown effect in simulator
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const activeQuestion = interviewQuestions[currentQuestionIndex] || interviewQuestions[0];

  const handleNextQuestion = () => {
    setIsAnswerRevealed(false);
    setIsTimerRunning(false);
    setTimerSeconds(120);
    setCurrentQuestionIndex((prev) => (prev + 1) % interviewQuestions.length);
  };

  const handlePrevQuestion = () => {
    setIsAnswerRevealed(false);
    setIsTimerRunning(false);
    setTimerSeconds(120);
    setCurrentQuestionIndex((prev) => (prev - 1 + interviewQuestions.length) % interviewQuestions.length);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Filter bank questions
  const filteredQuestions = interviewQuestions.filter((q) => {
    const matchCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchSearch = searchQuery === '' || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.recommendedAnswer.coreMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const masteredCount = Object.values(masteredQuestions).filter(Boolean).length;
  const masteryPercentage = Math.round((masteredCount / (interviewQuestions.length || 1)) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Grand Oral & Entretien Technique · Recrutement BCC</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Préparation à l'Interview avec le Jury de la BCC
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Entraînez-vous à répondre aux questions déstabilisantes des directeurs centraux (DSIF, DRE, DOBM, DRH) : posture institutionnelle, chaîne d'analyse macroéconomique et éthique régalienne.
          </p>
        </div>

        {/* Readiness progress */}
        <div className="flex items-center gap-3 shrink-0 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Questions Maîtrisées</span>
            <span className="text-base font-bold text-amber-400 font-mono tabular-nums">
              {masteredCount} / {interviewQuestions.length} ({masteryPercentage}%)
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveSubTab('simulator')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors ${
            activeSubTab === 'simulator'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Simulateur de Jury en Direct</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('bank')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors ${
            activeSubTab === 'bank'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Banque de Questions ({interviewQuestions.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('methodology')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors ${
            activeSubTab === 'methodology'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Guide & Réflexes d'Or du Jury</span>
        </button>
      </div>

      {/* ==================== SUB-TAB 1: SIMULATEUR DE JURY ==================== */}
      {activeSubTab === 'simulator' && (
        <div className="flex flex-col gap-5">
          {/* Active Question Simulator Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-6">
            {/* Top Bar with Category & Chrono */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20">
                  Question {currentQuestionIndex + 1} / {interviewQuestions.length}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  {activeQuestion.category}
                </span>
              </div>

              {/* 2-minute oral response countdown */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 font-bold tabular-nums">
                  <span>Temps de parole conseillé :</span>
                  <span>{formatTimer(timerSeconds)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTimerRunning((r) => !r)}
                  className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                  title={isTimerRunning ? 'Mettre en pause' : 'Lancer le chronomètre de réponse'}
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(120);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                  title="Réinitialiser à 2 minutes"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Question Asked by Jury */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Le Jury de la Banque Centrale vous demande :</span>
              </div>
              <h2 className="text-xl font-bold text-white leading-snug">
                « {activeQuestion.question} »
              </h2>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                <strong className="text-amber-300">Ce que le Jury cherche à évaluer en réalité : </strong>
                <span>{activeQuestion.juryObjective}</span>
              </div>
            </div>

            {/* Actions: Reveal Answer & Mark Mastered */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAnswerRevealed((r) => !r)}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-sm"
              >
                {isAnswerRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{isAnswerRevealed ? 'Masquer la Réponse du Jury' : 'Révéler la Réponse Recommandée & Pièges'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleMastered(activeQuestion.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl border transition-colors ${
                  masteredQuestions[activeQuestion.id]
                    ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${masteredQuestions[activeQuestion.id] ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{masteredQuestions[activeQuestion.id] ? 'Question Maîtrisée' : 'Marquer comme Maîtrisée'}</span>
              </button>
            </div>

            {/* Revealed Answer & Jury Debrief */}
            {isAnswerRevealed && (
              <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-5 animate-in fade-in duration-300">
                {/* Core message */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    Message Central à Faire Passer :
                  </span>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {activeQuestion.recommendedAnswer.coreMessage}
                  </p>
                </div>

                {/* Key Points */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Arguments Techniques Clés :
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {activeQuestion.recommendedAnswer.keyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Figures & Laws */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-amber-300 block">Chiffres et Références à citer impérativement :</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeQuestion.recommendedAnswer.figuresToQuote.map((fig, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-slate-200 font-mono text-[11px]">
                        {fig}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Script Verbatim Exemple */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Exemple de Réponse Orale Idéale (Verbatim) :
                  </span>
                  <blockquote className="p-4 rounded-xl bg-slate-900/90 border-l-2 border-emerald-500 text-xs italic text-slate-200 leading-relaxed font-sans">
                    {activeQuestion.sampleScript}
                  </blockquote>
                </div>

                {/* Pitfalls to Avoid */}
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/40 text-xs text-red-200 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-red-400 uppercase tracking-wider text-[11px]">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Pièges Éliminatoires à Éviter Absolument :</span>
                  </div>
                  <ul className="space-y-1 text-red-300/90">
                    {activeQuestion.pitfallsToAvoid.map((pit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold text-red-400">✗</span>
                        <span>{pit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handlePrevQuestion}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <span>Question Précédente</span>
              </button>

              <button
                type="button"
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
              >
                <span>Question Suivante</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUB-TAB 2: BANQUE DE QUESTIONS ==================== */}
      {activeSubTab === 'bank' && (
        <div className="flex flex-col gap-4">
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto text-xs">
              {[
                { id: 'all', label: 'Toutes les Questions' },
                { id: 'Institutionnel & Motivation', label: 'Institutionnel & Statuts' },
                { id: 'Politique Monétaire & Marchés', label: 'Politique Monétaire' },
                { id: 'Surveillance Prudentielle (DSIF)', label: 'Surveillance DSIF' },
                { id: 'Technique Data Analyst (SQL/Python)', label: 'Technique SQL & Économétrie' },
                { id: 'Mise en Situation & Éthique', label: 'Éthique & Déontologie' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Rechercher par mot-clé..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredQuestions.map((q) => {
              const isMastered = !!masteredQuestions[q.id];

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col gap-3 ${
                    isMastered
                      ? 'bg-slate-900/60 border-emerald-900/40'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                      {q.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleMastered(q.id)}
                      className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                        isMastered
                          ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-400' : 'text-slate-600'}`} />
                      <span>{isMastered ? 'Maîtrisée' : 'À travailler'}</span>
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    « {q.question} »
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <strong className="text-amber-300">Message Clé :</strong> {q.recommendedAnswer.coreMessage}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase block">Points forts à mentionner :</span>
                      <ul className="space-y-1 text-slate-300">
                        {q.recommendedAnswer.keyPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-bold">·</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-red-400 uppercase block">À ne jamais dire :</span>
                      <ul className="space-y-1 text-red-300/90">
                        {q.pitfallsToAvoid.map((pit, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-red-400 font-bold">✗</span>
                            <span>{pit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== SUB-TAB 3: GUIDE & MÉTHODOLOGIE DU GRAND ORAL ==================== */}
      {activeSubTab === 'methodology' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {oralExamMethodology.map((sec, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>{sec.title}</span>
                </h2>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  {sec.points.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Grille d'Évaluation du Jury BCC */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Grille d'Évaluation Officieuse du Jury de la Banque Centrale du Congo</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-amber-400 block text-sm">25% · Rigueur des Chiffres</span>
                <p className="text-slate-400">
                  Exactitude des définitions (différence M2/M3, cours indicatif vs parallèle, calcul du CAR Bâle).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-amber-400 block text-sm">25% · Esprit de Décision</span>
                <p className="text-slate-400">
                  Capacité à formuler une recommandation concrète pour le Gouverneur (adjudication devises, Bons BCC).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-amber-400 block text-sm">25% · Savoir-faire Technique</span>
                <p className="text-slate-400">
                  Maîtrise de SQL (Window Functions), nettoyage de bilans bancaires et séries chronologiques sous Python.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-amber-400 block text-sm">25% · Posture Régalienne</span>
                <p className="text-slate-400">
                  Éthique, sens de l'intérêt général, discrétion professionnelle et loyauté envers l'institution.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
