import { ExamQuestion } from '../types';

export const mockExamQuestions: ExamQuestion[] = [
  // PARTIE 1 : RÉGLEMENTATION & MISSIONS BCC
  {
    id: 'exam-q1',
    section: 'Partie 1: Réglementation & Missions BCC',
    question: 'En vertu de la Loi Organique n° 18/027, quel est l\'objectif primordial de la Banque Centrale du Congo ?',
    options: [
      'L\'équilibre de la balance des transactions courantes',
      'La stabilité du niveau général des prix',
      'Le maintien d\'un taux d\'intérêt fixe pour les PME congolaises',
      'La maximisation du volume des réserves de change'
    ],
    correctIndex: 1,
    explanation: 'Aux termes de l\'article 3 de la loi n° 18/027, la mission principale est d\'assurer la stabilité du niveau général des prix.',
    points: 1
  },
  {
    id: 'exam-q2',
    section: 'Partie 1: Réglementation & Missions BCC',
    question: 'Quel organe au sein de la BCC est légalement habilité à fixer le taux directeur et le niveau des réserves obligatoires ?',
    options: [
      'Le Conseil Supérieur de la Magistrature',
      'Le Comité d\'Audit Interne',
      'Le Comité de Politique Monétaire (CPM)',
      'La Commission Économique et Financière du Sénat'
    ],
    correctIndex: 2,
    explanation: 'Le CPM (Comité de Politique Monétaire) réunit le Gouverneur, les Vice-Gouverneurs et les directeurs centraux pour décider des orientations de la politique monétaire.',
    points: 1
  },
  {
    id: 'exam-q3',
    section: 'Partie 1: Réglementation & Missions BCC',
    question: 'Quelle est la durée de maturité standard la plus courte des Bons BCC (B-BCC) émis pour réguler la liquidité interbancaire ?',
    options: [
      '24 heures (Overnight)',
      '7 jours',
      '30 jours',
      '90 jours'
    ],
    correctIndex: 1,
    explanation: 'Les Bons BCC sont émis aux échéances de 7 jours, 14 jours, 28 jours et 84 jours. 7 jours est la maturité minimale standard d\'intervention.',
    points: 1
  },
  {
    id: 'exam-q4',
    section: 'Partie 1: Réglementation & Missions BCC',
    question: 'Quel est le ratio de solvabilité prudentiel minimum (CAR) exigé par l\'Instruction n° 14 de la BCC aux banques commerciales en RDC ?',
    options: [
      '6,0 %',
      '8,0 %',
      '10,0 %',
      '15,0 %'
    ],
    correctIndex: 2,
    explanation: 'La BCC impose un ratio de solvabilité minimum de 10,0 % (fonds propres prudentiels / actifs pondérés par les risques), supérieur au seuil de 8 % de Bâle I.',
    points: 1
  },
  {
    id: 'exam-q5',
    section: 'Partie 1: Réglementation & Missions BCC',
    question: 'Selon la réglementation prudentielle congolaise (Instruction 21), l\'exposition maximale d\'une banque sur une seule contrepartie (grand risque) ne peut excéder :',
    options: [
      '10% des dépôts totaux',
      '25% des fonds propres prudentiels',
      '50% des crédits nets',
      '100% du capital social'
    ],
    correctIndex: 1,
    explanation: 'La norme prudentielle internationale et de la BCC limite la division des risques à un plafond strict de 25% des fonds propres prudentiels nets par groupe ou débiteur unique.',
    points: 1
  },
  {
    id: 'exam-q6',
    section: 'Partie 1: Réglementation & Missions BCC',
    question: 'En RDC, pourquoi la réserve obligatoire est-elle assise avec des coefficients différenciés sur les dépôts en Francs Congolais et les dépôts en devises ?',
    options: [
      'Pour interdire totalement les dépôts en devises',
      'Pour décourager la spéculation sur les devises et inciter les banques à collecter des ressources en monnaie nationale',
      'Parce que la loi interdit les réserves en monnaie nationale',
      'Pour aligner les taux sur ceux de la Réserve Fédérale américaine'
    ],
    correctIndex: 1,
    explanation: 'La différenciation des coefficients de réserve obligatoire est un instrument macroprudentiel visant à freiner la dollarisation des bilans bancaires et protéger la monnaie nationale.',
    points: 1
  },

  // PARTIE 2 : CALCULS FINANCIERS & RATIOS
  {
    id: 'exam-q7',
    section: 'Partie 2: Calculs Financiers & Ratios',
    contextSnippet: 'Une banque commerciale de Kinshasa déclare les éléments suivants (en millions USD) :\n- Crédits sains et à surveiller : 800 M$\n- Créances pré-douteuses : 30 M$\n- Créances douteuses : 25 M$\n- Créances compromises : 45 M$\n- Total Crédits Bruts : 900 M$',
    question: 'Quel est le ratio de créances en souffrance (NPL Ratio) de cette banque commerciale ?',
    options: [
      '7,78 %',
      '10,00 %',
      '11,11 %',
      '12,50 %'
    ],
    correctIndex: 2,
    explanation: 'Créances en souffrance (classes 3, 4 et 5) = 30 + 25 + 45 = 100 M USD. NPL Ratio = (100 / 900) * 100 = 11,11 %. Cette banque est largement au-dessus du seuil de vigilance BCC (5,0 %).',
    points: 2
  },
  {
    id: 'exam-q8',
    section: 'Partie 2: Calculs Financiers & Ratios',
    contextSnippet: 'Les réserves officielles de change de la BCC s\'établissent à 5 850 millions USD.\nLes importations prévisionnelles annuelles de biens et services sont estimées à 23 400 millions USD.',
    question: 'Combien de semaines d\'importations ces réserves de change permettent-elles de couvrir ?',
    options: [
      '10,5 semaines',
      '13,0 semaines',
      '15,2 semaines',
      '25,0 semaines'
    ],
    correctIndex: 1,
    explanation: 'Formule : (Réserves de change / Importations annuelles) x 52 semaines = (5 850 / 23 400) x 52 = 0,25 x 52 = 13,0 semaines.',
    points: 2
  },
  {
    id: 'exam-q9',
    section: 'Partie 2: Calculs Financiers & Ratios',
    contextSnippet: 'Une banque dispose de 180 M$ de fonds propres prudentiels.\nSes actifs pondérés par le risque (RWA) s\'élèvent à 1 500 M$.\nLa banque subit un choc de crédit entraînant 35 M$ de pertes additionnelles (déduites des fonds propres) et une augmentation de 10% de ses RWA.',
    question: 'Quel est le nouveau Capital Adequacy Ratio (CAR) de cette banque après le choc ?',
    options: [
      '8,79 % (En situation de sous-capitalisation < 10%)',
      '10,25 % (Conforme au seuil BCC)',
      '12,00 % (Conforme au seuil BCC)',
      '7,50 % (En situation de sous-capitalisation < 10%)'
    ],
    correctIndex: 0,
    explanation: 'Nouveaux fonds propres = 180 - 35 = 145 M$. Nouveaux RWA = 1 500 x 1,10 = 1 650 M$. Nouveau CAR = (145 / 1 650) x 100 = 8,787 % ~= 8,79 %. La banque chute sous le seuil impératif de 10%.',
    points: 2
  },
  {
    id: 'exam-q10',
    section: 'Partie 2: Calculs Financiers & Ratios',
    contextSnippet: 'Le cours indicatif officiel de la BCC est de 2 850 CDF/USD.\nLe cours sur le marché parallèle à Kinshasa est de 2 935,5 CDF/USD.',
    question: 'Quel est le spread (écart relatif) entre les deux marchés et que signale-t-il à la BCC ?',
    options: [
      'Spread de 1,50% - Marché calme sans intervention',
      'Spread de 3,00% - Forte tension justifiant une adjudication de devises',
      'Spread de 5,20% - Crise de liquidité immédiate',
      'Spread de 0,85% - Marché parfaitement unifié'
    ],
    correctIndex: 1,
    explanation: 'Spread = ((2 935,5 - 2 850) / 2 850) * 100 = (85,5 / 2 850) * 100 = 3,00 %. Un écart >= 2,5 - 3% déclenche un signal d\'alerte d\'intervention sur le marché des changes à la BCC.',
    points: 2
  },
  {
    id: 'exam-q11',
    section: 'Partie 2: Calculs Financiers & Ratios',
    contextSnippet: 'La situation monétaire consolidée présente les grandeurs suivantes :\n- Base monétaire (M0) = 6 000 milliards CDF\n- Monnaie fiduciaire hors banques = 3 800 milliards CDF\n- Dépôts à vue en CDF = 2 200 milliards CDF\n- Quasi-monnaie en CDF (dépôts à terme) = 800 milliards CDF',
    question: 'Quelle est la valeur de la masse monétaire M2 et du multiplicateur monétaire k = M2 / M0 ?',
    options: [
      'M2 = 6 000 Mrd CDF, k = 1,00',
      'M2 = 6 800 Mrd CDF, k = 1,13',
      'M2 = 7 500 Mrd CDF, k = 1,25',
      'M2 = 9 000 Mrd CDF, k = 1,50'
    ],
    correctIndex: 1,
    explanation: 'M1 = 3 800 + 2 200 = 6 000 Mrd CDF. M2 = M1 + 800 = 6 800 Mrd CDF. Multiplicateur k = M2 / M0 = 6 800 / 6 000 = 1,133 ~= 1,13.',
    points: 2
  },

  // PARTIE 3 : ANALYSE DE DONNÉES & SQL/PYTHON
  {
    id: 'exam-q12',
    section: 'Partie 3: Analyse de Données & SQL/Python',
    contextSnippet: `Une table "bilans_banques" contient les colonnes (code_banque, date_arrete, actif_total, passif_total, fonds_propres).
On veut écrire une requête SQL d'audit pour détecter toute déclaration où l'égalité bilantielle fondamentale est violée (écart > 0,01).`,
    question: 'Quelle clause WHERE en SQL réalise ce contrôle qualité ?',
    options: [
      'WHERE actif_total = fonds_propres',
      'WHERE ABS(actif_total - passif_total) > 0.01',
      'WHERE actif_total + passif_total > 0',
      'WHERE passif_total IS NOT NULL'
    ],
    correctIndex: 1,
    explanation: 'L\'égalité comptable fondamentale de tout bilan bancaire impose Actif Total = Passif Total. La clause ABS(actif_total - passif_total) > 0.01 filtre les déclarations déséquilibrées.',
    points: 2
  },
  {
    id: 'exam-q13',
    section: 'Partie 3: Analyse de Données & SQL/Python',
    contextSnippet: `En Python avec Pandas, on dispose d'un DataFrame df_cours avec un index de dates journalières "date" et la colonne "taux_indicatif".
On veut agréger ces cours journaliers pour obtenir le cours moyen hebdomadaire.`,
    question: 'Quelle est l\'instruction Pandas standard et idiomatique pour cette opération ?',
    options: [
      'df_cours.groupby("date").mean()',
      'df_cours["taux_indicatif"].resample("W").mean()',
      'df_cours.rolling(7).sum()',
      'df_cours.pivot_table("taux_indicatif", index="semaine")'
    ],
    correctIndex: 1,
    explanation: 'Pour les séries temporelles financières, .resample("W").mean() regroupe élégamment par fréquence hebdomadaire et calcule la moyenne.',
    points: 2
  },
  {
    id: 'exam-q14',
    section: 'Partie 3: Analyse de Données & SQL/Python',
    contextSnippet: `Dans une base de données de surveillance bancaire, on souhaite calculer pour chaque banque son rang selon le volume de crédits accordés, par trimestre :
SELECT code_banque, trimestre, credits_bruts,
       ______(credits_bruts) OVER (PARTITION BY trimestre ORDER BY credits_bruts DESC) AS rang
FROM reporting_bancaire;`,
    question: 'Quelle fonction de fenêtrage (Window Function) SQL doit remplacer les tirets ?',
    options: [
      'RANK() ou DENSE_RANK()',
      'AVG()',
      'FIRST_VALUE()',
      'LAG()'
    ],
    correctIndex: 0,
    explanation: 'RANK() ou DENSE_RANK() est la fonction analytique dédiée pour attribuer un classement ordonné au sein de chaque partition temporelle.',
    points: 2
  },
  {
    id: 'exam-q15',
    section: 'Partie 3: Analyse de Données & SQL/Python',
    question: 'Lors de l\'analyse du coefficient de pass-through de change vers l\'inflation par régression économétrique (OLS), pourquoi est-il impératif de tester la stationnarité des séries temporelles (test de Dickey-Fuller) au préalable ?',
    options: [
      'Pour convertir les Francs Congolais en Dollars',
      'Pour éviter le phénomène de régression fallacieuse (spurious regression) qui produit des R² artificiellement élevés entre séries non-stationnaires',
      'Parce que le logiciel Python refuse de tourner sans ce test',
      'Pour doubler automatiquement le nombre d\'observations'
    ],
    correctIndex: 1,
    explanation: 'Deux séries chronologiques intégrées d\'ordre 1 présentant une tendance temporelle (comme le cours de change et le niveau des prix) produiront une corrélation statistiquement significative erronée si elles ne sont pas différenciées ou cointégrées.',
    points: 2
  }
];
