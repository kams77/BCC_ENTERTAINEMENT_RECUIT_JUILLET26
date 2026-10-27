"""
BCC DATA ANALYST TRAINING - EXERCICE 2
Sujet : Calcul des Ratios Prudentiels et Audit des Créances en Souffrance (NPL)
Direction : DSIF (Direction de la Surveillance des Intermédiaires Financiers)
Référence légale : Instruction n° 15 de la BCC
"""

import pandas as pd

SEUIL_ALERTE_NPL_PCT = 5.0
SEUIL_COUVERTURE_CIBLE_PCT = 70.0

def audit_portefeuille_bancaire():
    print("=" * 70)
    print("BCC RDC - DSIF : AUDIT PRUDENTIEL DU RISQUE DE CRÉDIT (INSTRUCTION 15)")
    print("=" * 70)

    # Données du système bancaire en millions d'USD
    data = [
        {'code': 'BK01', 'banque': 'Rawbank SA', 'credits_bruts_m': 2150.0, 'creances_souffrance_m': 86.0, 'provisions_m': 77.4, 'fonds_propres_m': 420.0},
        {'code': 'BK02', 'banque': 'Equity BCDC', 'credits_bruts_m': 1920.0, 'creances_souffrance_m': 92.1, 'provisions_m': 81.0, 'fonds_propres_m': 395.0},
        {'code': 'BK03', 'banque': 'Trust Merchant Bank (TMB)', 'credits_bruts_m': 880.0, 'creances_souffrance_m': 48.4, 'provisions_m': 42.1, 'fonds_propres_m': 215.0},
        {'code': 'BK04', 'banque': 'Sofibanque SA', 'credits_bruts_m': 620.0, 'creances_souffrance_m': 31.0, 'provisions_m': 26.5, 'fonds_propres_m': 135.0},
        {'code': 'BK05', 'banque': 'Ecobank RDC', 'credits_bruts_m': 410.0, 'creances_souffrance_m': 24.6, 'provisions_m': 20.8, 'fonds_propres_m': 92.0},
        {'code': 'BK06', 'banque': 'Standard Bank RDC', 'credits_bruts_m': 360.0, 'creances_souffrance_m': 14.4, 'provisions_m': 13.2, 'fonds_propres_m': 88.0},
        {'code': 'BK07', 'banque': 'FBNBank RDC', 'credits_bruts_m': 290.0, 'creances_souffrance_m': 18.8, 'provisions_m': 15.1, 'fonds_propres_m': 68.0},
        {'code': 'BK08', 'banque': 'Afriland First Bank CD', 'credits_bruts_m': 210.0, 'creances_souffrance_m': 19.5, 'provisions_m': 14.2, 'fonds_propres_m': 45.0}
    ]

    df = pd.DataFrame(data)

    # 1. Calcul du NPL Ratio (Taux de créances en souffrance)
    df['ratio_npl_pct'] = (df['creances_souffrance_m'] / df['credits_bruts_m'] * 100).round(2)

    # 2. Calcul du Taux de Couverture des Pertes par les Provisions
    df['taux_couverture_pct'] = (df['provisions_m'] / df['creances_souffrance_m'] * 100).round(2)

    # 3. Qualification de vigilance prudentielle
    df['statut_vigilance'] = df['ratio_npl_pct'].apply(
        lambda npl: 'ALERTE_DSIF' if npl > SEUIL_ALERTE_NPL_PCT else 'CONFORME'
    )

    df_sorted = df.sort_values(by='ratio_npl_pct', ascending=False)
    print("\nTableau de bord de surveillance prudentielle :")
    print(df_sorted[['banque', 'credits_bruts_m', 'ratio_npl_pct', 'taux_couverture_pct', 'statut_vigilance']])

    banques_en_alerte = df_sorted[df_sorted['statut_vigilance'] == 'ALERTE_DSIF']
    print(f"\n[SYNTHÈSE AUDITEUR] {len(banques_en_alerte)} banques dépassent le plafond prudentiel de 5% de NPL :")
    for _, row in banques_en_alerte.iterrows():
        print(f" - {row['banque']} : NPL = {row['ratio_npl_pct']}% (Couverture: {row['taux_couverture_pct']}%)")

    return df_sorted

if __name__ == '__main__':
    audit_portefeuille_bancaire()
