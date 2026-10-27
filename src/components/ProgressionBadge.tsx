import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Sparkles, 
  GraduationCap, 
  Crown, 
  ChevronRight, 
  X, 
  Check, 
  Lock,
  Star
} from 'lucide-react';

export interface BadgeTier {
  id: string;
  grade: string;
  shortLabel: string;
  minPoints: number;
  maxPoints: number;
  description: string;
  criteria: string;
  iconName: 'cap' | 'sparkle' | 'shield' | 'star' | 'crown';
  colorClasses: {
    bg: string;
    border: string;
    text: string;
    ring: string;
    bar: string;
  };
}

export const BADGE_TIERS: BadgeTier[] = [
  {
    id: 'tier-1',
    grade: 'Grade 1 · Candidat Postulant',
    shortLabel: 'Candidat Postulant',
    minPoints: 0,
    maxPoints: 2,
    description: 'Phase d\'immersion dans les statuts de la BCC (Loi 18/027) et familiarisation avec les flux bancaires.',
    criteria: 'Valider de 0 à 2 exercices ou fiches de révision',
    iconName: 'cap',
    colorClasses: {
      bg: 'bg-slate-900',
      border: 'border-slate-700',
      text: 'text-slate-300',
      ring: 'ring-slate-600',
      bar: 'bg-slate-500'
    }
  },
  {
    id: 'tier-2',
    grade: 'Grade 2 · Analyste Junior',
    shortLabel: 'Analyste Junior',
    minPoints: 3,
    maxPoints: 5,
    description: 'Maîtrise de l\'harmonisation des déclarations multidevises CDF/USD et de la surveillance prudentielle de base.',
    criteria: 'Valider au moins 3 exercices ou fiches',
    iconName: 'sparkle',
    colorClasses: {
      bg: 'bg-blue-950/60',
      border: 'border-blue-700/60',
      text: 'text-blue-300',
      ring: 'ring-blue-500',
      bar: 'bg-blue-500'
    }
  },
  {
    id: 'tier-3',
    grade: 'Grade 3 · Data Analyste Confirmé (DSIF / DRE)',
    shortLabel: 'Analyste Confirmé',
    minPoints: 6,
    maxPoints: 8,
    description: 'Capacité avérée à auditer les créances en souffrance (NPL Instruction 15) et à manipuler les séries chronologiques de change.',
    criteria: 'Valider au moins 6 exercices ou fiches',
    iconName: 'shield',
    colorClasses: {
      bg: 'bg-amber-950/60',
      border: 'border-amber-600/70',
      text: 'text-amber-300',
      ring: 'ring-amber-500',
      bar: 'bg-amber-400'
    }
  },
  {
    id: 'tier-4',
    grade: 'Grade 4 · Analyste Senior Conjoncture & Marchés',
    shortLabel: 'Analyste Senior',
    minPoints: 9,
    maxPoints: 11,
    description: 'Expertise sur les adjudications des Bons BCC (B-BCC), calculs du TMP et modélisation de stress-tests macroprudentiels.',
    criteria: 'Valider au moins 9 exercices ou fiches',
    iconName: 'star',
    colorClasses: {
      bg: 'bg-emerald-950/60',
      border: 'border-emerald-600/70',
      text: 'text-emerald-300',
      ring: 'ring-emerald-500',
      bar: 'bg-emerald-400'
    }
  },
  {
    id: 'tier-5',
    grade: 'Grade 5 · Expert BCC · Prêt pour l\'Admission',
    shortLabel: 'Expert BCC',
    minPoints: 12,
    maxPoints: 12,
    description: 'Excellence totale ! Tous les cas pratiques résolus et toutes les matières théoriques maîtrisées. Profil prioritaire pour le jury.',
    criteria: 'Valider les 12 exercices et fiches de révision (100%)',
    iconName: 'crown',
    colorClasses: {
      bg: 'bg-gradient-to-r from-amber-950/80 to-amber-900/60',
      border: 'border-amber-400',
      text: 'text-amber-200',
      ring: 'ring-amber-400',
      bar: 'bg-gradient-to-r from-amber-400 to-amber-200'
    }
  }
];

interface ProgressionBadgeProps {
  completedExercisesCount: number;
  totalExercisesCount: number;
  completedModulesCount: number;
  totalModulesCount: number;
}

