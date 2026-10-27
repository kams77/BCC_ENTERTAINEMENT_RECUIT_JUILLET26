"""
BCC DATA ANALYST TRAINING - EXERCICE 5
Sujet : Stress-Testing Macroprudentiel : Choc Minier (Cuivre/Cobalt) et Solvabilité Bancaire (CAR)
Direction : DSIF (Direction de la Surveillance des Intermédiaires Financiers)
Référence légale : Instruction n° 14 de la BCC (Norme de Solvabilité >= 10.0%)
"""

import pandas as pd

SEUIL_REGLEMENTAIRE_CAR_PCT = 10.0
CHOC_PERTES_CREANCES_PCT = 0.50  # 50% de dépréciation supplémentaire sur les créances douteuses
EXPANSION_RISQUE_RWA_PCT = 1.15  # +15% sur les actifs pondérés par le risque suite au ralentissement

def simulation_stress_test():
    print("=" * 70)
    print("BCC RDC - DSIF : STRESS-TEST SYSTÉMIQUE FACE À UN CHOC MINIER AU KATANGA")
    print("Scénario : Baisse de 35% du cours mondial du cuivre LME")
    print("=" * 70)

    banques = [
        {'banque': 'Rawbank SA', 'fonds_propres_init_m': 420.0, 'rwa_init_m': 2840.0, 'creances_douteuses_m': 86.0},
        {'banque': 'Equity BCDC', 'fonds_propres_init_m': 395.0, 'rwa_init_m': 2600.0, 'creances_douteuses_m': 92.0},
        {'banque': 'Trust Merchant Bank (TMB)', 'fonds_propres_init_m': 215.0, 'rwa_init_m': 1335.0, 'creances_douteuses_m': 48.0},
        {'banque': 'Standard Bank RDC', 'fonds_propres_init_m': 88.0, 'rwa_init_m': 533.0, 'creances_douteuses_m': 14.0},
        {'banque': 'Sofibanque SA', 'fonds_propres_init_m': 135.0, 'rwa_init_m': 971.0, 'creances_douteuses_m': 31.0},
        {'banque': 'Ecobank RDC', 'fonds_propres_init_m': 92.0, 'rwa_init_m': 718.0, 'creances_douteuses_m': 25.0},
        {'banque': 'FBNBank RDC', 'fonds_propres_init_m': 68.0, 'rwa_init_m': 596.0, 'creances_douteuses_m': 19.0},
        {'banque': 'Afriland First Bank CD', 'fonds_propres_init_m': 45.0, 'rwa_init_m': 459.0, 'creances_douteuses_m': 20.0}
    ]

    df = pd.DataFrame(banques)

    # 1. Ratio de solvabilité avant le choc
    df['car_initial_pct'] = (df['fonds_propres_init_m'] / df['rwa_init_m'] * 100).round(2)

    # 2. Pertes inattendues imputées directement sur les fonds propres
    df['pertes_inattendues_m'] = df['creances_douteuses_m'] * CHOC_PERTES_CREANCES_PCT
    df['fonds_propres_stress_m'] = df['fonds_propres_init_m'] - df['pertes_inattendues_m']

    # 3. Augmentation des actifs pondérés du risque (RWA)
    df['rwa_stress_m'] = df['rwa_init_m'] * EXPANSION_RISQUE_RWA_PCT

    # 4. Nouveau ratio de solvabilité après choc (CAR)
    df['car_stress_pct'] = (df['fonds_propres_stress_m'] / df['rwa_stress_m'] * 100).round(2)

    # 5. Diagnostic de conformité prudentielle BCC
    df['statut_stress'] = df['car_stress_pct'].apply(
        lambda car: 'RÉSISTANT' if car >= SEUIL_REGLEMENTAIRE_CAR_PCT else 'SOUS-CAPITALISÉ'
    )

    df_trie = df.sort_values(by='car_stress_pct', ascending=True)

    print("\nImpact du scénario de crise sur les banques commerciales :")
    print(df_trie[['banque', 'car_initial_pct', 'car_stress_pct', 'statut_stress']])

    sous_capitalisees = df_trie[df_trie['statut_stress'] == 'SOUS-CAPITALISÉ']
    print(f"\n[ALERTE GOUVERNEUR] {len(sous_capitalisees)} banques chutent sous le seuil impératif de 10% de solvabilité :")
    for _, row in sous_capitalisees.iterrows():
        manquant_m = (row['rwa_stress_m'] * 0.10) - row['fonds_propres_stress_m']
        print(f" - {row['banque']} : CAR = {row['car_stress_pct']}% (Recapitalisation requise : +{manquant_m:.2f} M$)")

    return df_trie

if __name__ == '__main__':
    simulation_stress_test()
