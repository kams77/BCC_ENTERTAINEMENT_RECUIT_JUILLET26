export interface InterviewQuestion {
  id: string;
  category: 
    | 'Institutionnel & Motivation'
    | 'Politique Monétaire & Marchés'
    | 'Surveillance Prudentielle (DSIF)'
    | 'Technique Data Analyst (SQL/Python)'
    | 'Mise en Situation & Éthique';
  question: string;
  juryObjective: string;
  recommendedAnswer: {
    coreMessage: string;
    keyPoints: string[];
    figuresToQuote: string[];
    structure: string;
  };
  pitfallsToAvoid: string[];
  sampleScript: string;
}

export const interviewQuestions: InterviewQuestion[] = [
  // 1. INSTITUTIONNEL & MOTIVATION
  {
    id: 'int-01',
    category: 'Institutionnel & Motivation',
    question: 'Pourquoi souhaitez-vous intégrer la Banque Centrale du Congo en tant que Data Analyst, plutôt qu\'une banque commerciale ou un cabinet d\'audit de la place ?',
    juryObjective: 'Tester le sens de l\'intérêt général, la compréhension des missions régaliennes et vérifier que le candidat ne cherche pas simplement un emploi bancaire privé classique.',
    recommendedAnswer: {
      coreMessage: 'Mettre en avant la finalité régalienne de stabilité macroéconomique et l\'impact systémique de l\'analyse de données pour la nation congolaise.',
      keyPoints: [
        'Dans une banque commerciale, l\'analyste optimise le profit et le portefeuille privé de l\'établissement.',
        'À la Banque Centrale, l\'analyste travaille pour la stabilité macroéconomique, la préservation du pouvoir d\'achat de plus de 100 millions de citoyens et la solidité de tout le système financier.',
        'Les données traitées à la BCC sont uniques et exhaustives : données de balance des paiements, encours consolidés de toutes les banques, adjudications de devises et politique monétaire.'
      ],
      figuresToQuote: ['Loi Organique n° 18/027, article 3 (stabilité des prix)', 'Système financier national composé de 15 banques commerciales agréées'],
      structure: '1. Distinction nette entre objectif commercial privé vs intérêt général public. 2. Passion pour la donnée macroprudentielle systémique. 3. Volonté d\'apporter des compétences quantitatives modernes à la souveraineté monétaire de la RDC.'
    },
    pitfallsToAvoid: [
      'Parler de la sécurité de l\'emploi ou des avantages de la fonction publique.',
      'Dire que vous voulez "apprendre la finance" (le jury attend un professionnel opérationnel prêt à contribuer).',
      'Critiquer les banques commerciales privées.'
    ],
    sampleScript: "« Monsieur/Madame le Membre du Jury, intégrer la Banque Centrale du Congo répond à une vocation régalienne. Dans une banque commerciale de la place, le rôle du data analyst est d'optimiser la rentabilité d'un portefeuille privé. À la BCC, l'enjeu est d'une toute autre ampleur : chaque statistique nettoyée, chaque modèle de prévision de l'inflation ou d'audit prudentiel nourrit directement les décisions du Comité de Politique Monétaire pour préserver la valeur du Franc Congolais et protéger l'épargne de notre population. C'est cette dimension d'intérêt public et d'impact systémique qui me motive profondément. »"
  },
  {
    id: 'int-02',
    category: 'Institutionnel & Motivation',
    question: 'Quelle est la portée de l\'indépendance de la Banque Centrale du Congo selon la Loi Organique n° 18/027 ?',
    juryObjective: 'Vérifier la maîtrise juridique du statut d\'autonomie de la BCC vis-à-vis du pouvoir politique et du Trésor Public.',
    recommendedAnswer: {
      coreMessage: 'L\'indépendance institutionnelle, fonctionnelle et financière est le garant technique de la crédibilité de la monnaie nationale et de la lutte contre l\'inflation.',
      keyPoints: [
        'Indépendance fonctionnelle : le Gouverneur et le Conseil d\'Administration ne reçoivent d\'instructions d\'aucune autorité politique dans la conduite de la politique monétaire.',
        'Interdiction du financement monétaire direct des déficits publics (fin de la "planche à billets").',
        'Redevabilité démocratique : la BCC rend compte au Parlement via la transmission de son rapport annuel et ses auditions.'
      ],
      figuresToQuote: ['Loi n° 18/027 du 13 décembre 2018', 'Article 3 et Article 6'],
      structure: '1. Définition légale de l\'autonomie. 2. Justification économique (éviter l\'hyperinflation passée). 3. Équilibre avec la redevabilité démocratique.'
    },
    pitfallsToAvoid: [
      'Affirmer que la BCC est totalement détachée de l\'État (elle reste une institution publique de la République).',
      'Oublier de mentionner la redevabilité envers le Parlement.'
    ],
    sampleScript: "« L'indépendance de la BCC, consacrée par la Loi Organique n° 18/027, est triple : institutionnelle, fonctionnelle et financière. Elle garantit que la politique monétaire est pilotée sur des critères techniques et scientifiques afin de préserver la stabilité des prix, à l'abri des cycles électoraux à court terme. Cette autonomie s'accompagne d'une stricte interdiction des avances directes au Trésor et d'une obligation de transparence vis-à-vis des représentants du peuple congolais. »"
  },

  // 2. POLITIQUE MONÉTAIRE & MARCHÉS
  {
    id: 'int-03',
    category: 'Politique Monétaire & Marchés',
    question: 'Si le Franc Congolais subit une dépréciation rapide de 4% en dix jours sur le marché parallèle de Kinshasa, quelle chaîne d\'analyse statistique déclenchez-vous à la DRE ?',
    juryObjective: 'Tester les réflexes opérationnels, la rigueur méthodologique et la capacité à isoler les causes sous-jacentes d\'une tension de change.',
    recommendedAnswer: {
      coreMessage: 'Déployer une analyse en 4 étapes : diagnostic des flux de liquidité, vérification de la demande de devises, calcul de l\'élasticité d\'inflation et proposition d\'arbitrage au CPM.',
      keyPoints: [
        'Étape 1 - Contrôle de la liquidité bancaire : vérifier si le Trésor a injecté des liquidités massives en CDF (salaires fonctionnaires, décaissements de marchés publics) générant une surliquidité oisive.',
        'Étape 2 - Surveillance du marché interbancaire : analyser les volumes réels transigés vs les cotations informelles de rue.',
        'Étape 3 - Évaluation de l\'écart indicatif/parallèle (spread) : si le spread dépasse 2,5%, risque avéré de contagion sur le panier de la ménagère.',
        'Étape 4 - Formulation de scénarios pour la haute direction : opportunité d\'émission ponctuelle de Bons BCC (B-BCC) à 7 ou 28 jours ou vente ciblée de devises par la DOBM.'
      ],
      figuresToQuote: ['Seuil d\'alerte de spread : > 2,5%', 'Cours indicatif actuel (~2 850 - 2 920 CDF/USD)', 'Taux directeur en vigueur'],
      structure: '1. Collecte et validation des données en temps réel. 2. Identification des facteurs déclencheurs (budgétaires vs spéculatifs). 3. Modélisation de l\'impact inflationniste. 4. Note décisionnelle d\'intervention.'
    },
    pitfallsToAvoid: [
      'Proposer immédiatement de dépenser les réserves de change sans analyser la liquidité en CDF.',
      'Ignorer le lien entre dépenses publiques et pression sur le change.',
      'Parler de manière vague sans citer les instruments opérationnels (Bons BCC, réserve obligatoire).'
    ],
    sampleScript: "« En tant que data analyst à la DRE, ma première démarche est de croiser les données de la position nette du Trésor à la BCC avec les soldes des comptes courants des banques commerciales. Une brusque tension sur le marché parallèle découle souvent d'un excédent de liquidités en Francs Congolais injecté dans l'économie sans contrepartie immédiate en devises. Je quantifie l'évolution du spread, j'estime l'accélération de l'inflation sous-jacente via notre modèle de pass-through, et je prépare une note de cadrage proposant soit d'éponger cet excédent par les Bons BCC, soit d'organiser une adjudication ciblée de devises si les réserves le permettent. »"
  },
  {
    id: 'int-04',
    category: 'Politique Monétaire & Marchés',
    question: 'Pourquoi la dollarisation de l\'économie congolaise complique-t-elle le travail de la Banque Centrale ?',
    juryObjective: 'Évaluer la compréhension profonde de la structure monétaire de la RDC et des limites des canaux traditionnels de transmission.',
    recommendedAnswer: {
      coreMessage: 'La dollarisation (~85% des dépôts et crédits) réduit le champ d\'action direct de la politique monétaire intérieure et rend l\'économie vulnérable aux chocs extérieurs.',
      keyPoints: [
        'Affaiblissement du canal du taux d\'intérêt : une hausse du taux directeur de la BCC n\'affecte directement que les 15% de monnaie en CDF.',
        'Prépondérance du canal du taux de change (pass-through immédiat sur les prix de détail des produits importés).',
        'Perte partielle de seigneuriage et limitation du rôle de prêteur en dernier ressort en devises.',
        'Nécessité d\'utiliser des instruments macroprudentiels différenciés (coefficient de réserve obligatoire plus élevé sur les devises).'
      ],
      figuresToQuote: ['Taux de dollarisation : ~85-87%', 'Importations annuelles : ~20-22 milliards USD'],
      structure: '1. Constat quantitatif chiffré. 2. Mécanismes d\'affaiblissement de la transmission. 3. Stratégies palliatives de la BCC.'
    },
    pitfallsToAvoid: [
      'Prétendre qu\'il suffit d\'interdire le dollar par décret du jour au lendemain.',
      'Ne pas mentionner le canal du taux de change.'
    ],
    sampleScript: "« Avec plus de 85% des dépôts bancaires libellés en dollars, la RDC se trouve dans une situation de dollarisation financière asymétrique. Pour la BCC, cela signifie que le canal classique du refinancement et du taux d'intérêt a une portée circonscrite à la fraction en Francs Congolais. En revanche, le canal du taux de change devient hyper-réactif : le moindre glissement du cours se répercute instantanément sur l'inflation. Le data analyst doit donc suivre simultanément M2 (masse en monnaie nationale) et M3 (masse élargie intégrant les devises) pour bien conseiller le Comité de Politique Monétaire. »"
  },

  // 3. SURVEILLANCE PRUDENTIELLE (DSIF)
  {
    id: 'int-05',
    category: 'Surveillance Prudentielle (DSIF)',
    question: 'Comment détectez-vous une anomalie ou une tentative d\'embellissement comptable (« window dressing ») dans le reporting d\'une banque commerciale ?',
    juryObjective: 'Tester le sens critique, la rigueur d\'audit prudentiel et les compétences d\'analyse de cohérence des données bancaires.',
    recommendedAnswer: {
      coreMessage: 'Mettre en œuvre des contrôles automatisés de cohérence interne, de ruptures temporelles brutales et de ratios hors-bilan.',
      keyPoints: [
        'Contrôles d\'invariants bilantiels : Actif Total = Passif Total, et Crédits Nets = Crédits Bruts - Provisions.',
        'Analyse des ruptures temporelles : une chute soudaine du ratio NPL juste avant la date de clôture trimestrielle sans désendettement documenté signale un restructuration artificielle de crédits sains.',
        'Croisement avec les engagements hors-bilan et les crédits accordés aux parties liées (administrateurs et actionnaires).',
        'Vérification des taux de provisionnement minimum imposés par l\'Instruction n° 15 (50% pour douteuses, 100% pour compromises).'
      ],
      figuresToQuote: ['Instruction n° 15 de la BCC', 'Seuil d\'alerte NPL : 5,0%', 'Ratio CAR minimum : 10,0%'],
      structure: '1. Algorithmes de contrôle d\'intégrité des données. 2. Détection d\'atypismes par séries temporelles. 3. Procédure de notification DSIF.'
    },
    pitfallsToAvoid: [
      'Accuser immédiatement de fraude sans avoir procédé aux vérifications techniques préalables.',
      'Oublier les engagements hors-bilan et les crédits aux apparentés.'
    ],
    sampleScript: "« À la DSIF, la détection des anomalies repose sur des pipelines automatisés. Tout d'abord, nous vérifions les égalités bilantielles strictes. Ensuite, j'écris des requêtes SQL calculant les variations inter-périodes avec la fonction LAG() : si une banque voit son ratio NPL passer de 8% à 3% en une semaine sans cession de créances déclarée, cela indique un rééchelonnement cosmétique. Enfin, je vérifie la formule du CAR : si les actifs pondérés par le risque (RWA) diminuent anormalement alors que le crédit aux entreprises augmente, cela déclenche une alerte immédiate d'inspection sur pièces. »"
  },

  // 4. TECHNIQUE DATA ANALYST (SQL / PYTHON / STATS)
  {
    id: 'int-06',
    category: 'Technique Data Analyst (SQL/Python)',
    question: 'Quelle architecture technique privilégiez-vous pour automatiser la consolidation hebdomadaire du « Condensé d\'informations statistiques » de la BCC ?',
    juryObjective: 'Évaluer la vision d\'ingénierie des données, la reproductibilité des analyses et la fiabilité des pipelines ETL au sein d\'une banque centrale.',
    recommendedAnswer: {
      coreMessage: 'Construire un pipeline ETL robuste, versionné et auditable associant PostgreSQL/SQL pour les jointures massives et Python pour les séries temporelles et les contrôles qualité.',
      keyPoints: [
        'Ingestion & Validation (Extract/Load) : scripts d\'ingestion des flux des banques (formats normalisés XBRL ou CSV cryptés) avec rejet automatique des déclarations déséquilibrées.',
        'Transformation & Consolidation (Transform) : modèles SQL avec Window Functions et vues matérialisées pour calculer les moyennes mobiles, agrégats M0-M3 et spreads de change.',
        'Contrôle qualité automatisé : tests d\'assertion (pas de cours de change négatif, somme des actifs égale à la somme des passifs).',
        'Restitution (Reporting) : génération automatique des tableaux de bord et export sécurisé pour le Cabinet du Gouverneur.'
      ],
      figuresToQuote: ['Format XBRL de surveillance bancaire', 'Gestion des fréquences temporelles W-FRI (clôture hebdomadaire du vendredi)'],
      structure: '1. Ingestion sécurisée. 2. Nettoyage et tests d\'intégrité. 3. Calculs analytiques sous SQL/Python. 4. Traçabilité et gouvernance des données.'
    },
    pitfallsToAvoid: [
      'Proposer de faire des copier-coller manuels dans Microsoft Excel.',
      'Ne pas mentionner la sécurité et la traçabilité des données bancaires confidentielles.'
    ],
    sampleScript: "« Pour fiabiliser et accélérer la production du Condensé statistique, la méthode consiste à éliminer les manipulations manuelles sur tableur. Je préconise un pipeline automatisé Python/SQL : chaque vendredi à la clôture, les déclarations sont intégrées dans notre base de données sécurisée. Des tests unitaires vérifient instantanément l'intégrité comptable. Les requêtes SQL calculent les glissements annuels de l'inflation et les soldes de réserves de change. Enfin, le tableau de bord hebdomadaire est généré automatiquement avec un journal d'audit complet garantissant que chaque chiffre est traçable jusqu'à sa source première. »"
  },
  {
    id: 'int-07',
    category: 'Technique Data Analyst (SQL/Python)',
    question: 'Pourquoi et comment tester la stationnarité d\'une série financière avant de réaliser des prévisions économétriques ?',
    juryObjective: 'Vérifier la maîtrise des concepts d\'économétrie appliquée indispensables à la Direction de la Recherche et des Études (DRE).',
    recommendedAnswer: {
      coreMessage: 'Une série non-stationnaire conduit au piège de la régression fallacieuse (spurious regression) : deux séries sans lien économique réel peuvent présenter un R² artificiellement élevé.',
      keyPoints: [
        'Définition de la stationnarité : espérance mathématique, variance constantes dans le temps, et autocovariance dépendant uniquement du retard.',
        'Test économétrique de référence : Test de Dickey-Fuller Augmenté (ADF) ou test KPSS.',
        'Si la série a une racine unitaire (ex. niveau du cours CDF/USD ou niveau des prix) : différencier la série en calculant le taux de variation log-normal (rendements continus) pour la rendre stationnaire I(0).',
        'Recherche de cointégration (Test de Johansen / Engle-Granger) pour modéliser une relation d\'équilibre de long terme (modèle à correction d\'erreur VECM).'
      ],
      figuresToQuote: ['P-value < 0.05 au test ADF', 'Modèle Vector Error Correction (VECM)'],
      structure: '1. Risque de la régression fallacieuse. 2. Méthodologie statistique du test ADF. 3. Transformation par différenciation ou cointégration.'
    },
    pitfallsToAvoid: [
      'Répondre simplement "pour faire des graphiques propres".',
      'Confondre corrélation simple et relation causale de cointégration.'
    ],
    sampleScript: "« En finance et en macroéconomie, la majorité des grandeurs en niveau (comme l'IPC ou le taux de change nominal) ont une tendance stochastique : elles ne sont pas stationnaires. Si l'on applique une simple régression des moindres carrés ordinaires (MCO) sur ces niveaux, on obtient presque toujours un R² très élevé et des tests de Student trompeurs. Le test de Dickey-Fuller Augmenté (ADF) permet de vérifier formellement la présence d'une racine unitaire. Si la série est intégrée d'ordre 1, nous passons en différences premières ou nous testons l'existence d'une relation de cointégration de long terme via un modèle VECM pour capturer la dynamique des prix en RDC. »"
  },

  // 5. MISE EN SITUATION & ÉTHIQUE
  {
    id: 'int-08',
    category: 'Mise en Situation & Éthique',
    question: 'Vous observez une incohérence majeure dans les déclarations d\'une banque systémique, mais un cadre supérieur vous demande d\'arrondir les chiffres pour ne pas affoler le marché. Que faites-vous ?',
    juryObjective: 'Évaluer l\'intégrité professionnelle, l\'éthique déontologique de la Banque Centrale et le courage managérial.',
    recommendedAnswer: {
      coreMessage: 'La Banque Centrale fonde toute son autorité sur la crédibilité et l\'exactitude inviolable de ses chiffres. L\'éthique et la vérité comptable ne sont jamais négociables.',
      keyPoints: [
        'Le devoir de réserve et le secret professionnel s\'accompagnent d\'un devoir absolu de rigueur et d\'honnêteté intellectuelle.',
        'Camoufler une incohérence met en péril la stabilité systémique et engage la responsabilité juridique de la Banque Centrale.',
        'Démarche méthodique : documenter méthodiquement l\'anomalie par écrit, conserver les traces des données brutes, et remonter l\'information par la voie hiérarchique officielle (Directeur de la DSIF ou Gouverneur) sans altération.'
      ],
      figuresToQuote: ['Charte d\'éthique de la Banque Centrale du Congo', 'Normes internationales de supervision du Comité de Bâle'],
      structure: '1. Réaffirmation claire et ferme du principe de vérité des chiffres. 2. Formalisation écrite et traçabilité technique. 3. Transmission rigoureuse aux instances hiérarchiques habilitées.'
    },
    pitfallsToAvoid: [
      'Accepter d\'arrondir ou d\'altérer les données.',
      'S\'emporter ou menacer de divulguer l\'information dans la presse (violation du secret bancaire).'
    ],
    sampleScript: "« Sans la moindre hésitation, je refuse d'altérer ou d'arrondir les données. La crédibilité de la Banque Centrale du Congo repose entièrement sur la véracité incontestable de ses statistiques. Dissimuler une anomalie sur un établissement systémique ne résout pas le problème : cela l'aggrave et expose tout le système bancaire à un risque de contagion inopiné. Ma responsabilité d'analyste est de documenter minutieusement l'écart avec les pièces justificatives d'audit et d'alerter par écrit mon Directeur pour que la BCC exerce ses prérogatives de régulation en toute souveraineté. »"
  }
];

