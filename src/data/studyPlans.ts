export interface StudyPlanDay {
  dayNumber: number;
  title: string;
  focus: string;
  readingModules: string[];
  recommendedExercises: string[];
  keyActions: string[];
  estimatedHours: number;
}

export interface StudyPlan {
  id: 'plan-7-days' | 'plan-14-days' | 'plan-30-days';
  title: string;
  durationLabel: string;
  targetProfile: string;
  intensity: 'Intensif (4-5h/jour)' | 'Régulier (2-3h/jour)' | 'Approfondi (1-2h/jour)';
  days: StudyPlanDay[];
  strategyTips: string[];
}

export const studyPlans: StudyPlan[] = [
  {
    id: 'plan-7-days',
    title: 'Sprint Intensif (7 Jours)',
    durationLabel: '7 Jours',
    targetProfile: 'Candidats convoqués à très court terme ou en phase de révision finale.',
    intensity: 'Intensif (4-5h/jour)',
    strategyTips: [
      'Concentrez 70% de votre temps sur les calculs concrets (NPL, CAR, Bons BCC, Spread de change) et 30% sur la Loi 18/027.',
      'Ne vous perdez pas dans les démonstrations théoriques complexes : la BCC teste l\'exactitude des calculs et la clarté de l\'interprétation.',
      'Passez l\'examen blanc complet le Jour 6 pour caler votre rythme chronométré.'
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Missions Régaliennes & Cadre Légal BCC',
        focus: 'Loi Organique 18/027, Statuts de la BCC, Mandat de stabilité des prix, Comité de Politique Monétaire (CPM).',
        readingModules: ['module-1-institutions-bcc'],
        recommendedExercises: ['exo-1-cleaning-multidevise'],
        keyActions: [
          'Lire et résumer l\'article 3 de la loi 18/027.',
          'Mémoriser les 5 missions de la BCC et les rôles de la DRE et DSIF.',
          'Pratiquer l\'exercice 1 : nettoyage multidevise CDF/USD.'
        ],
        estimatedHours: 4
      },
      {
        dayNumber: 2,
        title: 'Politique Monétaire, Bons BCC & Taux Directeur',
        focus: 'Mécanismes d\'Open Market, Adjudications des Bons BCC (TMP), Réserve Obligatoire et dollarisation.',
        readingModules: ['module-2-politique-monetaire'],
        recommendedExercises: ['exo-5-adjudication-bons-bcc'],
        keyActions: [
          'Comprendre le dépouillement à l\'adjudication des Bons BCC (offres servies par taux croissant).',
          'Calculer un Taux Moyen Pondéré (TMP).',
          'Faire le quiz du Module 2.'
        ],
        estimatedHours: 4.5
      },
      {
        dayNumber: 3,
        title: 'Surveillance Bancaire DSIF & Ratios Prudentiels',
        focus: 'Ratios de Bâle adaptés par la BCC, NPL Ratio, Provisions, Capital Adequacy Ratio (CAR 10%).',
        readingModules: ['module-3-surveillance-prudentielle'],
        recommendedExercises: ['exo-2-ratios-npl-dsif'],
        keyActions: [
          'Maîtriser la classification des 5 catégories de créances (saines à compromises).',
          'Calculer le NPL Ratio et le Taux de Couverture des provisions.',
          'Exécuter l\'exercice 2 en SQL et Pandas.'
        ],
        estimatedHours: 4.5
      },
      {
        dayNumber: 4,
        title: 'Macroéconomie, Marché des Changes & Condensé BCC',
        focus: 'Taux indicatif vs marché parallèle, pass-through, agrégats M0-M3, impact du secteur minier.',
        readingModules: ['module-4-macroeconomie-condense'],
        recommendedExercises: ['exo-3-volatilite-taux-change', 'exo-4-agregats-monetaires-m2'],
        keyActions: [
          'Calculer le spread indicatif / parallèle et la dépréciation hebdomadaire avec LAG().',
          'Calculer le multiplicateur monétaire M2/M0 et le ratio de dollarisation.',
          'Inspecter les jeux de données du Condensé de la BCC.'
        ],
        estimatedHours: 5
      },
      {
        dayNumber: 5,
        title: 'Boîte à Outils SQL & Stress-Testing Avancé',
        focus: 'Window Functions SQL (LAG, RANK, OVER), Pandas pour séries chronologiques, simulation de chocs.',
        readingModules: ['module-5-boite-a-outils-data-analyst'],
        recommendedExercises: ['exo-6-stress-test-choc-minier'],
        keyActions: [
          'Programmer le stress-test d\'un choc sur les cours du cuivre sur le CAR des banques.',
          'Vérifier les clauses de contrôle d\'intégrité des bilans.',
          'Revoir les questions pièges en SQL bancaire.'
        ],
        estimatedHours: 4.5
      },
      {
        dayNumber: 6,
        title: 'Simulation d\'Examen Blanc Chronométré',
        focus: 'Passage du test complet dans les conditions réelles du concours d\'admission BCC.',
        readingModules: ['module-6-methodologie-admission'],
        recommendedExercises: [],
        keyActions: [
          'Passer le simulateur d\'examen blanc complet (15 questions chronométrées).',
          'Analyser en détail les explications des questions manquées.',
          'Lire le guide méthodologique pour la rédaction de notes au Gouverneur.'
        ],
        estimatedHours: 4
      },
      {
        dayNumber: 7,
        title: 'Consolidation, Repères Chiffrés & Préparation Orale',
        focus: 'Mémorisation des ordres de grandeur récents de la RDC et posture professionnelle face au jury.',
        readingModules: [],
        recommendedExercises: [],
        keyActions: [
          'Vérifier les chiffres récents : Cours indicatif (~2850-2900 CDF), Réserves de change (~5-6 Mds USD / 13 sem. importations), Taux directeur.',
          'S\'entraîner à formuler des recommandations stratégiques à partir de graphiques.',
          'Se reposer la veille pour être vif et concentré lors de l\'épreuve.'
        ],
        estimatedHours: 3
      }
    ]
  },
  {
    id: 'plan-14-days',
    title: 'Programme Équilibré (14 Jours - Recommandé)',
    durationLabel: '14 Jours',
    targetProfile: 'Recommandé pour une préparation solide, alliant rigueur théorique et maîtrise du code.',
    intensity: 'Régulier (2-3h/jour)',
    strategyTips: [
      'Permet d\'alterner 1 jour de théorie / lecture avec 1 jour de code / TP.',
      'Permet d\'exporter les jeux de données CSV pour s\'exercer directement sur son propre Jupyter Notebook ou pgAdmin.',
      'Offre le temps de refaire chaque exercice technique une seconde fois sans regarder la solution.'
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Cadre Légal et Statuts de la BCC',
        focus: 'Loi Organique 18/027, Indépendance de la Banque, Organigramme DRE/DSIF/DOBM.',
        readingModules: ['module-1-institutions-bcc'],
        recommendedExercises: [],
        keyActions: ['Lecture intégrale du Module 1', 'Faire le Quiz 1'],
        estimatedHours: 2.5
      },
      {
        dayNumber: 2,
        title: 'TP SQL : Nettoyage et Normalisation Multidevise',
        focus: 'Conversions CDF/USD au taux officiel, gestion des valeurs aberrantes et encours net.',
        readingModules: [],
        recommendedExercises: ['exo-1-cleaning-multidevise'],
        keyActions: ['Résoudre l\'exercice 1 en SQL puis en Pandas', 'Comparer avec la solution officielle'],
        estimatedHours: 2.5
      },
      {
        dayNumber: 3,
        title: 'Politique Monétaire Congolaise & Instruments',
        focus: 'Taux directeur, réserve obligatoire différenciée, dollarisation de l\'économie.',
        readingModules: ['module-2-politique-monetaire'],
        recommendedExercises: [],
        keyActions: ['Lecture approfondie du Module 2', 'Assimilation des mécanismes de réserve obligatoire'],
        estimatedHours: 2.5
      },
      {
        dayNumber: 4,
        title: 'TP Adjudications des Bons BCC',
        focus: 'Algorithme d\'adjudication au prix demandé et calcul du Taux Moyen Pondéré (TMP).',
        readingModules: [],
        recommendedExercises: ['exo-5-adjudication-bons-bcc'],
        keyActions: ['Programmer l\'algorithme d\'attribution des Bons BCC', 'Vérifier le TMP'],
        estimatedHours: 3
      },
      {
        dayNumber: 5,
        title: 'Réglementation Prudentielle et Normes de Solvabilité',
        focus: 'Instruction 14 de la BCC, CAR à 10%, Tier 1, Tier 2, Actifs pondérés des risques (RWA).',
        readingModules: ['module-3-surveillance-prudentielle'],
        recommendedExercises: [],
        keyActions: ['Lecture du Module 3 - Section 1', 'Mémorisation des pondérations de risque'],
        estimatedHours: 2.5
      },
      {
        dayNumber: 6,
        title: 'Classification des Créances & Audit NPL',
        focus: 'Instruction 15, Créances saines à compromises, Taux de couverture de provisions.',
        readingModules: ['module-3-surveillance-prudentielle'],
        recommendedExercises: ['exo-2-ratios-npl-dsif'],
        keyActions: ['Résoudre l\'exercice NPL en SQL', 'Identifier les établissements sous alerte DSIF'],
        estimatedHours: 3
      },
      {
        dayNumber: 7,
        title: 'Pause Active & Révision des Notions Fondamentales',
        focus: 'Revue des quiz des modules 1, 2 et 3.',
        readingModules: [],
        recommendedExercises: [],
        keyActions: ['Repasser les quiz 1 à 3 avec 100% de bonnes réponses'],
        estimatedHours: 1.5
      },
      {
        dayNumber: 8,
        title: 'Macroéconomie & Agrégats Monétaires (M0 à M3)',
        focus: 'Base monétaire, M1, M2, M3, ratio de dollarisation des dépôts.',
        readingModules: ['module-4-macroeconomie-condense'],
        recommendedExercises: ['exo-4-agregats-monetaires-m2'],
        keyActions: ['Calculer la structure des agrégats monétaires de la RDC', 'Calculer le multiplicateur k'],
        estimatedHours: 3
      },
      {
        dayNumber: 9,
        title: 'Séries Chronologiques & Marché des Changes',
        focus: 'Taux indicatif vs parallèle, calcul de spread, dépréciation hebdomadaire, LAG() en SQL.',
        readingModules: [],
        recommendedExercises: ['exo-3-volatilite-taux-change'],
        keyActions: ['Résoudre l\'exercice de séries chronologiques', 'Détecter les signaux d\'intervention'],
        estimatedHours: 3
      },
      {
        dayNumber: 10,
        title: 'Secteur Minier & Réserves Officielles de Change',
        focus: 'Corrélation cours Cuivre/Cobalt et fiscalité en devises, réserves en semaines d\'importations.',
        readingModules: ['module-4-macroeconomie-condense'],
        recommendedExercises: [],
        keyActions: ['Explorer le dataset des statistiques minières', 'Calculer la couverture d\'importations'],
        estimatedHours: 2.5
      },
      {
        dayNumber: 11,
        title: 'Stress-Testing & Modélisation Macroprudentielle',
        focus: 'Simulation de choc systémique sur le secteur bancaire congolais.',
        readingModules: ['module-5-boite-a-outils-data-analyst'],
        recommendedExercises: ['exo-6-stress-test-choc-minier'],
        keyActions: ['Exécuter le stress-test en Python et SQL', 'Calculer les recapitalisations requises'],
        estimatedHours: 3.5
      },
      {
        dayNumber: 12,
        title: 'Méthodologie du Concours & Restitution Stratégique',
        focus: 'Structure de la note de synthèse pour le Gouverneur, posture d\'entretien.',
        readingModules: ['module-6-methodologie-admission'],
        recommendedExercises: [],
        keyActions: ['Lecture du Module 6', 'Rédiger une synthèse de 3 paragraphes sur un cas de stress-test'],
        estimatedHours: 2.5
      },
      {
        dayNumber: 13,
        title: 'Examen Blanc en Conditions Réelles',
        focus: 'Test d\'admission complet chronométré.',
        readingModules: [],
        recommendedExercises: [],
        keyActions: ['Passer le test blanc', 'Analyser le score et débriefer les erreurs'],
        estimatedHours: 3
      },
      {
        dayNumber: 14,
        title: 'Derniers Réglages & Sérénité',
        focus: 'Vérification des ordres de grandeur et fiches récapitulatives.',
        readingModules: [],
        recommendedExercises: [],
        keyActions: ['Relire les fiches clés', 'Préparer ses arguments professionnels pour le jury'],
        estimatedHours: 1.5
      }
    ]
  }
];
