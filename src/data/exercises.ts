import { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: 'exo-1-cleaning-multidevise',
    title: 'Nettoyage & Harmonisation d\'un Fichier de Déclarations Multidevises',
    category: 'Traitement & Qualité des Données',
    difficulty: 'Fondamental',
    estimatedTimeMin: 20,
    tags: ['Data Cleaning', 'SQL', 'Python Pandas', 'Conversions CDF/USD', 'DSIF'],
    department: 'DSIF (Surveillance Bancaire)',
    context: 'Dans le cadre de la surveillance prudentielle mensuelle, la Direction de la Surveillance des Intermédiaires Financiers (DSIF) reçoit les déclarations d\'encours de crédit des banques de Kinshasa et Lubumbashi. Certaines lignes sont libellées en Francs Congolais (CDF) et d\'autres en Dollars Américains (USD). De plus, certaines banques ont transmis des montants négatifs erronés et des libellés incohérents.',
    objective: 'Harmoniser l\'ensemble des encours bruts et des provisions en équivalent USD (en utilisant le taux indicatif officiel de la BCC de 2 850 CDF pour 1 USD), exclure les lignes invalides (crédit <= 0) et calculer l\'encours net de crédit par banque.',
    datasetName: 'raw_declarations_credits_banques.csv',
    datasetDescription: 'Fichier brut contenant les déclarations transmises à la DSIF pour le mois de clôture.',
    sampleData: [
      { id: 1, banque: 'Rawbank SA', devise: 'USD', credit_brut: 125000000, provisions: 6250000, statut: 'ACTIF' },
      { id: 2, banque: 'Rawbank SA', devise: 'CDF', credit_brut: 142500000000, provisions: 7125000000, statut: 'ACTIF' },
      { id: 3, banque: 'Equity BCDC', devise: 'USD', credit_brut: 98000000, provisions: 4900000, statut: 'ACTIF' },
      { id: 4, banque: 'Equity BCDC', devise: 'CDF', credit_brut: 85500000000, provisions: 4275000000, statut: 'ACTIF' },
      { id: 5, banque: 'Trust Merchant Bank', devise: 'USD', credit_brut: -450000, provisions: 0, statut: 'ERREUR_SAISIE' },
      { id: 6, banque: 'Trust Merchant Bank', devise: 'USD', credit_brut: 64000000, provisions: 3200000, statut: 'ACTIF' },
      { id: 7, banque: 'Trust Merchant Bank', devise: 'CDF', credit_brut: 57000000000, provisions: 2850000000, statut: 'ACTIF' },
      { id: 8, banque: 'Sofibanque SA', devise: 'USD', credit_brut: 42000000, provisions: 2100000, statut: 'ACTIF' },
      { id: 9, banque: 'Sofibanque SA', devise: 'CDF', credit_brut: 28500000000, provisions: 1425000000, statut: 'ACTIF' },
      { id: 10, banque: 'Afriland First Bank', devise: 'USD', credit_brut: 25000000, provisions: 2500000, statut: 'ACTIF' }
    ],
    columns: [
      { key: 'banque', label: 'Établissement Bancaire', type: 'string' },
      { key: 'devise', label: 'Devise Déclarée', type: 'string' },
      { key: 'credit_brut', label: 'Crédit Brut Déclaré', type: 'number' },
      { key: 'provisions', label: 'Provisions Déclarées', type: 'number' },
      { key: 'statut', label: 'Statut Ligne', type: 'string' }
    ],
    initialCodeSQL: `-- Requête SQL pour harmoniser en USD et calculer l'encours net par banque
-- Taux indicatif officiel BCC = 2850.0 CDF / 1 USD
-- Exclure les crédits négatifs ou statut != 'ACTIF'

SELECT 
    banque,
    -- À compléter : Somme des crédits bruts convertis en USD
    -- À compléter : Somme des provisions converties en USD
    -- À compléter : Encours Net = Crédit Brut USD - Provisions USD
FROM raw_declarations_credits_banques
WHERE credit_brut > 0 AND statut = 'ACTIF'
GROUP BY banque
ORDER BY encours_net_usd DESC;`,
    initialCodePython: `# Script Pandas pour nettoyage et conversion multidevise
import pandas as pd

# df contient les déclarations brutes
# Taux officiel BCC
TAUX_CDF_USD = 2850.0

# 1. Filtrer les lignes valides (credit_brut > 0 et statut == 'ACTIF')
# 2. Créer les colonnes 'credit_brut_usd' et 'provisions_usd'
# 3. Calculer 'credit_net_usd' = credit_brut_usd - provisions_usd
# 4. Agréger par banque
`,
    solutionSQL: `SELECT 
    banque,
    ROUND(SUM(CASE 
        WHEN devise = 'CDF' THEN credit_brut / 2850.0 
        ELSE credit_brut 
    END), 2) AS credit_brut_usd,
    ROUND(SUM(CASE 
        WHEN devise = 'CDF' THEN provisions / 2850.0 
        ELSE provisions 
    END), 2) AS provisions_usd,
    ROUND(SUM(CASE 
        WHEN devise = 'CDF' THEN (credit_brut - provisions) / 2850.0 
        ELSE (credit_brut - provisions) 
    END), 2) AS encours_net_usd
FROM raw_declarations_credits_banques
WHERE credit_brut > 0 AND statut = 'ACTIF'
GROUP BY banque
ORDER BY encours_net_usd DESC;`,
    solutionPython: `import pandas as pd

# Filtrage des lignes valides
df_clean = df[(df['credit_brut'] > 0) & (df['statut'] == 'ACTIF')].copy()

# Conversion en USD (taux pivot 2850 CDF/USD)
df_clean['credit_brut_usd'] = df_clean.apply(
    lambda r: r['credit_brut'] / 2850.0 if r['devise'] == 'CDF' else r['credit_brut'], 
    axis=1
)
df_clean['provisions_usd'] = df_clean.apply(
    lambda r: r['provisions'] / 2850.0 if r['devise'] == 'CDF' else r['provisions'], 
    axis=1
)
df_clean['credit_net_usd'] = df_clean['credit_brut_usd'] - df_clean['provisions_usd']

# Synthèse par banque
resultat = df_clean.groupby('banque').agg({
    'credit_brut_usd': 'sum',
    'provisions_usd': 'sum',
    'credit_net_usd': 'sum'
}).round(2).sort_values(by='credit_net_usd', ascending=False)
print(resultat)`,
    solutionExplanation: 'La clause CASE WHEN (ou .apply() en pandas) permet de convertir spécifiquement les montants libellés en CDF en les divisant par 2 850, tout en conservant intacts les montants libellés en USD. Le filtrage WHERE préalable élimine les erreurs de saisie (crédit négatif de -450 000 USD).',
    hints: [
      'Pensez à diviser par 2 850 uniquement si devise = "CDF".',
      'Le crédit net est égal au crédit brut moins les provisions déductibles.',
      'N\'oubliez pas de filtrer les lignes avec crédit_brut <= 0.'
    ],
    bccContextNotes: 'À la BCC, les banques déclarent sous le système de reporting automatisé. En raison de la double circulation monétaire, chaque reporting prudentiel doit impérativement être converti au cours indicatif de clôture avant consolidation nationale.',
    expectedResultMetric: {
      label: 'Encours Net Total Rawbank SA (USD)',
      value: '166 250 000 USD',
      explanation: 'USD : 125M - 6.25M = 118.75M. CDF : 142.5 Mds / 2850 = 50M brut, 7.125 Mds / 2850 = 2.5M prov, soit 47.5M net. Total = 118.75 + 47.5 = 166.25M USD.'
    }
  },
  {
    id: 'exo-2-ratios-npl-dsif',
    title: 'Audit Prudentiel : Calcul des Ratios NPL et Couverture des Pertes',
    category: 'Ratios Prudentiels & Risque',
    difficulty: 'Intermédiaire',
    estimatedTimeMin: 25,
    tags: ['NPL Ratio', 'Surveillance Prudentielle', 'Instruction 15 BCC', 'SQL', 'Python'],
    department: 'DSIF (Surveillance Bancaire)',
    context: 'En application de l\'Instruction n° 15 de la BCC, la DSIF évalue la qualité des actifs bancaires de la place. Le Taux de créances en souffrance (Non-Performing Loans - NPL) mesure la proportion des créances douteuses et compromises par rapport à l\'ensemble du portefeuille de crédit brut. Le seuil de vigilance prudentielle fixé par la BCC est de 5,0%. Toute banque dépassant 5% fait l\'objet d\'un suivi renforcé.',
    objective: 'Pour chaque banque de la place, calculer : 1. Le ratio NPL (%) = (Créances en souffrance / Crédits bruts) * 100, 2. Le taux de couverture des NPL (%) = (Provisions / Créances en souffrance) * 100, et 3. Un indicateur binaire de conformité (CONFORME si NPL <= 5.0%, ALERTE_DSIF si NPL > 5.0%).',
    datasetName: 'dsif_portefeuille_credits_banques.csv',
    datasetDescription: 'Données consolidées de surveillance pour les principaux établissements de crédit de la RDC.',
    sampleData: [
      { code: 'BK01', banque: 'Rawbank SA', credits_bruts_m: 2150.0, creances_souffrance_m: 86.0, provisions_m: 77.4, fonds_propres_m: 420.0 },
      { code: 'BK02', banque: 'Equity BCDC', credits_bruts_m: 1920.0, creances_souffrance_m: 92.1, provisions_m: 81.0, fonds_propres_m: 395.0 },
      { code: 'BK03', banque: 'Trust Merchant Bank (TMB)', credits_bruts_m: 880.0, creances_souffrance_m: 48.4, provisions_m: 42.1, fonds_propres_m: 215.0 },
      { code: 'BK04', banque: 'Sofibanque SA', credits_bruts_m: 620.0, creances_souffrance_m: 31.0, provisions_m: 26.5, fonds_propres_m: 135.0 },
      { code: 'BK05', banque: 'Ecobank RDC', credits_bruts_m: 410.0, creances_souffrance_m: 24.6, provisions_m: 20.8, fonds_propres_m: 92.0 },
      { code: 'BK06', banque: 'Standard Bank RDC', credits_bruts_m: 360.0, creances_souffrance_m: 14.4, provisions_m: 13.2, fonds_propres_m: 88.0 },
      { code: 'BK07', banque: 'FBNBank RDC', credits_bruts_m: 290.0, creances_souffrance_m: 18.8, provisions_m: 15.1, fonds_propres_m: 68.0 },
      { code: 'BK08', banque: 'Afriland First Bank CD', credits_bruts_m: 210.0, creances_souffrance_m: 19.5, provisions_m: 14.2, fonds_propres_m: 45.0 }
    ],
    columns: [
      { key: 'banque', label: 'Banque Commerciale', type: 'string' },
      { key: 'credits_bruts_m', label: 'Crédits Bruts (M USD)', type: 'number' },
      { key: 'creances_souffrance_m', label: 'Créances Souffrance (M USD)', type: 'number' },
      { key: 'provisions_m', label: 'Provisions (M USD)', type: 'number' },
      { key: 'fonds_propres_m', label: 'Fonds Propres (M USD)', type: 'number' }
    ],
    initialCodeSQL: `-- Requête SQL pour auditer le risque de crédit bancaire
SELECT 
    banque,
    credits_bruts_m,
    creances_souffrance_m,
    -- À compléter : ratio_npl_pct = (creances_souffrance_m / credits_bruts_m) * 100
    -- À compléter : taux_couverture_pct = (provisions_m / creances_souffrance_m) * 100
    -- À compléter : statut_vigilance = CASE WHEN ratio_npl_pct > 5.0 THEN 'ALERTE_DSIF' ELSE 'CONFORME' END
FROM dsif_portefeuille_credits_banques
ORDER BY ratio_npl_pct DESC;`,
    initialCodePython: `# Calcul du NPL et taux de couverture
import pandas as pd

# df contient les données prudentielles
# Calcul des ratios
df['ratio_npl_pct'] = (df['creances_souffrance_m'] / df['credits_bruts_m'] * 100).round(2)
df['taux_couverture_pct'] = (df['provisions_m'] / df['creances_souffrance_m'] * 100).round(2)
df['statut_vigilance'] = df['ratio_npl_pct'].apply(lambda x: 'ALERTE_DSIF' if x > 5.0 else 'CONFORME')

# Affichage des banques sous alerte DSIF
alertes = df[df['statut_vigilance'] == 'ALERTE_DSIF'][['banque', 'ratio_npl_pct', 'taux_couverture_pct']]
print(alertes)
`,
    solutionSQL: `SELECT 
    banque,
    credits_bruts_m,
    creances_souffrance_m,
    ROUND((creances_souffrance_m / credits_bruts_m) * 100, 2) AS ratio_npl_pct,
    ROUND((provisions_m / creances_souffrance_m) * 100, 2) AS taux_couverture_pct,
    CASE 
        WHEN ((creances_souffrance_m / credits_bruts_m) * 100) > 5.0 THEN 'ALERTE_DSIF' 
        ELSE 'CONFORME' 
    END AS statut_vigilance
FROM dsif_portefeuille_credits_banques
ORDER BY ratio_npl_pct DESC;`,
    solutionPython: `import pandas as pd

# Calcul des ratios prudentiels
df['ratio_npl_pct'] = ((df['creances_souffrance_m'] / df['credits_bruts_m']) * 100).round(2)
df['taux_couverture_pct'] = ((df['provisions_m'] / df['creances_souffrance_m']) * 100).round(2)
df['statut_vigilance'] = df['ratio_npl_pct'].apply(
    lambda x: 'ALERTE_DSIF' if x > 5.0 else 'CONFORME'
)

# Tri par ratio NPL décroissant
resultat = df[['banque', 'credits_bruts_m', 'ratio_npl_pct', 'taux_couverture_pct', 'statut_vigilance']].sort_values(
    by='ratio_npl_pct', 
    ascending=False
)
print(resultat)`,
    solutionExplanation: 'Quatre banques présentent un NPL > 5,0% (Afriland à 9,29%, FBNBank à 6,48%, Ecobank à 6,00% et TMB à 5,50%). Rawbank (4,00%), Equity BCDC (4,80%), Standard Bank (4,00%) et Sofibanque (5,00%) respectent la limite prudentielle de vigilance.',
    hints: [
      'Multipliez le quotient par 100 pour obtenir des pourcentages.',
      'Pour le statut, comparez strictement avec la valeur 5.0.',
      'La fonction ROUND(..., 2) permet de formater avec 2 décimales.'
    ],
    bccContextNotes: 'L\'Instruction 15 de la BCC fait obligation aux banques dont le NPL dépasse 5% de soumettre un plan de redressement du portefeuille de crédit approuvé par le Conseil d\'Administration sous 60 jours.',
    expectedResultMetric: {
      label: 'Banque avec le plus fort taux NPL',
      value: 'Afriland First Bank (9,29%)',
      explanation: '19.5 M USD / 210.0 M USD = 9,29% de créances compromises et douteuses.'
    }
  },
  {
    id: 'exo-3-volatilite-taux-change',
    title: 'Séries Chronologiques : Analyse de la Dépréciation CDF/USD et Spread du Marché Parallèle',
    category: 'Séries Temporelles & Marché des Changes',
    difficulty: 'Intermédiaire',
    estimatedTimeMin: 30,
    tags: ['Time Series', 'Window Functions', 'LAG()', 'Spread de Change', 'DRE'],
    department: 'DRE (Recherche & Études)',
    context: 'Pour préparer le briefing hebdomadaire du Gouverneur et du Comité de Politique Monétaire (CPM), les analystes de la DRE surveillent deux signaux vitaux : la vitesse de dépréciation hebdomadaire du Franc Congolais au cours indicatif, et l\'écart (« spread ») entre le cours indicatif officiel et le cours du marché parallèle (marché de rue à Kinshasa). Un spread supérieur à 2,5% signale une tension spéculative aiguë et justifie une adjudication de devises par la BCC.',
    objective: 'Calculer pour chaque semaine : 1. Le spread en % = ((taux_parallele - taux_indicatif) / taux_indicatif) * 100, 2. La dépréciation hebdomadaire en % par rapport à la semaine précédente (via LAG en SQL ou .pct_change() en Pandas), 3. Identifier la date de survenue du premier dépassement du seuil d\'alerte de 2,5% de spread.',
    datasetName: 'bcc_taux_hebdo_usd_cdf.csv',
    datasetDescription: 'Série chronologique hebdomadaire des cotations de devises à Kinshasa.',
    sampleData: [
      { semaine_num: 1, date: '2024-10-04', taux_indicatif: 2845.2, taux_parallele: 2890.0 },
      { semaine_num: 2, date: '2024-10-11', taux_indicatif: 2847.8, taux_parallele: 2895.0 },
      { semaine_num: 3, date: '2024-10-18', taux_indicatif: 2851.4, taux_parallele: 2902.0 },
      { semaine_num: 4, date: '2024-10-25', taux_indicatif: 2853.1, taux_parallele: 2908.0 },
      { semaine_num: 5, date: '2024-11-01', taux_indicatif: 2856.7, taux_parallele: 2915.0 },
      { semaine_num: 6, date: '2024-11-08', taux_indicatif: 2858.9, taux_parallele: 2920.0 },
      { semaine_num: 7, date: '2024-11-15', taux_indicatif: 2862.0, taux_parallele: 2925.0 },
      { semaine_num: 8, date: '2024-11-22', taux_indicatif: 2865.4, taux_parallele: 2932.0 },
      { semaine_num: 9, date: '2024-11-29', date_txt: '2024-11-29', taux_indicatif: 2868.2, taux_parallele: 2938.0 },
      { semaine_num: 10, date: '2024-12-06', taux_indicatif: 2872.0, taux_parallele: 2945.0 },
      { semaine_num: 11, date: '2024-12-13', taux_indicatif: 2875.5, taux_parallele: 2950.0 },
      { semaine_num: 12, date: '2024-12-20', taux_indicatif: 2880.1, taux_parallele: 2960.0 }
    ],
    columns: [
      { key: 'date', label: 'Date Clôture Hebdo', type: 'date' },
      { key: 'taux_indicatif', label: 'Taux Indicatif BCC (CDF/USD)', type: 'number' },
      { key: 'taux_parallele', label: 'Taux Marché Parallèle (CDF/USD)', type: 'number' }
    ],
    initialCodeSQL: `-- Requête SQL avec Window Function LAG()
SELECT 
    date,
    taux_indicatif,
    taux_parallele,
    -- 1. Calcul du spread en pourcentage
    -- 2. Taux indicatif de la semaine précédente via LAG()
    -- 3. Dépréciation hebdomadaire en % : ((taux_indicatif - lag_taux) / lag_taux) * 100
FROM bcc_taux_hebdo_usd_cdf
ORDER BY date ASC;`,
    initialCodePython: `# Séries chronologiques financières avec Pandas
import pandas as pd

# df['date'] est ordonné chronologiquement
# 1. Calculer le spread
df['spread_pct'] = ((df['taux_parallele'] - df['taux_indicatif']) / df['taux_indicatif'] * 100).round(2)

# 2. Dépréciation hebdomadaire du taux indicatif via .pct_change()
df['depreciation_hebdo_pct'] = (df['taux_indicatif'].pct_change() * 100).round(3)

# 3. Alerte d'intervention BCC si spread > 2.5%
df['alerte_bcc'] = df['spread_pct'] > 2.5
print(df[['date', 'spread_pct', 'depreciation_hebdo_pct', 'alerte_bcc']])
`,
    solutionSQL: `SELECT 
    date,
    taux_indicatif,
    taux_parallele,
    ROUND(((taux_parallele - taux_indicatif) / taux_indicatif) * 100, 2) AS spread_pct,
    ROUND(
        ((taux_indicatif - LAG(taux_indicatif, 1) OVER (ORDER BY date ASC)) 
        / LAG(taux_indicatif, 1) OVER (ORDER BY date ASC)) * 100, 
        3
    ) AS depreciation_hebdo_pct,
    CASE 
        WHEN ((taux_parallele - taux_indicatif) / taux_indicatif) * 100 > 2.5 THEN 'TENSION_MARCHE' 
        ELSE 'STABLE' 
    END AS signal_intervention
FROM bcc_taux_hebdo_usd_cdf
ORDER BY date ASC;`,
    solutionPython: `import pandas as pd

# Calculs temporels
df['spread_pct'] = (((df['taux_parallele'] - df['taux_indicatif']) / df['taux_indicatif']) * 100).round(2)
df['depreciation_hebdo_pct'] = (df['taux_indicatif'].pct_change() * 100).round(3)
df['signal_intervention'] = df['spread_pct'].apply(lambda s: 'TENSION_MARCHE' if s > 2.5 else 'STABLE')

# Détection de la première tension
premiere_tension = df[df['signal_intervention'] == 'TENSION_MARCHE'].iloc[0]
print(f"Première alerte le {premiere_tension['date']} avec un spread de {premiere_tension['spread_pct']}%")
`,
    solutionExplanation: 'La fonction LAG(taux_indicatif, 1) OVER (ORDER BY date ASC) récupère la valeur de la semaine passée pour calculer la dépréciation pas à pas. Le spread franchit le cap des 2,5% le 2024-12-06 (2,54%), justifiant une réunion extraordinaire de suivi de liquidité.',
    hints: [
      'En SQL, LAG(col, 1) OVER (ORDER BY date ASC) renvoie la valeur de la ligne précédente.',
      'Pour la première semaine, la dépréciation sera NULL car il n\'y a pas de période antérieure.',
      'Formule du spread : (Parallèle - Indicatif) / Indicatif * 100.'
    ],
    bccContextNotes: 'Dans le « Condensé d\'informations statistiques », la DRE publie chaque semaine ce tableau de suivi. Si le spread dépasse 3%, cela déclenche l\'examen d\'une vente de devises par adjudication par la Direction des Opérations Bancaires et des Marchés (DOBM).',
    expectedResultMetric: {
      label: 'Date de Déclenchement de l\'Alerte Tension',
      value: '06 Décembre 2024 (Spread: 2,54%)',
      explanation: 'Spread = (2945 - 2872) / 2872 * 100 = 2,541% > 2,50%.'
    }
  },
  {
    id: 'exo-4-agregats-monetaires-m2',
    title: 'Agrégats Monétaires : Décomposition M1, M2, M3 et Multiplicateur Monétaire',
    category: 'Politique Monétaire & Agrégats',
    difficulty: 'Intermédiaire',
    estimatedTimeMin: 25,
    tags: ['Masse Monétaire', 'Agrégats M0-M3', 'Dollarisation', 'Multiplicateur Monétaire', 'DRE'],
    department: 'DRE (Recherche & Études)',
    context: 'L\'une des missions fondamentales de la Banque Centrale du Congo est la régulation de la masse monétaire. À partir du bilan consolidé de la Banque Centrale et des situations comptables des banques commerciales, l\'analyste doit reconstituer les agrégats de monnaie : Base monétaire (M0), M1, M2 et M3, et calculer l\'intensité de la dollarisation de l\'économie congolaise.',
    objective: 'Calculer : 1. La masse monétaire M1 = Monnaie fiduciaire hors banques + Dépôts à vue CDF, 2. La masse monétaire M2 = M1 + Dépôts à terme CDF, 3. La masse monétaire M3 = M2 + Dépôts en devises étrangères (exprimés en CDF), 4. Le taux de dollarisation des dépôts = (Dépôts Devises / Total Dépôts) * 100, et 5. Le multiplicateur monétaire k = M2 / M0.',
    datasetName: 'bcc_composantes_situation_monetaire.csv',
    datasetDescription: 'Composantes de la masse monétaire en milliards de Francs Congolais (Mrd CDF).',
    sampleData: [
      { trimestre: '2024-T1', base_monetaire_m0: 6240.0, billets_hors_banques: 4120.0, depots_vue_cdf: 2850.0, depots_terme_cdf: 650.0, depots_devises_cdf_eq: 24650.0 },
      { trimestre: '2024-T2', base_monetaire_m0: 6480.0, billets_hors_banques: 4290.0, depots_vue_cdf: 2980.0, depots_terme_cdf: 710.0, depots_devises_cdf_eq: 25890.0 },
      { trimestre: '2024-T3', base_monetaire_m0: 6710.0, billets_hors_banques: 4410.0, depots_vue_cdf: 3120.0, depots_terme_cdf: 760.0, depots_devises_cdf_eq: 27150.0 },
      { trimestre: '2024-T4', base_monetaire_m0: 7020.0, billets_hors_banques: 4650.0, depots_vue_cdf: 3340.0, depots_terme_cdf: 820.0, depots_devises_cdf_eq: 28920.0 }
    ],
    columns: [
      { key: 'trimestre', label: 'Trimestre', type: 'string' },
      { key: 'base_monetaire_m0', label: 'Base Monétaire M0 (Mrd CDF)', type: 'number' },
      { key: 'billets_hors_banques', label: 'Monnaie Fiduciaire (Mrd CDF)', type: 'number' },
      { key: 'depots_vue_cdf', label: 'Dépôts à Vue CDF (Mrd CDF)', type: 'number' },
      { key: 'depots_terme_cdf', label: 'Quasi-Monnaie CDF (Mrd CDF)', type: 'number' },
      { key: 'depots_devises_cdf_eq', label: 'Dépôts Devises Éq CDF (Mrd CDF)', type: 'number' }
    ],
    initialCodeSQL: `-- Calcul des agrégats monétaires et ratios structurels
SELECT 
    trimestre,
    -- À compléter : m1_mrd = billets_hors_banques + depots_vue_cdf
    -- À compléter : m2_mrd = m1 + depots_terme_cdf
    -- À compléter : m3_mrd = m2 + depots_devises_cdf_eq
    -- À compléter : taux_dollarisation_depots_pct = depots_devises / total_depots * 100
    -- À compléter : multiplicateur_k = m2 / base_monetaire_m0
FROM bcc_composantes_situation_monetaire;`,
    initialCodePython: `# Calcul des agrégats monétaires avec Pandas
import pandas as pd

# df contient les composantes monétaires (en Mrd CDF) :
# base_monetaire_m0, billets_hors_banques, depots_vue_cdf,
# depots_terme_cdf, depots_devises_cdf_eq

# 1. M1 = billets hors banques + dépôts à vue
# 2. M2 = M1 + dépôts à terme
# 3. M3 = M2 + dépôts en devises (équivalent CDF)
# 4. taux_dollarisation_pct = dépôts en devises / total des dépôts * 100 (2 décimales)
# 5. multiplicateur_k = M2 / base monétaire M0 (2 décimales)
# 6. Affichez : trimestre, m1_mrd, m2_mrd, m3_mrd, taux_dollarisation_pct, multiplicateur_k
`,
    solutionSQL: `SELECT 
    trimestre,
    (billets_hors_banques + depots_vue_cdf) AS m1_mrd,
    (billets_hors_banques + depots_vue_cdf + depots_terme_cdf) AS m2_mrd,
    (billets_hors_banques + depots_vue_cdf + depots_terme_cdf + depots_devises_cdf_eq) AS m3_mrd,
    ROUND(
        (depots_devises_cdf_eq / (depots_vue_cdf + depots_terme_cdf + depots_devises_cdf_eq)) * 100, 
        2
    ) AS taux_dollarisation_pct,
    ROUND(
        CAST(billets_hors_banques + depots_vue_cdf + depots_terme_cdf AS REAL) / base_monetaire_m0, 
        2
    ) AS multiplicateur_k
FROM bcc_composantes_situation_monetaire
ORDER BY trimestre ASC;`,
    solutionPython: `import pandas as pd

# Calcul des agrégats
df['m1_mrd'] = df['billets_hors_banques'] + df['depots_vue_cdf']
df['m2_mrd'] = df['m1_mrd'] + df['depots_terme_cdf']
df['m3_mrd'] = df['m2_mrd'] + df['depots_devises_cdf_eq']

# Calcul du taux de dollarisation des dépôts
total_depots = df['depots_vue_cdf'] + df['depots_terme_cdf'] + df['depots_devises_cdf_eq']
df['taux_dollarisation_pct'] = ((df['depots_devises_cdf_eq'] / total_depots) * 100).round(2)

# Multiplicateur monétaire k = M2 / M0
df['multiplicateur_k'] = (df['m2_mrd'] / df['base_monetaire_m0']).round(2)

print(df[['trimestre', 'm1_mrd', 'm2_mrd', 'm3_mrd', 'taux_dollarisation_pct', 'multiplicateur_k']])`,
    solutionExplanation: 'En 2024-T4 : M1 = 7 990 Mrd CDF, M2 = 8 810 Mrd CDF, M3 = 37 730 Mrd CDF. Les dépôts en devises (28 920 Mrd) représentent 87,43% de l\'ensemble des dépôts du système bancaire (33 080 Mrd). Le multiplicateur monétaire k (M2/M0) ressort à 1,25, reflétant la faible intermédiation en monnaie nationale.',
    hints: [
      'Le total des dépôts est égal à : dépôts à vue CDF + dépôts à terme CDF + dépôts en devises.',
      'Attention : M3 englobe l\'ensemble de M2 augmenté des dépôts en devises.',
      'Le multiplicateur k compare M2 à la monnaie centrale M0.'
    ],
    bccContextNotes: 'En RDC, la coexistence de M2 (qui mesure l\'offre de Francs Congolais) et de M3 (qui intègre l\'épargne en USD) est cruciale : la BCC ne pilote directement que la composante en Francs Congolais via ses instruments de refinancement.',
    expectedResultMetric: {
      label: 'Taux de Dollarisation 2024-T4',
      value: '87,43 %',
      explanation: 'Dépôts devises (28 920 Mrd) / Dépôts totaux (3 340 + 820 + 28 920 = 33 080 Mrd) * 100 = 87,43%.'
    }
  },
  {
    id: 'exo-5-adjudication-bons-bcc',
    title: 'Adjudication des Bons BCC : Dépouillement des Soumissions & Taux Moyen Pondéré (TMP)',
    category: 'Politique Monétaire & Agrégats',
    difficulty: 'Avancé',
    estimatedTimeMin: 35,
    tags: ['Bons BCC', 'Open Market', 'Attribution au Prix Demandé', 'TMP', 'DOM'],
    department: 'DOM (Opérations Monétaires)',
    context: 'Chaque mardi, la BCC organise une séance d\'adjudication des Bons BCC (B-BCC) à 28 jours pour ponctionner 250 milliards de CDF de liquidité bancaire oisive. Les banques transmettent leurs soumissions en précisant le montant sollicité et le taux de rendement exigé. La BCC classe les offres par taux croissant (technique d\'adjudication à taux multiple ou prix demandé / « American auction »), sert les offres jusqu\'à épuisement du volume ciblé, et calcule le Taux Moyen Pondéré (TMP) de la séance.',
    objective: '1. Classer les offres de la moins chère à la plus chère (taux croissant), 2. Calculer le montant alloué cumulé jusqu\'au plafond de 250 milliards CDF, 3. Pour la dernière banque retenue (taux marginal), allouer le reliquat si nécessaire, 4. Calculer le Taux Moyen Pondéré (TMP) effectif des Bons BCC émis.',
    datasetName: 'bcc_soumissions_appel_offres_bbcc.csv',
    datasetDescription: 'Soumissions reçues des établissements bancaires pour les Bons BCC 28 jours.',
    sampleData: [
      { id: 1, banque: 'Trust Merchant Bank (TMB)', montant_demande_mrd: 60.0, taux_soumis_pct: 18.5 },
      { id: 2, banque: 'Rawbank SA', montant_demande_mrd: 80.0, taux_soumis_pct: 19.0 },
      { id: 3, banque: 'Equity BCDC', montant_demande_mrd: 70.0, taux_soumis_pct: 19.5 },
      { id: 4, banque: 'Standard Bank RDC', montant_demande_mrd: 40.0, taux_soumis_pct: 20.0 },
      { id: 5, banque: 'Sofibanque SA', montant_demande_mrd: 30.0, taux_soumis_pct: 20.5 },
      { id: 6, banque: 'Ecobank RDC', montant_demande_mrd: 25.0, taux_soumis_pct: 21.0 },
      { id: 7, banque: 'FBNBank RDC', montant_demande_mrd: 20.0, taux_soumis_pct: 22.0 },
      { id: 8, banque: 'Afriland First Bank', montant_demande_mrd: 15.0, taux_soumis_pct: 23.5 }
    ],
    columns: [
      { key: 'banque', label: 'Banque Soumissionnaire', type: 'string' },
      { key: 'montant_demande_mrd', label: 'Montant Demandé (Mrd CDF)', type: 'number' },
      { key: 'taux_soumis_pct', label: 'Taux Soumis (%)', type: 'number' }
    ],
    initialCodeSQL: `-- Simulation d'adjudication à l'aide de sommes cumulées (SUM() OVER)
WITH soumissions_triees AS (
    SELECT 
        banque,
        montant_demande_mrd,
        taux_soumis_pct,
        SUM(montant_demande_mrd) OVER (ORDER BY taux_soumis_pct ASC) AS montant_cumule_demande
    FROM bcc_soumissions_appel_offres_bbcc
)
SELECT 
    banque,
    montant_demande_mrd,
    taux_soumis_pct,
    montant_cumule_demande,
    -- À compléter : montant_alloue_mrd (Plafond total = 250 Mrd CDF)
FROM soumissions_triees;`,
    initialCodePython: `# Dépouillement des Bons BCC avec Pandas / Python
import pandas as pd

# Plafond ciblé par la BCC
VOLUME_CIBLE_MRD = 250.0

df_sorted = df.sort_values(by='taux_soumis_pct').copy()
df_sorted['cumul_demande'] = df_sorted['montant_demande_mrd'].cumsum()

# Attribution des montants
montants_alloues = []
reliquat = VOLUME_CIBLE_MRD

for idx, row in df_sorted.iterrows():
    if reliquat <= 0:
        montants_alloues.append(0.0)
    elif row['montant_demande_mrd'] <= reliquat:
        montants_alloues.append(row['montant_demande_mrd'])
        reliquat -= row['montant_demande_mrd']
    else:
        montants_alloues.append(reliquat)
        reliquat = 0.0

df_sorted['montant_alloue_mrd'] = montants_alloues

# Calcul du Taux Moyen Pondéré (TMP)
tmp = (df_sorted['montant_alloue_mrd'] * df_sorted['taux_soumis_pct']).sum() / df_sorted['montant_alloue_mrd'].sum()
print(f"TMP Séance : {tmp:.3f}%")
print(df_sorted[['banque', 'taux_soumis_pct', 'montant_demande_mrd', 'montant_alloue_mrd']])
`,
    solutionSQL: `WITH soumissions_triees AS (
    SELECT 
        banque,
        montant_demande_mrd,
        taux_soumis_pct,
        SUM(montant_demande_mrd) OVER (ORDER BY taux_soumis_pct ASC) AS cumul_fin,
        COALESCE(SUM(montant_demande_mrd) OVER (ORDER BY taux_soumis_pct ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS cumul_debut
    FROM bcc_soumissions_appel_offres_bbcc
)
SELECT 
    banque,
    taux_soumis_pct,
    montant_demande_mrd,
    CASE 
        WHEN cumul_fin <= 250.0 THEN montant_demande_mrd
        WHEN cumul_debut < 250.0 THEN (250.0 - cumul_debut)
        ELSE 0.0 
    END AS montant_alloue_mrd
FROM soumissions_triees
ORDER BY taux_soumis_pct ASC;`,
    solutionPython: `import pandas as pd

VOLUME_CIBLE = 250.0
df_s = df.sort_values(by='taux_soumis_pct').copy()

# Algorithme d'adjudication au taux demandé
alloue = []
reste = VOLUME_CIBLE

for _, r in df_s.iterrows():
    if reste <= 0:
        alloue.append(0.0)
    elif r['montant_demande_mrd'] <= reste:
        alloue.append(r['montant_demande_mrd'])
        reste -= r['montant_demande_mrd']
    else:
        alloue.append(reste)
        reste = 0.0

df_s['montant_alloue_mrd'] = alloue
total_alloue = df_s['montant_alloue_mrd'].sum()
tmp = (df_s['montant_alloue_mrd'] * df_s['taux_soumis_pct']).sum() / total_alloue

print(f"Volume adjugé: {total_alloue} Mrd CDF")
print(f"Taux Marginal: {df_s[df_s['montant_alloue_mrd'] > 0]['taux_soumis_pct'].max()}%")
print(f"Taux Moyen Pondéré (TMP): {tmp:.3f}%")
`,
    solutionExplanation: 'Les 4 premières banques sont servies : TMB (60 Mrd à 18,5%), Rawbank (80 Mrd à 19,0%), Equity BCDC (70 Mrd à 19,5%) et Standard Bank (40 Mrd demandé, servie à hauteur du solde restant : 250 - 210 = 40 Mrd ! Exactement 40 Mrd à 20,0%). Total adjugé = 250 Mrd. Le Taux Marginal est de 20,00% et le TMP ressort à (60*18.5 + 80*19.0 + 70*19.5 + 40*20.0) / 250 = (1110 + 1520 + 1365 + 800) / 250 = 4795 / 250 = 19,180%.',
    hints: [
      'Triez d\'abord par taux soumis croissant : les banques offrant le taux le plus bas sont servies en premier.',
      'Le montant cumulé servi ne peut pas dépasser 250 Mrd CDF.',
      'La formule du Taux Moyen Pondéré (TMP) est la somme de (montant_alloué * taux) divisée par le montant total alloué.'
    ],
    bccContextNotes: 'Le Taux Moyen Pondéré des Bons BCC est publié chaque semaine par la BCC dans son communiqué d\'adjudication. Il sert de baromètre directeur pour le marché monétaire interbancaire.',
    expectedResultMetric: {
      label: 'Taux Moyen Pondéré (TMP) de l\'Adjudication',
      value: '19,180 %',
      explanation: 'Pondération exacte des 4 offres servies pour absorber 250 Mrd CDF de surliquidité.'
    }
  },
  {
    id: 'exo-6-stress-test-choc-minier',
    title: 'Stress-Testing Macroprudentiel : Choc des Cours Minier et Solvabilité Bancaire (CAR)',
    category: 'Stress-Testing & Modélisation',
    difficulty: 'Expert',
    estimatedTimeMin: 40,
    tags: ['Stress-Testing', 'Risque Systémique', 'Bâle II / CAR', 'Secteur Minier', 'DSIF'],
    department: 'DSIF (Surveillance Bancaire)',
    context: 'L\'économie congolaise dépend à plus de 70% des exportations minières du Katanga. La Direction de la Surveillance des Intermédiaires Financiers (DSIF) réalise un exercice de stress-test macroprudentiel : on simule une baisse de 35% du cours mondial du cuivre combinée à une récession du secteur minier. Ce choc entraîne : 1) une augmentation de 50% des créances douteuses dans le portefeuille minier nécessitant de nouvelles provisions prélevées sur les fonds propres, et 2) une majoration de 15% des actifs pondérés par le risque (RWA).',
    objective: 'Pour chaque banque exposée : 1. Calculer les nouvelles provisions requises (Pertes inattendues = 50% des créances douteuses actuelles), 2. Calculer les nouveaux fonds propres post-choc (Fonds Propres - Pertes inattendues), 3. Calculer les nouveaux RWA post-choc (RWA x 1.15), 4. Calculer le nouveau CAR (%) = (Fonds Propres post-choc / RWA post-choc) * 100, et 5. Identifier les banques qui chutent sous le plancher réglementaire de 10,0% imposé par la BCC.',
    datasetName: 'dsif_banques_exposition_miniere.csv',
    datasetDescription: 'Bilan et exposition des banques commerciales de la RDC avant le scénario de crise.',
    sampleData: [
      { code: 'BK01', banque: 'Rawbank SA', fonds_propres_init_m: 420.0, rwa_init_m: 2840.0, creances_douteuses_m: 86.0, part_credits_mines_pct: 42.0 },
      { code: 'BK02', banque: 'Equity BCDC', fonds_propres_init_m: 395.0, rwa_init_m: 2600.0, creances_douteuses_m: 92.0, part_credits_mines_pct: 38.0 },
      { code: 'BK03', banque: 'Trust Merchant Bank (TMB)', fonds_propres_init_m: 215.0, rwa_init_m: 1335.0, creances_douteuses_m: 48.0, part_credits_mines_pct: 35.0 },
      { code: 'BK04', banque: 'Standard Bank RDC', fonds_propres_init_m: 88.0, rwa_init_m: 533.0, creances_douteuses_m: 14.0, part_credits_mines_pct: 55.0 },
      { code: 'BK05', banque: 'Sofibanque SA', fonds_propres_init_m: 135.0, rwa_init_m: 971.0, creances_douteuses_m: 31.0, part_credits_mines_pct: 28.0 },
      { code: 'BK06', banque: 'Ecobank RDC', fonds_propres_init_m: 92.0, rwa_init_m: 718.0, creances_douteuses_m: 25.0, part_credits_mines_pct: 22.0 },
      { code: 'BK07', banque: 'FBNBank RDC', fonds_propres_init_m: 68.0, rwa_init_m: 596.0, creances_douteuses_m: 19.0, part_credits_mines_pct: 30.0 },
      { code: 'BK08', banque: 'Afriland First Bank CD', fonds_propres_init_m: 45.0, rwa_init_m: 459.0, creances_douteuses_m: 20.0, part_credits_mines_pct: 18.0 }
    ],
    columns: [
      { key: 'banque', label: 'Banque', type: 'string' },
      { key: 'fonds_propres_init_m', label: 'Fonds Propres Initiaux (M USD)', type: 'number' },
      { key: 'rwa_init_m', label: 'RWA Initiaux (M USD)', type: 'number' },
      { key: 'creances_douteuses_m', label: 'Créances Douteuses (M USD)', type: 'number' },
      { key: 'part_credits_mines_pct', label: 'Part Minier (%)', type: 'number' }
    ],
    initialCodeSQL: `-- Modélisation du Stress Test Macroprudentiel
SELECT 
    banque,
    fonds_propres_init_m,
    rwa_init_m,
    -- 1. Pertes inattendues = creances_douteuses_m * 0.50
    -- 2. Fonds propres post choc = fonds_propres_init_m - pertes_inattendues
    -- 3. RWA post choc = rwa_init_m * 1.15
    -- 4. CAR post-choc en %
    -- 5. Statut réglementaire : CASE WHEN car_post_choc >= 10.0 THEN 'RÉSISTANT' ELSE 'SOUS-CAPITALISÉ' END
FROM dsif_banques_exposition_miniere
ORDER BY car_post_choc ASC;`,
    initialCodePython: `# Stress-test macroprudentiel en Python
import pandas as pd

# Paramètres du choc macroéconomique minier
PERTE_ADDT_PCT = 0.50
EXPANSION_RWA_PCT = 1.15

df['pertes_inattendues'] = df['creances_douteuses_m'] * PERTE_ADDT_PCT
df['fonds_propres_stress'] = df['fonds_propres_init_m'] - df['pertes_inattendues']
df['rwa_stress'] = df['rwa_init_m'] * EXPANSION_RWA_PCT
df['car_stress_pct'] = ((df['fonds_propres_stress'] / df['rwa_stress']) * 100).round(2)
df['statut_stress'] = df['car_stress_pct'].apply(lambda c: 'RÉSISTANT' if c >= 10.0 else 'SOUS-CAPITALISÉ')

# Banques en situation de sous-capitalisation
banques_a_recapitaliser = df[df['statut_stress'] == 'SOUS-CAPITALISÉ']
print(banques_a_recapitaliser[['banque', 'car_stress_pct', 'statut_stress']])
`,
    solutionSQL: `SELECT 
    banque,
    ROUND((fonds_propres_init_m / rwa_init_m) * 100, 2) AS car_initial_pct,
    ROUND(
        ((fonds_propres_init_m - (creances_douteuses_m * 0.50)) 
        / (rwa_init_m * 1.15)) * 100, 
        2
    ) AS car_stress_pct,
    CASE 
        WHEN ((fonds_propres_init_m - (creances_douteuses_m * 0.50)) / (rwa_init_m * 1.15)) * 100 >= 10.0 
        THEN 'RÉSISTANT' 
        ELSE 'SOUS-CAPITALISÉ' 
    END AS statut_stress
FROM dsif_banques_exposition_miniere
ORDER BY car_stress_pct ASC;`,
    solutionPython: `import pandas as pd

# Calcul des grandeurs sous stress
df['car_initial_pct'] = ((df['fonds_propres_init_m'] / df['rwa_init_m']) * 100).round(2)
df['fonds_propres_stress'] = df['fonds_propres_init_m'] - (df['creances_douteuses_m'] * 0.50)
df['rwa_stress'] = df['rwa_init_m'] * 1.15
df['car_stress_pct'] = ((df['fonds_propres_stress'] / df['rwa_stress']) * 100).round(2)
df['statut_stress'] = df['car_stress_pct'].apply(lambda c: 'RÉSISTANT' if c >= 10.0 else 'SOUS-CAPITALISÉ')

resultat = df[['banque', 'car_initial_pct', 'car_stress_pct', 'statut_stress']].sort_values(by='car_stress_pct')
print(resultat)`,
    solutionExplanation: 'Sous le choc minier simulé : Afriland First Bank chute à 6,63% et FBNBank chute à 8,53% de CAR, passant toutes deux en dessous du seuil réglementaire impératif de 10,0% imposé par la BCC. Ecobank flirte avec la limite (9,63% - sous-capitalisée également). Ces banques devraient être convoquées par le Gouverneur pour une recapitalisation immédiate.',
    hints: [
      'Pensez à déduire les pertes inattendues des fonds propres avant de diviser par le RWA post-choc.',
      'Le nouveau RWA est égal à l\'ancien multiplié par 1,15.',
      'Le seuil de solvabilité légal de la BCC est de 10,0%.'
    ],
    bccContextNotes: 'Le stress-testing fait partie intégrante du rapport de stabilité financière publié semestriellement par la Banque Centrale du Congo pour tester la résilience des banques systémiques de la RDC.',
    expectedResultMetric: {
      label: 'Nombre de banques sous-capitalisées après choc',
      value: '3 établissements (Afriland, FBNBank, Ecobank)',
      explanation: 'Afriland (6,63%), FBNBank (8,53%), Ecobank (9,63%) violent la limite légale de 10% de solvabilité CAR.'
    }
  }
];
