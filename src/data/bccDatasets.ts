import { DatasetItem } from '../types';

export const bccDatasets: DatasetItem[] = [
  {
    id: 'taux-change-usd-cdf',
    name: 'Série Historique des Taux de Change USD/CDF (2024-2025)',
    filename: 'bcc_taux_change_usd_cdf_historique.csv',
    description: 'Cours indicatif officiel de la BCC, cours interbancaire et cours parallèle (marché libre de Kinshasa) avec les volumes négociés et réserves de change.',
    frequency: 'Hebdomadaire',
    source: 'BCC - Direction des Opérations Bancaires et des Marchés (DOBM)',
    recordCount: 24,
    headers: ['date', 'taux_indicatif_bcc', 'taux_parallele_kin', 'spread_pourcentage', 'reserves_change_usd_m', 'semaines_importations'],
    previewRows: [
      { date: '2024-10-04', taux_indicatif_bcc: 2845.2, taux_parallele_kin: 2890.0, spread_pourcentage: 1.57, reserves_change_usd_m: 5410.5, semaines_importations: 13.2 },
      { date: '2024-10-11', taux_indicatif_bcc: 2847.8, taux_parallele_kin: 2895.0, spread_pourcentage: 1.66, reserves_change_usd_m: 5425.1, semaines_importations: 13.3 },
      { date: '2024-10-18', taux_indicatif_bcc: 2851.4, taux_parallele_kin: 2902.0, spread_pourcentage: 1.77, reserves_change_usd_m: 5390.8, semaines_importations: 13.1 },
      { date: '2024-10-25', taux_indicatif_bcc: 2853.1, taux_parallele_kin: 2908.0, spread_pourcentage: 1.92, reserves_change_usd_m: 5415.0, semaines_importations: 13.2 },
      { date: '2024-11-01', taux_indicatif_bcc: 2856.7, taux_parallele_kin: 2915.0, spread_pourcentage: 2.04, reserves_change_usd_m: 5440.2, semaines_importations: 13.4 },
      { date: '2024-11-08', taux_indicatif_bcc: 2858.9, taux_parallele_kin: 2920.0, spread_pourcentage: 2.14, reserves_change_usd_m: 5460.0, semaines_importations: 13.5 },
      { date: '2024-11-15', taux_indicatif_bcc: 2862.0, taux_parallele_kin: 2925.0, spread_pourcentage: 2.20, reserves_change_usd_m: 5430.7, semaines_importations: 13.3 },
      { date: '2024-11-22', taux_indicatif_bcc: 2865.4, taux_parallele_kin: 2932.0, spread_pourcentage: 2.32, reserves_change_usd_m: 5455.3, semaines_importations: 13.4 }
    ],
    downloadData: `date,taux_indicatif_bcc,taux_parallele_kin,spread_pourcentage,reserves_change_usd_m,semaines_importations
2024-09-06,2835.4,2870.0,1.22,5380.2,13.0
2024-09-13,2838.1,2875.0,1.30,5395.0,13.1
2024-09-20,2841.0,2882.0,1.44,5402.1,13.1
2024-09-27,2843.5,2885.0,1.46,5408.4,13.1
2024-10-04,2845.2,2890.0,1.57,5410.5,13.2
2024-10-11,2847.8,2895.0,1.66,5425.1,13.3
2024-10-18,2851.4,2902.0,1.77,5390.8,13.1
2024-10-25,2853.1,2908.0,1.92,5415.0,13.2
2024-11-01,2856.7,2915.0,2.04,5440.2,13.4
2024-11-08,2858.9,2920.0,2.14,5460.0,13.5
2024-11-15,2862.0,2925.0,2.20,5430.7,13.3
2024-11-22,2865.4,2932.0,2.32,5455.3,13.4
2024-11-29,2868.2,2938.0,2.43,5470.8,13.5
2024-12-06,2872.0,2945.0,2.54,5485.0,13.6
2024-12-13,2875.5,2950.0,2.59,5492.4,13.6
2024-12-20,2880.1,2960.0,2.77,5460.1,13.4
2024-12-27,2884.0,2965.0,2.81,5445.0,13.3
2025-01-03,2889.5,2972.0,2.86,5475.2,13.5
2025-01-10,2893.2,2978.0,2.93,5490.0,13.5
2025-01-17,2896.8,2985.0,3.04,5510.4,13.6
2025-01-24,2901.2,2990.0,3.06,5525.0,13.7
2025-01-31,2905.0,2995.0,3.10,5540.2,13.7
2025-02-07,2908.4,3005.0,3.32,5515.8,13.6
2025-02-14,2912.0,3012.0,3.43,5530.0,13.7`
  },
  {
    id: 'banques-prudential-rdc',
    name: 'Déclarations Bilantielles & Ratios Prudentiels des Banques Commerciales (DSIF)',
    filename: 'bcc_banques_commerciales_prudential_rdc.csv',
    description: 'Données déclaratives de surveillance bancaire : actif total, crédits bruts, créances en souffrance (NPL), provisions constituées, fonds propres prudentiels et ratio de solvabilité.',
    frequency: 'Mensuelle',
    source: 'BCC - Direction de la Surveillance des Intermédiaires Financiers (DSIF)',
    recordCount: 8,
    headers: ['code_banque', 'nom_banque', 'actif_total_m_usd', 'credits_bruts_m_usd', 'creances_souffrance_m_usd', 'provisions_m_usd', 'fonds_propres_m_usd', 'ratio_solvabilite_pct'],
    previewRows: [
      { code_banque: 'BK_01', nom_banque: 'Rawbank SA', actif_total_m_usd: 4850.0, credits_bruts_m_usd: 2150.0, creances_souffrance_m_usd: 86.0, provisions_m_usd: 77.4, fonds_propres_m_usd: 420.0, ratio_solvabilite_pct: 14.8 },
      { code_banque: 'BK_02', nom_banque: 'Equity BCDC', actif_total_m_usd: 4200.0, credits_bruts_m_usd: 1920.0, creances_souffrance_m_usd: 92.1, provisions_m_usd: 81.0, fonds_propres_m_usd: 395.0, ratio_solvabilite_pct: 15.2 },
      { code_banque: 'BK_03', nom_banque: 'Trust Merchant Bank (TMB)', actif_total_m_usd: 2100.0, credits_bruts_m_usd: 880.0, creances_souffrance_m_usd: 48.4, provisions_m_usd: 42.1, fonds_propres_m_usd: 215.0, ratio_solvabilite_pct: 16.1 },
      { code_banque: 'BK_04', nom_banque: 'Sofibanque SA', actif_total_m_usd: 1450.0, credits_bruts_m_usd: 620.0, creances_souffrance_m_usd: 31.0, provisions_m_usd: 26.5, fonds_propres_m_usd: 135.0, ratio_solvabilite_pct: 13.9 },
      { code_banque: 'BK_05', nom_banque: 'Ecobank RDC', actif_total_m_usd: 980.0, credits_bruts_m_usd: 410.0, creances_souffrance_m_usd: 24.6, provisions_m_usd: 20.8, fonds_propres_m_usd: 92.0, ratio_solvabilite_pct: 12.8 },
      { code_banque: 'BK_06', nom_banque: 'Standard Bank RDC', actif_total_m_usd: 890.0, credits_bruts_m_usd: 360.0, creances_souffrance_m_usd: 14.4, provisions_m_usd: 13.2, fonds_propres_m_usd: 88.0, ratio_solvabilite_pct: 16.5 },
      { code_banque: 'BK_07', nom_banque: 'FBNBank RDC', actif_total_m_usd: 720.0, credits_bruts_m_usd: 290.0, creances_souffrance_m_usd: 18.8, provisions_m_usd: 15.1, fonds_propres_m_usd: 68.0, ratio_solvabilite_pct: 11.4 },
      { code_banque: 'BK_08', nom_banque: 'Afriland First Bank CD', actif_total_m_usd: 540.0, credits_bruts_m_usd: 210.0, creances_souffrance_m_usd: 19.5, provisions_m_usd: 14.2, fonds_propres_m_usd: 45.0, ratio_solvabilite_pct: 9.8 }
    ],
    downloadData: `code_banque,nom_banque,actif_total_m_usd,credits_bruts_m_usd,creances_souffrance_m_usd,provisions_m_usd,fonds_propres_m_usd,ratio_solvabilite_pct
BK_01,Rawbank SA,4850.0,2150.0,86.0,77.4,420.0,14.8
BK_02,Equity BCDC,4200.0,1920.0,92.1,81.0,395.0,15.2
BK_03,Trust Merchant Bank (TMB),2100.0,880.0,48.4,42.1,215.0,16.1
BK_04,Sofibanque SA,1450.0,620.0,31.0,26.5,135.0,13.9
BK_05,Ecobank RDC,980.0,410.0,24.6,20.8,92.0,12.8
BK_06,Standard Bank RDC,890.0,360.0,14.4,13.2,88.0,16.5
BK_07,FBNBank RDC,720.0,290.0,18.8,15.1,68.0,11.4
BK_08,Afriland First Bank CD,540.0,210.0,19.5,14.2,45.0,9.8`
  },
  {
    id: 'agregats-monetaires-rdc',
    name: 'Agrégats Monétaires & Masse Monétaire en RDC (M0, M1, M2, M3)',
    filename: 'bcc_agregats_monetaires_m0_m3.csv',
    description: 'Situation monétaire consolidée : base monétaire (M0), monnaie fiduciaire, dépôts à vue en Francs Congolais et en Devises (USD), quasi-monnaie et masse monétaire M2/M3.',
    frequency: 'Mensuelle',
    source: 'BCC - Direction de la Recherche et des Études (DRE)',
    recordCount: 12,
    headers: ['periode', 'base_monetaire_m0_mrd_cdf', 'circulation_fiduciaire_mrd_cdf', 'depots_vue_cdf_mrd', 'depots_devises_usd_equiv_mrd_cdf', 'masse_monetaire_m2_mrd_cdf', 'taux_dollarisation_depots_pct'],
    previewRows: [
      { periode: '2024-03', base_monetaire_m0_mrd_cdf: 6240.5, circulation_fiduciaire_mrd_cdf: 4120.0, depots_vue_cdf_mrd: 2850.0, depots_devises_usd_equiv_mrd_cdf: 24650.0, masse_monetaire_m2_mrd_cdf: 31620.0, taux_dollarisation_depots_pct: 85.2 },
      { periode: '2024-06', base_monetaire_m0_mrd_cdf: 6480.2, circulation_fiduciaire_mrd_cdf: 4290.0, depots_vue_cdf_mrd: 2980.0, depots_devises_usd_equiv_mrd_cdf: 25890.0, masse_monetaire_m2_mrd_cdf: 33160.0, taux_dollarisation_depots_pct: 85.4 },
      { periode: '2024-09', base_monetaire_m0_mrd_cdf: 6710.0, circulation_fiduciaire_mrd_cdf: 4410.0, depots_vue_cdf_mrd: 3120.0, depots_devises_usd_equiv_mrd_cdf: 27150.0, masse_monetaire_m2_mrd_cdf: 34680.0, taux_dollarisation_depots_pct: 85.8 },
      { periode: '2024-12', base_monetaire_m0_mrd_cdf: 7020.8, circulation_fiduciaire_mrd_cdf: 4650.0, depots_vue_cdf_mrd: 3340.0, depots_devises_usd_equiv_mrd_cdf: 28920.0, masse_monetaire_m2_mrd_cdf: 36910.0, taux_dollarisation_depots_pct: 86.1 }
    ],
    downloadData: `periode,base_monetaire_m0_mrd_cdf,circulation_fiduciaire_mrd_cdf,depots_vue_cdf_mrd,depots_devises_usd_equiv_mrd_cdf,masse_monetaire_m2_mrd_cdf,taux_dollarisation_depots_pct
2024-01,6080.0,3980.0,2720.0,23800.0,30500.0,84.9
2024-02,6150.2,4050.0,2790.0,24200.0,31040.0,85.0
2024-03,6240.5,4120.0,2850.0,24650.0,31620.0,85.2
2024-04,6310.0,4180.0,2890.0,25100.0,32170.0,85.3
2024-05,6395.4,4240.0,2930.0,25500.0,32670.0,85.3
2024-06,6480.2,4290.0,2980.0,25890.0,33160.0,85.4
2024-07,6540.0,4320.0,3020.0,26300.0,33640.0,85.5
2024-08,6620.8,4370.0,3080.0,26750.0,34200.0,85.6
2024-09,6710.0,4410.0,3120.0,27150.0,34680.0,85.8
2024-10,6820.5,4490.0,3190.0,27700.0,35380.0,85.9
2024-11,6910.0,4560.0,3260.0,28300.0,36120.0,86.0
2024-12,7020.8,4650.0,3340.0,28920.0,36910.0,86.1`
  },
  {
    id: 'matieres-premieres-cuivre-cobalt',
    name: 'Cours Mondiaux des Métaux (Cuivre, Cobalt) & Recettes d\'Exportation RDC',
    filename: 'bcc_statistiques_minieres_cours_cuivre_cobalt.csv',
    description: 'Cours de référence du London Metal Exchange (LME) et de Shanghai, exportations en volume et rentrées fiscales en devises de la RDC.',
    frequency: 'Mensuelle',
    source: 'BCC / Ministère des Mines & Douanes (DGDA)',
    recordCount: 8,
    headers: ['mois', 'cuivre_usd_tonne', 'cobalt_usd_tonne', 'export_cuivre_tonnes', 'recettes_fiscales_minieres_m_usd', 'variation_mensuelle_cuivre_pct'],
    previewRows: [
      { mois: '2024-05', cuivre_usd_tonne: 10120.0, cobalt_usd_tonne: 28400.0, export_cuivre_tonnes: 245000, recettes_fiscales_minieres_m_usd: 395.2, variation_mensuelle_cuivre_pct: 6.4 },
      { mois: '2024-06', cuivre_usd_tonne: 9680.0, cobalt_usd_tonne: 27800.0, export_cuivre_tonnes: 251000, recettes_fiscales_minieres_m_usd: 372.0, variation_mensuelle_cuivre_pct: -4.3 },
      { mois: '2024-07', cuivre_usd_tonne: 9420.0, cobalt_usd_tonne: 26900.0, export_cuivre_tonnes: 248000, recettes_fiscales_minieres_m_usd: 350.5, variation_mensuelle_cuivre_pct: -2.7 },
      { mois: '2024-08', cuivre_usd_tonne: 9150.0, cobalt_usd_tonne: 25500.0, export_cuivre_tonnes: 242000, recettes_fiscales_minieres_m_usd: 334.8, variation_mensuelle_cuivre_pct: -2.9 },
      { mois: '2024-09', cuivre_usd_tonne: 9850.0, cobalt_usd_tonne: 25200.0, export_cuivre_tonnes: 260000, recettes_fiscales_minieres_m_usd: 388.0, variation_mensuelle_cuivre_pct: 7.6 },
      { mois: '2024-10', cuivre_usd_tonne: 9620.0, cobalt_usd_tonne: 24800.0, export_cuivre_tonnes: 255000, recettes_fiscales_minieres_m_usd: 365.4, variation_mensuelle_cuivre_pct: -2.3 },
      { mois: '2024-11', cuivre_usd_tonne: 9280.0, cobalt_usd_tonne: 24300.0, export_cuivre_tonnes: 252000, recettes_fiscales_minieres_m_usd: 341.0, variation_mensuelle_cuivre_pct: -3.5 },
      { mois: '2024-12', cuivre_usd_tonne: 9020.0, cobalt_usd_tonne: 23900.0, export_cuivre_tonnes: 250000, recettes_fiscales_minieres_m_usd: 326.5, variation_mensuelle_cuivre_pct: -2.8 }
    ],
    downloadData: `mois,cuivre_usd_tonne,cobalt_usd_tonne,export_cuivre_tonnes,recettes_fiscales_minieres_m_usd,variation_mensuelle_cuivre_pct
2024-05,10120.0,28400.0,245000,395.2,6.4
2024-06,9680.0,27800.0,251000,372.0,-4.3
2024-07,9420.0,26900.0,248000,350.5,-2.7
2024-08,9150.0,25500.0,242000,334.8,-2.9
2024-09,9850.0,25200.0,260000,388.0,7.6
2024-10,9620.0,24800.0,255000,365.4,-2.3
2024-11,9280.0,24300.0,252000,341.0,-3.5
2024-12,9020.0,23900.0,250000,326.5,-2.8`
  }
];
