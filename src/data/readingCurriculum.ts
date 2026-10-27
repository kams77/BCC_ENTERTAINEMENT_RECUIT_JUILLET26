import { ReadingModule } from '../types';

export const readingCurriculum: ReadingModule[] = [
  {
    id: 'module-1-institutions-bcc',
    moduleNumber: '01',
    title: 'Cadre Institutionnel, Missions et Statuts de la BCC',
    subtitle: 'Loi Organique n° 18/027, Indépendance, Organes de Décision et Missions Régaliennes',
    estimatedReadingTime: '25 min',
    category: 'Institutionnel & Réglementaire',
    priority: 'Priorité Absolue',
    summary: 'Maîtrise indispensable des textes fondateurs de la Banque Centrale du Congo, de son mandat légal de stabilité des prix et de l\'organisation interne qui structure les flux de données (DRE, DSIF, DOBM, DSI).',
    keyTakeaways: [
      'La Loi Organique n° 18/027 du 13 décembre 2018 régit le fonctionnement, l\'indépendance et la gouvernance de la BCC.',
      'Objectif fondamental unique : la stabilité du niveau général des prix (article 3).',
      'Missions complémentaires : mise en œuvre de la politique monétaire, émission du Franc Congolais (CDF), conservation des réserves de change, surveillance du système de paiement et régulation bancaire.',
      'Le Comité de Politique Monétaire (CPM) est l\'organe technique décisionnel clé pour fixer le taux directeur et le coefficient de réserve obligatoire.'
    ],
    officialReferences: [
      'Loi Organique n° 18/027 du 13 décembre 2018 portant organisation et fonctionnement de la Banque Centrale du Congo',
      'Statuts de la Banque Centrale du Congo (Articles 3, 6, 12 à 25)',
      'Loi n° 003/2002 du 02 février 2002 relative à l\'activité et au contrôle des Établissements de Crédit'
    ],
    contentSections: [
      {
        heading: '1. Le Mandat Légal et l\'Objectif Principal de la BCC',
        body: `La Banque Centrale du Congo (BCC) est une institution publique dotée de la personnalité juridique et de l\'autonomie de gestion. Aux termes de l\'article 3 de la Loi n° 18/027, la mission principale de la Banque Centrale est d'assurer la stabilité du niveau général des prix.

Sans préjudice de cet objectif primordial, la Banque apporte son soutien à la politique économique générale du Gouvernement de la RDC en vue de favoriser une croissance économique durable et équilibrée.

Pour un Data Analyst à la BCC, chaque chiffre produit ou analysé (inflation, taux de change, masse monétaire) est directement rattaché à ce mandat. La Banque ne tolère aucune approximation dans les séries statistiques car elles fondent les décisions du Comité de Politique Monétaire (CPM).`,
        callout: {
          type: 'law',
          title: 'Article 3 de la Loi Organique n° 18/027',
          content: '« La Banque Centrale du Congo est chargée de définir et de mettre en œuvre la politique monétaire du pays dont l\'objectif principal est d\'assurer la stabilité du niveau général des prix. »'
        }
      },
      {
        heading: '2. Les Cinq Missions Fondamentales de la Banque',
        body: `La BCC exerce cinq prérogatives constitutionnelles et légales :
1. Définir et conduire la politique monétaire : gestion de la liquidité bancaire par les taux directeurs, les adjudications de Bons BCC et les réserves obligatoires.
2. Émettre la monnaie fiduciaire : privilège exclusif d'émission des billets et pièces libellés en Francs Congolais (CDF) ayant cours légal sur tout le territoire national.
3. Détenir et gérer les réserves officielles de change : gestion du portefeuille d'or monétaire et de devises étrangères (USD, DTS, EUR) pour garantir les paiements extérieurs de la République.
4. Réguler et surveiller les établissements de crédit : octroi des agréments, surveillance microprudentielle et macroprudentielle (via la DSIF).
5. Promouvoir le bon fonctionnement des systèmes de paiement : gestion du RTGS national (Real-Time Gross Settlement) / ATS (Automated Transfer System) et du Dépositaire Central (CSD).`
      },
      {
        heading: '3. Les Directions Clés pour un Data Analyst',
        body: `En tant que Data Analyst, vous interagirez principalement avec :
- La Direction de la Recherche et des Études (DRE) : analyse conjoncturelle, prévision de l'inflation, modélisation macroéconomique, publication du « Condensé d'informations statistiques » hebdomadaire et du Rapport Annuel.
- La Direction de la Surveillance des Intermédiaires Financiers (DSIF) : collecte des déclarations réglementaires périodiques (bilans, hors-bilan, ratios de solvabilité, NPL), data quality bancaire, stress testing.
- La Direction des Opérations Bancaires et des Marchés (DOBM) : conduite des adjudications de Bons BCC, interventions sur le marché des changes, gestion de la trésorerie en devises.
- La Direction des Systèmes d'Information (DSI) : gouvernance des data warehouses, pipelines ETL, sécurité des bases de données et intégration des flux bancaires.`
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Quel est l\'objectif principal assigné à la Banque Centrale du Congo par la Loi Organique n° 18/027 ?',
        options: [
          'Maximiser les recettes fiscales de l\'État congolais',
          'Assurer la stabilité du niveau général des prix',
          'Fixer le taux de change du Franc Congolais à parité fixe avec l\'USD',
          'Financer directement les déficits budgétaires du gouvernement'
        ],
        correctIndex: 1,
        explanation: 'L\'article 3 de la Loi Organique 18/027 dispose expressément que l\'objectif fondamental de la BCC est d\'assurer la stabilité du niveau général des prix.',
        bccReference: 'Loi Organique 18/027, Art. 3'
      },
      {
        id: 'q1-2',
        question: 'Quelle direction de la BCC est directement en charge de la publication hebdomadaire du « Condensé d\'informations statistiques » ?',
        options: [
          'La Direction des Ressources Humaines',
          'La Direction de la Recherche et des Études (DRE)',
          'La Direction de l\'Émission et des Opérations Métalliques',
          'La Direction Juridique'
        ],
        correctIndex: 1,
        explanation: 'La DRE (Direction de la Recherche et des Études) pilote les statistiques macroéconomiques, l\'analyse de conjoncture et le Condensé hebdomadaire.',
        bccReference: 'Organigramme BCC / Attributions DRE'
      }
    ]
  },
  {
    id: 'module-2-politique-monetaire',
    moduleNumber: '02',
    title: 'Politique Monétaire Congolaise & Instruments Opérationnels',
    subtitle: 'Taux Directeur, Bons BCC (B-BCC), Réserve Obligatoire et Spécificités d\'une Économie Dollarisée',
    estimatedReadingTime: '35 min',
    category: 'Politique Monétaire & Marchés',
    priority: 'Priorité Absolue',
    summary: 'Analyse des mécanismes de transmission de la politique monétaire en RDC. Maîtrisez le calcul des Bons BCC, la réserve obligatoire différentielle et le rôle central du taux de change dans un environnement fortement dollarisé (~85%).',
    keyTakeaways: [
      'Le Taux Directeur de la BCC est le taux pivot qui oriente le coût du refinancement bancaire et le rendement des Bons BCC.',
      'Les Bons BCC (B-BCC) sont émis à 7, 14, 28 et 84 jours pour ponctionner la surliquidité oisive des banques créatrices d\'inflation.',
      'Le coefficient de la Réserve Obligatoire est différencié : dépôts en monnaie nationale (CDF) vs dépôts en devises étrangères (USD).',
      'Le canal du taux de change (pass-through) est le canal dominant de transmission de la politique monétaire en RDC en raison de la dollarisation des prix.'
    ],
    officialReferences: [
      'Instructions Administratives de la BCC relatives aux opérations d\'Open Market',
      'Règlements du Comité de Politique Monétaire (CPM) de la BCC',
      'Circulaire relative à la constitution de la réserve obligatoire sur les dépôts bancaires'
    ],
    contentSections: [
      {
        heading: '1. Le Cadre Opérationnel et les Instruments de la BCC',
        body: `Dans un système bancaire en situation structurelle de surliquidité monétaire (comme à Kinshasa), la politique monétaire est restrictive ou accommodante selon les tensions sur le Franc Congolais et l'indice des prix.

Les principaux instruments comprennent :
1. Le Taux Directeur : taux d'intérêt fixé par le CPM. Une hausse (ex. de 11% à 25%) vise à renchérir la monnaie nationale et à inciter les banques à placer leurs liquidités auprès de la BCC plutôt qu'à spéculer sur le dollar.
2. Les Bons BCC (B-BCC) : titres de créance négociables émis par adjudications hebdomadaires. Maturités standard : 7 jours (très court terme), 14 jours, 28 jours et 84 jours. Les banques souscrivent avec un taux offert ; la BCC détermine le taux marginal et le Taux Moyen Pondéré (TMP).
3. La Réserve Obligatoire (RO) : pourcentage des dépôts de la clientèle que les banques commerciales sont tenues de bloquer sur leur compte courant à la Banque Centrale, non rémunéré.
4. Les facilités permanentes : facilité de prêt marginal (guichet de refinancement d'urgence) et facilité de dépôt rémunéré.`,
        callout: {
          type: 'formula',
          title: 'Formule des Intérêts Précomptés sur Bon BCC',
          content: 'Valeur Actuelle = Valeur Nominale / (1 + (Taux x Jours / 360))\nIntérêts = Valeur Nominale - Valeur Actuelle'
        }
      },
      {
        heading: '2. La Dollarisation Financière et le Phénomène de Pass-Through',
        body: `La RDC se caractérise par une dollarisation financière extrême : environ 85% des dépôts bancaires et 88% des crédits sont libellés en dollars américains (USD).

Conséquences directes pour le Data Analyst :
- Le canal traditionnel du crédit et du taux d'intérêt intérieur est affaibli : une hausse du taux directeur sur le Franc Congolais ne touche directement qu'une fraction minoritaire de la masse monétaire.
- Le canal du taux de change est hyper-actif : toute dépréciation du Franc Congolais par rapport au dollar américain se répercute quasi immédiatement sur les prix intérieurs des biens importés (carburant, denrées alimentaires de base). C'est le coefficient de pass-through (élasticité des prix intérieurs par rapport au taux de change nominal).
- Taux Indicatif vs Taux Parallèle : La BCC calcule chaque jour le cours indicatif officiel (moyenne pondérée des transactions interbancaires). Le cours parallèle ou cours du marché libre reflète la demande de devises au comptant des ménages et opérateurs informels.`
      },
      {
        heading: '3. Les Adjudications de Devises',
        body: `Pour lisser les fluctuations désordonnées du Franc Congolais sans gaspiller ses réserves officielles de change, la BCC organise ponctuellement des ventes de devises par adjudication aux banques commerciales agrées.
L'analyse de données permet de mesurer le taux de couverture des demandes des banques, le taux moyen d'adjudication et l'impact immédiat sur le spread entre cours officiel et cours libre.`
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Quel est l\'objectif principal de l\'émission des Bons BCC (B-BCC) par la Banque Centrale du Congo ?',
        options: [
          'Financer les projets d\'infrastructure du gouvernement',
          'Éponger la surliquidité monétaire oisive du secteur bancaire pour freiner l\'inflation',
          'Remplacer les billets de Franc Congolais détériorés',
          'Fournir des devises USD aux entreprises importatrices'
        ],
        correctIndex: 1,
        explanation: 'Les Bons BCC sont des instruments d\'open market servant à ponctionner la liquidité excédentaire en Francs Congolais des banques commerciales.',
        bccReference: 'Instructions d\'Open Market de la BCC'
      },
      {
        id: 'q2-2',
        question: 'Pourquoi le canal du taux de change est-il plus puissant que le canal du taux d\'intérêt en RDC ?',
        options: [
          'Parce qu\'il n\'y a aucune banque commerciale en RDC',
          'En raison de la forte dollarisation de l\'économie (~85% des dépôts en USD) et de la dépendance aux importations',
          'Parce que le Franc Congolais est rattaché à l\'Euro',
          'Parce que la BCC n\'a pas de taux directeur'
        ],
        correctIndex: 1,
        explanation: 'Avec plus de 80% des actifs et passifs bancaires en devises, les variations de taux d\'intérêt en monnaie nationale ont un impact direct restreint, tandis que le taux de change affecte instantanément les prix de détail.',
        bccReference: 'Rapport Annuel de la BCC / Politique Monétaire'
      }
    ]
  },
  {
    id: 'module-3-surveillance-prudentielle',
    moduleNumber: '03',
    title: 'Réglementation Prudentielle et Surveillance Bancaire (DSIF)',
    subtitle: 'Ratios de Solvabilité Bâle II/III, Classification des Créances (NPL), Provisions et Ratios de Liquidité',
    estimatedReadingTime: '40 min',
    category: 'Surveillance Bancaire & Risque',
    priority: 'Priorité Absolue',
    summary: 'Le cœur de métier du Data Analyst à la DSIF : calcul des ratios de fonds propres, surveillance des crédits non performants (NPL), vérification des provisions réglementaires et analyse des limites de concentration de risque.',
    keyTakeaways: [
      'Le ratio de solvabilité minimum imposé par la BCC est de 10% (Fonds propres prudentiels / Actifs pondérés des risques - RWA).',
      'Le portefeuille de crédit est classé en 5 catégories : Saines, À surveiller, Pré-douteuses, Douteuses, Compromises.',
      'Le NPL Ratio (Taux de créances en souffrance) = (Créances Douteuses + Compromises) / Total Crédits Bruts. Le seuil de vigilance prudentielle est de 5%.',
      'Règle de division des risques : l\'exposition globale sur un même débiteur ne doit pas dépasser 25% des fonds propres prudentiels de la banque.'
    ],
    officialReferences: [
      'Instruction n° 14 de la BCC relative aux normes de solvabilité des établissements de crédit',
      'Instruction n° 15 de la BCC relative à la classification et au provisionnement des créances',
      'Instruction n° 16 de la BCC relative aux normes de liquidité',
      'Instruction n° 21 relative à la division des risques'
    ],
    contentSections: [
      {
        heading: '1. Ratio de Solvabilité (Capital Adequacy Ratio - CAR)',
        body: `La réglementation prudentielle de la BCC impose aux banques commerciales de détenir un montant de fonds propres suffisant pour absorber les pertes inattendues découlant des risques de crédit, de marché et opérationnels.

Ratio de Solvabilité Global = (Fonds Propres Prudentiels / Somme des Actifs Pondérés des Risques - RWA) >= 10%

Les Fonds Propres Prudentiels sont divisés en :
- Tier 1 (Fonds propres de base) : capital social libéré, réserves légales, report à nouveau créditeur.
- Tier 2 (Fonds propres complémentaires) : titres subordonnés à durée indéterminée, réévaluations autorisées.

Les Actifs Pondérés des Risques (Risk-Weighted Assets - RWA) affectent une pondération forfaitaire selon la contrepartie : 0% pour les créances sur la BCC ou l'État congolais en monnaie nationale, 20% pour les banques notées, 50% pour les prêts hypothécaires résidentiels conformes, 100% pour les crédits ordinaires aux entreprises et particuliers.`,
        callout: {
          type: 'formula',
          title: 'Formule Prudentielle du CAR (BCC Instruction 14)',
          content: 'CAR = (Tier 1 + Tier 2) / (RWA_crédit + RWA_marché + RWA_opérationnel) >= 10.0%'
        }
      },
      {
        heading: '2. Classification des Créances et Taux de NPL',
        body: `L'Instruction n° 15 de la BCC définit la taxonomie obligatoire pour évaluer la qualité du portefeuille de crédit :
1. Classe 1 - Créances saines : remboursement régulier, situation financière saine de l'emprunteur.
2. Classe 2 - Créances à surveiller : retards de 30 à 60 jours, difficultés passagères (provision recommandée : 2% à 5%).
3. Classe 3 - Créances pré-douteuses : retards de 61 à 90 jours (provision minimale : 20%).
4. Classe 4 - Créances douteuses : retards de 91 à 180 jours, solvabilité compromise (provision minimale : 50%).
5. Classe 5 - Créances compromises : retards supérieurs à 180 jours ou litige contentieux (provision obligatoire : 100%).

Les créances en souffrance (Non-Performing Loans - NPL) regroupent les classes 3, 4 et 5 (ou 4 et 5 selon la définition stricte).
Taux de NPL = Créances en souffrance brutes / Total des crédits bruts accordés.
Taux de Couverture des NPL = Total des provisions constituées / Créances en souffrance brutes (vise généralement >= 70%).`
      },
      {
        heading: '3. Normes de Liquidité et Grands Risques',
        body: `Coefficient de liquidité immédiate : les actifs disponibles et réalisables à court terme doivent couvrir au minimum 100% des passifs exigibles à vue et à très court terme.
Division des risques (Instruction 21) :
- Grand risque : toute exposition nette sur un seul bénéficiaire ou groupe lié dépassant 10% des fonds propres.
- Limite individuelle : interdiction d'exposer plus de 25% des fonds propres nets sur une même contrepartie.
- Limite globale : le cumul des grands risques ne doit pas dépasser 800% des fonds propres prudentiels.`
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Quel est le ratio minimum de solvabilité prudentielle (CAR) exigé par la BCC pour une banque commerciale opérant en RDC ?',
        options: [
          '5 % des actifs pondérés',
          '8 % des actifs pondérés',
          '10 % des actifs pondérés',
          '20 % des actifs pondérés'
        ],
        correctIndex: 2,
        explanation: 'La réglementation de la BCC (Instruction n° 14) fixe le ratio minimum de solvabilité à 10 %, supérieur au minimum standard de Bâle I/II (8 %) pour tenir compte du profil de risque émergent.',
        bccReference: 'Instruction n° 14 de la BCC, Titre II'
      },
      {
        id: 'q3-2',
        question: 'Une créance bancaire dont les échéances impayées dépassent 180 jours est classée en RDC comme :',
        options: [
          'Créance saine avec sursis',
          'Créance à surveiller',
          'Créance pré-douteuse',
          'Créance compromise (avec provisionnement à 100%)'
        ],
        correctIndex: 3,
        explanation: 'Selon l\'Instruction n° 15 de la BCC, un retard supérieur à 180 jours entraîne le classement irrévocable en créance compromise avec obligation de provisionnement intégral à 100%.',
        bccReference: 'Instruction n° 15 de la BCC'
      }
    ]
  },
  {
    id: 'module-4-macroeconomie-condense',
    moduleNumber: '04',
    title: 'Statistiques Macroéconomiques & Condensé de la BCC',
    subtitle: 'Agrégats Monétaires M0 à M3, Secteur Minier (Cuivre/Cobalt), Réserves de Change et IPC',
    estimatedReadingTime: '30 min',
    category: 'Macroéconomie & Statistiques',
    priority: 'Hautement Recommandé',
    summary: 'Comprendre et manipuler les tableaux officiels du Condensé hebdomadaire d\'informations statistiques : base monétaire, monnaie scripturale, corrélation entre cours mondiaux des minerais et réserves en devises de la RDC.',
    keyTakeaways: [
      'La base monétaire (M0) comprend les billets en circulation hors BCC et les réserves des banques commerciales déposées à la BCC.',
      'M1 = Monnaie fiduciaire en circulation + Dépôts à vue en CDF. M2 = M1 + Quasi-monnaie (dépôts à terme en CDF). M3 = M2 + Dépôts en devises étrangères.',
      'Le multiplicateur de crédit relie la base monétaire à la masse monétaire : k = M2 / M0 (ou M3 / M0).',
      'Les réserves de change de la RDC sont traditionnellement évaluées en nombre de semaines d\'importations de biens et services (objectif cible conventionnel >= 12 semaines).'
    ],
    officialReferences: [
      'Condensé Hebdomadaire d\'Informations Statistiques de la BCC (Séries n° 40 à 52)',
      'Manuel de Statistiques Monétaires et Financières du FMI (MSMF 2016)',
      'Rapports sur l\'Évolution Économique et Monétaire Récente - DRE BCC'
    ],
    contentSections: [
      {
        heading: '1. Architecture des Agrégats Monétaires',
        body: `La BCC suit l'évolution des agrégats pour calibrer son offre de monnaie centrale :
- Base monétaire (M0) ou Monnaie Centrale : englobe les engagements monétaires directs de la BCC. C'est l'ancre du système.
  M0 = Circulation fiduciaire hors banques + Réserves des banques commerciales (réserves obligatoires + réserves libres).
- M1 (Monnaie au sens strict) : disponibilité de paiement immédiate en monnaie nationale.
  M1 = Monnaie fiduciaire hors banques + Dépôts transférables / dépôts à vue en Francs Congolais.
- M2 (Masse monétaire au sens intermédiaire) : M1 + dépôts à terme et livrets d'épargne en Francs Congolais (quasi-monnaie).
- M3 (Masse monétaire au sens large) : M2 + dépôts en devises étrangères (USD) des résidents auprès des banques créatrices de monnaie. En RDC, M3 est souvent 4 à 5 fois supérieur à M1 du fait de la prépondérance des dépôts en USD.`,
        callout: {
          type: 'bcc-note',
          title: 'Indicateur de Dollarisation',
          content: 'Taux de Dollarisation = Dépôts en Devises / Total des Dépôts Bancaires. En RDC, cet indicateur fluctue entre 82% et 87% selon les périodes.'
        }
      },
      {
        heading: '2. L\'Économie Minière et le Secteur Extérieur',
        body: `L'économie congolaise est tirée par ses exportations extractives (cuivre, cobalt, zinc, or, étain/coltan).
- Impact sur la Balance Commerciale et les Paiements : plus de 90% des exportations de la RDC proviennent du secteur minier.
- Rentrées fiscales en devises : les grandes sociétés minières paient leurs impôts (notamment l'IPR, l'IBP et les redevances minières) en devises au compte du Trésor à la BCC. Cela entraîne des flux massifs saisonniers (échéances fiscales d'avril et novembre) qui renforcent temporairement le Franc Congolais.
- Réserves de change : calculées en millions d'USD et converties en semaines d'importation :
  Semaines d'importation = (Réserves de change nettes / Importations annuelles prévisionnelles de biens et services) x 52.`
      },
      {
        heading: '3. Indice des Prix à la Consommation (IPC) et Inflation',
        body: `L'inflation est mesurée par l'Institut National de la Statistique (INS) en partenariat avec la BCC.
On distingue :
- L'inflation hebdomadaire : variation en pourcentage de l'IPC de la semaine courante par rapport à la semaine précédente.
- L'inflation en glissement annuel : comparaison de l'IPC du mois courant par rapport au même mois de l'année précédente.
- L'inflation sous-jacente : exclut les composantes volatiles que sont les prix des produits alimentaires frais et des produits énergétiques/carburants.`
      }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'Si les réserves de change de la BCC s\'élèvent à 5 200 millions USD et que les importations annuelles de biens et services sont de 20 800 millions USD, combien de semaines d\'importations ces réserves représentent-elles ?',
        options: [
          '8 semaines',
          '10 semaines',
          '13 semaines',
          '26 semaines'
        ],
        correctIndex: 2,
        explanation: 'Calcul : (5 200 / 20 800) x 52 = 0,25 x 52 = 13 semaines d\'importations.',
        bccReference: 'Condensé Statistique de la BCC - Indicateurs Extérieurs'
      },
      {
        id: 'q4-2',
        question: 'Quelle composante fait la différence principale entre l\'agrégat monétaire M2 et l\'agrégat monétaire M3 en RDC ?',
        options: [
          'L\'or monétaire détenu dans les coffres de la BCC',
          'Les dépôts bancaires en devises étrangères (USD) des résidents',
          'Les emprunts obligataires du gouvernement',
          'Les pièces de monnaie en circulation'
        ],
        correctIndex: 1,
        explanation: 'En RDC, M3 intègre l\'ensemble des dépôts en devises étrangères (qui constituent la grande majorité de la masse monétaire élargie), tandis que M2 se limite aux avoirs en monnaie nationale.',
        bccReference: 'Guide des Agrégats Monétaires BCC / FMI'
      }
    ]
  },
  {
    id: 'module-5-boite-a-outils-data-analyst',
    moduleNumber: '05',
    title: 'Boîte à Outils Technique du Data Analyst Financier',
    subtitle: 'SQL Analytique Avancé, Python/Pandas pour Séries Temporelles, Qualité des Données et Détection d\'Anomalies',
    estimatedReadingTime: '45 min',
    category: 'Compétences Techniques & Code',
    priority: 'Priorité Absolue',
    summary: 'Les fonctions SQL et scripts Python indispensables testés lors des examens d\'admission : fonctions de fenêtrage (LAG, LEAD, PARTITION BY), nettoyage de bilans bancaires contradictoires, traitement des dates et séries financières chronologiques.',
    keyTakeaways: [
      'Maîtrise des Window Functions SQL : AVG() OVER (PARTITION BY banque ORDER BY date ROWS BETWEEN 3 PRECEDING AND CURRENT ROW).',
      'Calcul du taux de variation glissant avec LAG() en SQL ou pct_change() en Python Pandas.',
      'Contrôle d\'intégrité bilantielle : Actif Total = Passif Total, et Crédits Bruts - Provisions = Crédits Nets.',
      'Gestion des multi-devises : toujours convertir les montants exprimés en CDF et USD dans une devise pivot unique avec la date de valorisation adéquate.'
    ],
    officialReferences: [
      'Standards de reporting bancaire DSIF / Template Déclarations Mensuelles',
      'Spécifications XBRL du système national de collecte bancaire',
      'Documentation officielle Python Pandas (Time Series / Resampling) & PostgreSQL Window Functions'
    ],
    contentSections: [
      {
        heading: '1. SQL pour l\'Audit et l\'Analyse Bancaire',
        body: `Dans une banque centrale, les examens d'admission testent votre capacité à interroger des bases de données de reporting bancaire volumineuses et complexes.

Cas d'usage fréquents lors du concours :
- Détecter les banques dont le ratio NPL a augmenté de plus de 2 points de pourcentage en un trimestre :
  \`SELECT code_banque, date, ratio_npl, ratio_npl - LAG(ratio_npl, 1) OVER (PARTITION BY code_banque ORDER BY date) AS variation_npl FROM reporting_prudential\`
- Identifier les banques qui n'ont pas respecté la réserve obligatoire requise :
  \`SELECT code_banque, solde_compte_bcc, reserve_requise, (solde_compte_bcc - reserve_requise) AS ecart_liquidite FROM situation_liquidite WHERE solde_compte_bcc < reserve_requise\`
- Agrégation conditionnelle : calcul des crédits par tranche de risque (CASE WHEN classe IN ('DOUTEUSE', 'COMPROMISE') THEN montant ELSE 0 END).`
      },
      {
        heading: '2. Python & Pandas pour l\'Économétrie et les Séries Chronologiques',
        body: `Pour la Direction de la Recherche et des Études (DRE), vous devez maîtriser les séries temporelles financières :
- Traitement des fréquences temporelles : conversion de données journalières en données hebdomadaires ou mensuelles avec \`df.resample('W').last()\` ou \`df.resample('M').mean()\`.
- Calcul des moyennes mobiles et de la volatilité historique : \`df['taux_usd_cdf'].rolling(window=4).std()\`.
- Détection des ruptures de tendance et des chocs de change.
- Tests statistiques de stationnarité (Test de Dickey-Fuller Augmenté - ADF) avant d'estimer un modèle ARIMA ou VAR pour prévoir l'inflation congolaise.`
      },
      {
        heading: '3. Contrôle Qualité des Données (Data Cleansing & Validation)',
        body: `Les déclarations transmises par les établissements de crédit contiennent régulièrement des erreurs matérielles ou des incohérences comptables :
1. Incohérence Actif/Passif : \`ABS(actif_total - passif_total) > seuil_tolerance\`.
2. Données négatives aberrantes sur des grandeurs strictement positives (fonds propres de base, encours de crédits, provisions).
3. Ruptures de format de date (DD/MM/YYYY vs YYYY-MM-DD) et confusions de devises (saisie en milliers de CDF au lieu d'USD).
4. Doublons de déclaration : banques ayant renvoyé deux fois le même fichier rectificatif.`
      }
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'En SQL, quelle clause permet de calculer la moyenne mobile du cours indicatif USD/CDF sur les 4 dernières semaines pour chaque ligne sans agréger la table ?',
        options: [
          'GROUP BY date HAVING count(*) = 4',
          'AVG(taux_indicatif) OVER (ORDER BY date ROWS BETWEEN 3 PRECEDING AND CURRENT ROW)',
          'SUM(taux_indicatif) / 4 WHERE date >= NOW() - INTERVAL 4 WEEK',
          'JOIN (SELECT AVG(taux_indicatif) FROM cours) ON 1=1'
        ],
        correctIndex: 1,
        explanation: 'La clause de fenêtrage AVG(...) OVER (ORDER BY date ROWS BETWEEN 3 PRECEDING AND CURRENT ROW) calcule précisément la moyenne mobile sur 4 périodes glissantes.',
        bccReference: 'Standard SQL Analytique DSI / DRE'
      },
      {
        id: 'q5-2',
        question: 'Lors d\'un contrôle de conformité à la DSIF, quelle formule vérifie l\'égalité comptable de base d\'un portefeuille de crédit ?',
        options: [
          'Crédits Bruts = Provisions + Fonds Propres',
          'Crédits Nets = Crédits Bruts - Provisions constituées',
          'Crédits Nets = Crédits Bruts + Créances en souffrance',
          'Provisions = Actif Total - Passif Total'
        ],
        correctIndex: 1,
        explanation: 'L\'encours net de crédit correspond toujours à l\'encours brut diminué des provisions spécifiques constituées pour couvrir les dépréciations probables.',
        bccReference: 'Instruction n° 15 de la BCC / Principes Comptables'
      }
    ]
  },
  {
    id: 'module-6-methodologie-admission',
    moduleNumber: '06',
    title: 'Méthodologie du Concours & Conseils d\'Admission BCC',
    subtitle: 'Structure des Épreuves, Rédaction d\'une Note de Synthèse Analytique et Posture d\'Entretien',
    estimatedReadingTime: '20 min',
    category: 'Méthodologie & Concours',
    priority: 'Hautement Recommandé',
    summary: 'Conseils pratiques et stratégiques pour aborder sereinement le test d\'admission à la Banque Centrale du Congo : gestion du temps, restitution claire des indicateurs pour les décideurs, et posture professionnelle.',
    keyTakeaways: [
      'L\'épreuve technique comporte généralement un volet QCM macro-financier, un cas pratique d\'analyse de données et des questions d\'interprétation.',
      'Ne vous contentez pas de sortir des chiffres bruts : chaque résultat doit être interprété sous l\'angle de son impact sur la stabilité monétaire ou bancaire.',
      'Structure recommandée pour une note d\'analyse BCC : 1. Constat chiffré, 2. Facteurs explicatifs, 3. Risques induits, 4. Recommandation d\'action pour la Banque.',
      'Précision terminologique : ne confondez jamais « cours indicatif » et « cours parallèle », ni « créances douteuses » et « créances compromises ».'
    ],
    officialReferences: [
      'Charte des valeurs et éthique de la Banque Centrale du Congo',
      'Format type des Notes Conjoncturelles soumises au Gouverneur de la BCC'
    ],
    contentSections: [
      {
        heading: '1. Ce qu\'attend le Jury d\'Admission de la BCC',
        body: `Pour recruter un Data Analyst, la Banque Centrale du Congo ne recherche pas seulement un programmeur informatique, mais un professionnel capable de traduire des volumes de données financières en aides à la décision stratégique pour la haute direction (Gouverneur, Vice-Gouverneurs, Directeurs).

Les trois qualités évaluées en priorité :
1. Rigueur quantitative absolue : une erreur de virgule sur les réserves de change ou sur le ratio de solvabilité d'une banque systémique discrédite toute l'analyse.
2. Maîtrise du contexte macroéconomique et monétaire de la RDC : connaître les ordres de grandeur réels (ex. cours du cuivre autour de 9 000-10 000 USD/tonne, taux indicatif autour de 2 800-2 900 CDF/USD, niveau des réserves de change entre 5 et 6 milliards USD).
3. Capacité de synthèse et esprit critique : déceler une anomalie cachée dans un tableau de 10 000 lignes et formuler une alerte argumentée.`
      },
      {
        heading: '2. Méthode pour Réussir le Cas Pratique Technique',
        body: `Lors du test sur ordinateur :
- Étape 1 (5 min) : Lisez l'intégralité du sujet. Identifiez si l'exercice relève de la politique monétaire (DRE) ou du risque bancaire (DSIF).
- Étape 2 (10 min) : Inspectez les tables fournies. Repérez les identifiants clés, les unités (milliers de CDF, millions d'USD) et les dates.
- Étape 3 (Code & Calculs) : Écrivez des requêtes SQL lisibles avec des alias explicites. Si vous utilisez Python, commentez les étapes de filtrage et d'agrégation.
- Étape 4 (Conclusion / Synthèse) : Concluez toujours par 2 ou 3 phrases de synthèse métier pour répondre à la question : « En tant qu'analyste de la Banque Centrale, que recommandez-vous face à ces chiffres ? »`
      }
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'Face à un tableau de reporting bancaire présentant une anomalie flagrante (ex. une banque affichant un CAR de 85% avec un portefeuille de crédit normal), quelle doit être votre démarche d\'analyste ?',
        options: [
          'Ignorer l\'anomalie et calculer la moyenne brute du secteur',
          'Isoler la banque, vérifier la cohérence des fonds propres et des actifs pondérés (RWA), et documenter une alerte de contrôle qualité',
          'Supprimer définitivement la banque de la base de données sans prévenir la direction',
          'Modifier le chiffre arbitrairement pour qu\'il ressemble aux autres banques'
        ],
        correctIndex: 1,
        explanation: 'La démarche rigoureuse d\'un analyste de surveillance bancaire consiste à identifier l\'incohérence, remonter aux composantes de calcul et signaler l\'anomalie pour vérification auprès de l\'établissement déclarant.',
        bccReference: 'Bonnes Pratiques d\'Audit et Data Quality DSIF'
      }
    ]
  }
];