export const ProgressionBadge: React.FC<ProgressionBadgeProps> = ({
  completedExercisesCount,
  totalExercisesCount,
  completedModulesCount,
  totalModulesCount,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const totalValidated = completedExercisesCount + completedModulesCount;
  const totalPossible = totalExercisesCount + totalModulesCount; // 6 + 6 = 12

  // Determine active tier
  let activeTier = BADGE_TIERS[0];
  for (let i = BADGE_TIERS.length - 1; i >= 0; i--) {
    if (totalValidated >= BADGE_TIERS[i].minPoints) {
      activeTier = BADGE_TIERS[i];
      break;
    }
  }

  // Find next tier if any
  const currentTierIndex = BADGE_TIERS.findIndex((t) => t.id === activeTier.id);
  const nextTier = currentTierIndex < BADGE_TIERS.length - 1 ? BADGE_TIERS[currentTierIndex + 1] : null;
  const pointsToNext = nextTier ? nextTier.minPoints - totalValidated : 0;

  const renderIcon = (name: BadgeTier['iconName'], className: string) => {
    switch (name) {
      case 'cap':
        return <GraduationCap className={className} />;
      case 'sparkle':
        return <Sparkles className={className} />;
      case 'shield':
        return <ShieldCheck className={className} />;
      case 'star':
        return <Star className={className} />;
      case 'crown':
        return <Crown className={className} />;
    }
  };

  return (
    <>
      {/* Banner Badge Chip */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`group p-3 sm:px-4 sm:py-2.5 rounded-xl border transition-all text-left flex items-center justify-between gap-3 shadow-sm hover:scale-[1.02] cursor-pointer ${activeTier.colorClasses.bg} ${activeTier.colorClasses.border}`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${activeTier.colorClasses.border} bg-slate-950/80`}>
            {renderIcon(activeTier.iconName, `w-4 h-4 ${activeTier.colorClasses.text}`)}
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold -mb-0.5">
              Grade Débloqué
            </span>
            <span className={`text-xs sm:text-sm font-bold tracking-tight ${activeTier.colorClasses.text}`}>
              {activeTier.shortLabel}
            </span>
            <span className="text-[10px] text-slate-400">
              {nextTier ? `Encore ${pointsToNext} validation${pointsToNext > 1 ? 's' : ''} pour ${nextTier.shortLabel}` : 'Niveau Maximal Atteint 🎉'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-white transition-colors shrink-0">
          <span className="text-[11px] font-mono font-bold text-amber-400 tabular-nums">
            {totalValidated}/{totalPossible}
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </button>

      {/* Badges Hierarchy Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-white">
                  Échelons de Progression & Badges BCC
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Votre grade évolue automatiquement à mesure que vous validez les <strong className="text-white">6 exercices techniques</strong> et les <strong className="text-white">6 fiches de lecture</strong> du programme d'admission BCC.
            </p>

            {/* List of 5 Tiers */}
            <div className="space-y-3">
              {BADGE_TIERS.map((tier) => {
                const isUnlocked = totalValidated >= tier.minPoints;
                const isCurrent = activeTier.id === tier.id;

                return (
                  <div
                    key={tier.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                      isCurrent
                        ? `${tier.colorClasses.bg} ${tier.colorClasses.border} ring-1 ${tier.colorClasses.ring} shadow-md`
                        : isUnlocked
                        ? 'bg-slate-950/70 border-slate-800 text-slate-300'
                        : 'bg-slate-950/30 border-slate-800/50 opacity-60'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      isUnlocked ? tier.colorClasses.border : 'border-slate-800'
                    } bg-slate-950`}>
                      {renderIcon(tier.iconName, `w-4 h-4 ${isUnlocked ? tier.colorClasses.text : 'text-slate-600'}`)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h3 className={`text-xs font-bold truncate ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                          {tier.grade}
                        </h3>

                        {isCurrent ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950 shrink-0">
                            Actuel
                          </span>
                        ) : isUnlocked ? (
                          <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1 shrink-0">
                            <Check className="w-3 h-3" />
                            <span>Débloqué</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1 shrink-0">
                            <Lock className="w-3 h-3" />
                            <span>Verrouillé</span>
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-400 leading-snug mb-1.5">
                        {tier.description}
                      </p>

                      <span className="text-[10px] font-mono text-slate-500 block">
                        Condition : {tier.criteria}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Modal CTA */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-sm mt-1"
            >
              Continuer mon Entraînement
            </button>
          </div>
        </div>
      )}
    </>
  );
};
