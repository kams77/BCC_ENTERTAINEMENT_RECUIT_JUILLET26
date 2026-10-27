export interface LearningStep {
  id: string;
  stepNumber: number;
  title: string;
  phaseName: string;
  description: string;
  moduleId?: string;
  exerciseId?: string;
  actionType: 'read_module' | 'solve_exercise' | 'generate_note' | 'pass_exam' | 'pass_interview';
  targetTab: 'reading' | 'exercises' | 'note-governor' | 'exam' | 'interview';
  targetId?: string;
  priorityLabel: 'Priorité 1 · Fondements Régaliens' | 'Priorité 2 · Politique Monétaire' | 'Priorité 3 · Surveillance Prudentielle' | 'Priorité 4 · Macroéconomie' | 'Priorité 5 · Modélisation Avancée' | 'Priorité 6 · Synthèse Stratégique' | 'Priorité 7 · Examen Final' | 'Priorité 8 · Grand Oral';
}

export const LEARNING_STEPS: LearningStep[] = [
  // Étape 1 : Fondements Régaliens
  {
    id: 'step-1-mod1',
    stepNumber: 1,
    title: 'Module 01 : Statuts et Missions Légales de la BCC',
    phaseName: 'Phase 1 : Fondements Légaux & Données de Base',
    description: 'Assimiler la Loi Organique n° 18/027, le mandat de stabilité des prix (article 3) et l\'organisation interne.',
    moduleId: 'module-1-institutions-bcc',
    actionType: 'read_module',
    targetTab: 'reading',
    targetId: 'module-1-institutions-bcc',
    priorityLabel: 'Priorité 1 · Fondements Régaliens'
  },
  {
    id: 'step-2-exo1',
    stepNumber: 2,
    title: 'Exercice 01 : Nettoyage Multidevise CDF/USD',
    phaseName: 'Phase 1 : Fondements Légaux & Données de Base',
    description: 'Harmoniser les déclarations des banques commerciales au cours indicatif officiel et filtrer les erreurs de saisie.',
    exerciseId: 'exo-1-cleaning-multidevise',
    actionType: 'solve_exercise',
    targetTab: 'exercises',
    targetId: 'exo-1-cleaning-multidevise',
    priorityLabel: 'Priorité 1 · Fondements Régaliens'
  },

  // Étape 2 : Politique Monétaire & Open Market
  {
    id: 'step-3-mod2',
    stepNumber: 3,
    title: 'Module 02 : Politique Monétaire & Instruments Opérationnels',
    phaseName: 'Phase 2 : Régulation de la Liquidité & Marchés',
    description: 'Comprendre les mécanismes des Bons BCC (B-BCC), la réserve obligatoire et la dollarisation financière.',
    moduleId: 'module-2-politique-monetaire',
    actionType: 'read_module',
    targetTab: 'reading',
    targetId: 'module-2-politique-monetaire',
    priorityLabel: 'Priorité 2 · Politique Monétaire'
  },
  {
    id: 'step-4-exo5',
    stepNumber: 4,
    title: 'Exercice 05 : Adjudication des Bons BCC & TMP',
    phaseName: 'Phase 2 : Régulation de la Liquidité & Marchés',
    description: 'Programmer le dépouillement à l\'adjudication des Bons BCC et calculer le Taux Moyen Pondéré (TMP).',
    exerciseId: 'exo-5-adjudication-bons-bcc',
    actionType: 'solve_exercise',
    targetTab: 'exercises',
    targetId: 'exo-5-adjudication-bons-bcc',
    priorityLabel: 'Priorité 2 · Politique Monétaire'
  },

  // Étape 3 : Surveillance Prudentielle DSIF
  {
    id: 'step-5-mod3',
    stepNumber: 5,
    title: 'Module 03 : Réglementation Prudentielle & Bâle II/III',
    phaseName: 'Phase 3 : Surveillance Bancaire & Risque de Crédit',
    description: 'Maîtriser les normes de solvabilité (CAR >= 10%), l\'Instruction n° 15 et les provisions sur créances douteuses.',
    moduleId: 'module-3-surveillance-prudentielle',
    actionType: 'read_module',
    targetTab: 'reading',
    targetId: 'module-3-surveillance-prudentielle',
    priorityLabel: 'Priorité 3 · Surveillance Prudentielle'
  },
  {
    id: 'step-6-exo2',
    stepNumber: 6,
    title: 'Exercice 02 : Audit des Créances en Souffrance (NPL)',
    phaseName: 'Phase 3 : Surveillance Bancaire & Risque de Crédit',
    description: 'Calculer le ratio NPL, le taux de couverture des provisions et identifier les banques sous alerte DSIF (seuil 5%).',
    exerciseId: 'exo-2-ratios-npl-dsif',
    actionType: 'solve_exercise',
    targetTab: 'exercises',
    targetId: 'exo-2-ratios-npl-dsif',
    priorityLabel: 'Priorité 3 · Surveillance Prudentielle'
  },

  // Étape 4 : Macroéconomie & Condensé BCC
  {
    id: 'step-7-mod4',
    stepNumber: 7,
    title: 'Module 04 : Macroéconomie & Condensé Statistique',
    phaseName: 'Phase 4 : Conjoncture Macroéconomique & Séries Extérieures',
    description: 'Décomposer la masse monétaire (M0 à M3), les réserves en semaines d\'importation et l\'impact du cours du cuivre.',
    moduleId: 'module-4-macroeconomie-condense',
    actionType: 'read_module',
    targetTab: 'reading',
    targetId: 'module-4-macroeconomie-condense',
    priorityLabel: 'Priorité 4 · Macroéconomie'
  },
  {
    id: 'step-8-exo3',
    stepNumber: 8,
    title: 'Exercice 03 : Séries Temporelles & Spread de Change',
    phaseName: 'Phase 4 : Conjoncture Macroéconomique & Séries Extérieures',
    description: 'Calculer avec LAG() la dépréciation hebdomadaire et le spread entre cours indicatif et marché parallèle de Kinshasa.',
    exerciseId: 'exo-3-volatilite-taux-change',
    actionType: 'solve_exercise',
    targetTab: 'exercises',
    targetId: 'exo-3-volatilite-taux-change',
    priorityLabel: 'Priorité 4 · Macroéconomie'
  },
  {
    id: 'step-9-exo4',
    stepNumber: 9,
    title: 'Exercice 04 : Masse Monétaire M2 & Multiplicateur k',
    phaseName: 'Phase 4 : Conjoncture Macroéconomique & Séries Extérieures',
    description: 'Calculer les agrégats monétaires, le ratio de dollarisation des dépôts et le multiplicateur monétaire M2/M0.',
    exerciseId: 'exo-4-agregats-monetaires-m2',
    actionType: 'solve_exercise',
    targetTab: 'exercises',
    targetId: 'exo-4-agregats-monetaires-m2',
    priorityLabel: 'Priorité 4 · Macroéconomie'
  },

  // Étape 5 : Boîte à Outils SQL & Stress-Testing
  {
    id: 'step-10-mod5',
    stepNumber: 10,
    title: 'Module 05 : Boîte à Outils SQL & Économétrie',
    phaseName: 'Phase 5 : Modélisation Avancée & Stress-Testing',
    description: 'Approfondir les fonctions SQL analytiques, les tests de stationnarité (ADF) et le contrôle d\'intégrité des bilans.',
    moduleId: 'module-5-boite-a-outils-data-analyst',
    actionType: 'read_module',
    targetTab: 'reading',
    targetId: 'module-5-boite-a-outils-data-analyst',
    priorityLabel: 'Priorité 5 · Modélisation Avancée'
  },
  {
    id: 'step-11-exo6',
    stepNumber: 11,
    title: 'Exercice 06 : Stress-Testing Macroprudentiel Minier',
    phaseName: 'Phase 5 : Modélisation Avancée & Stress-Testing',
    description: 'Simuler un choc de 35% sur le cuivre et calculer les recapitalisations nécessaires pour rétablir le CAR à 10%.',
    exerciseId: 'exo-6-stress-test-choc-minier',
    actionType: 'solve_exercise',
    targetTab: 'exercises',
    targetId: 'exo-6-stress-test-choc-minier',
    priorityLabel: 'Priorité 5 · Modélisation Avancée'
  },

  // Étape 6 : Méthodologie & Note au Gouverneur
  {
    id: 'step-12-mod6',
    stepNumber: 12,
    title: 'Module 06 : Méthodologie du Concours & Posture',
    phaseName: 'Phase 6 : Rédaction Stratégique & Décision',
    description: 'Acquérir la méthodologie de synthèse pour la haute direction et les réflexes d\'examen.',
    moduleId: 'module-6-methodologie-admission',
    actionType: 'read_module',
    targetTab: 'reading',
    targetId: 'module-6-methodologie-admission',
    priorityLabel: 'Priorité 6 · Synthèse Stratégique'
  },
  {
    id: 'step-13-note',
    stepNumber: 13,
    title: 'Note de Conjoncture pour le Gouverneur',
    phaseName: 'Phase 6 : Rédaction Stratégique & Décision',
    description: 'Simuler la rédaction d\'une note exécutive d\'arbitrage monétaire avec recommandations pour le CPM.',
    actionType: 'generate_note',
    targetTab: 'note-governor',
    priorityLabel: 'Priorité 6 · Synthèse Stratégique'
  },

  // Étape 7 : Examen Blanc
  {
    id: 'step-14-exam',
    stepNumber: 14,
    title: 'Épreuve Écrite : Examen Blanc Chronométré',
    phaseName: 'Phase 7 : Épreuve Écrite d\'Admission',
    description: 'Passer le concours blanc complet sous pression temporelle (15 questions pondérées, score >= 70% requis).',
    actionType: 'pass_exam',
    targetTab: 'exam',
    priorityLabel: 'Priorité 7 · Examen Final'
  },

  // Étape 8 : Grand Oral
  {
    id: 'step-15-interview',
    stepNumber: 15,
    title: 'Grand Oral : Interview avec le Jury de la BCC',
    phaseName: 'Phase 8 : Épreuve Orale & Recrutement',
    description: 'S\'entraîner en conditions directes aux questions pièges des directeurs centraux de la Banque Centrale.',
    actionType: 'pass_interview',
    targetTab: 'interview',
    priorityLabel: 'Priorité 8 · Grand Oral'
  }
];

export function isStepCompleted(
  step: LearningStep,
  completedModules: Record<string, boolean>,
  completedExercises: Record<string, boolean>,
  hasPassedExam: boolean,
  masteredInterviewsCount: number
): boolean {
  if (step.actionType === 'read_module' && step.moduleId) {
    return !!completedModules[step.moduleId];
  }
  if (step.actionType === 'solve_exercise' && step.exerciseId) {
    return !!completedExercises[step.exerciseId];
  }
  if (step.actionType === 'generate_note') {
    // Marked done once modules 1-6 are done or explicit flag
    return !!completedModules['module-6-methodologie-admission'];
  }
  if (step.actionType === 'pass_exam') {
    return hasPassedExam;
  }
  if (step.actionType === 'pass_interview') {
    return masteredInterviewsCount >= 4;
  }
  return false;
}