export interface OralMethodologyAdvice {
  title: string;
  points: string[];
}

export const oralExamMethodology: OralMethodologyAdvice[] = [
  {
    title: '1. Les 5 Réflexes d\'Or face au Jury de la BCC',
    points: [
      'Parlez en souveraineté et intérêt général : remplacez "le marché veut" par "la stabilité du niveau général des prix et la protection de l\'épargne nationale exigent".',
      'Maîtrisez les ordres de grandeur récents : Taux indicatif (~2 850 - 2 920 CDF), Réserves officielles (~5,4 - 5,6 Mds USD soit ~13 semaines d\'importations), Cours du Cuivre (~9 000 - 9 500 $/tonne).',
      'Structurez systématiquement vos réponses : 1. Constat factuel chiffré, 2. Facteurs explicatifs, 3. Risques induits, 4. Recommandation pour la Banque.',
      'Démontrez votre aisance sur les acronymes : DSIF, DRE, DOBM, CPM, NPL, CAR, B-BCC, TMP, RO, ATS/CSD.',
      'Si vous ignorez un chiffre précis, reconnaissez-le avec modestie et expliquez la méthode exacte pour l\'extraire de la base de données.'
    ]
  },
  {
    title: '2. Les Questions Intelligentes à Poser au Jury à la Fin de l\'Entretien',
    points: [
      '« Quels sont les chantiers prioritaires actuels de la DSIF concernant la transition vers les reportings automatisés en temps réel des banques ? »',
      '« Comment la DRE envisage-t-elle l\'intégration des données massives (Big Data / données de mobile money) pour affiner la prévision d\'inflation infra-mensuelle ? »',
      '« Quelles opportunités d\'accompagnement technique offre la BCC pour renforcer l\'expertise de ses data analysts auprès des banques centrales partenaires ou du FMI ? »'
    ]
  }
];
