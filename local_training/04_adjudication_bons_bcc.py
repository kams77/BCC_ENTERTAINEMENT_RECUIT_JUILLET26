"""
BCC DATA ANALYST TRAINING - EXERCICE 4
Sujet : Dépouillement des Appels d'Offres des Bons BCC (B-BCC) & Taux Moyen Pondéré (TMP)
Direction : DOM (Direction des Opérations Bancaires et des Marchés)
"""

import pandas as pd

VOLUME_CIBLE_MRD_CDF = 250.0  # Montant maximal de surliquidité que la BCC veut ponctionner

def depouillement_adjudication_bbcc():
    print("=" * 70)
    print("BCC RDC - DOM : SÉANCE D'ADJUDICATION DES BONS BCC 28 JOURS")
    print(f"Cible d'absorption de la liquidité : {VOLUME_CIBLE_MRD_CDF} Milliards de CDF")
    print("=" * 70)

    soumissions = [
        {'banque': 'Trust Merchant Bank (TMB)', 'montant_demande_mrd': 60.0, 'taux_soumis_pct': 18.5},
        {'banque': 'Rawbank SA', 'montant_demande_mrd': 80.0, 'taux_soumis_pct': 19.0},
        {'banque': 'Equity BCDC', 'montant_demande_mrd': 70.0, 'taux_soumis_pct': 19.5},
        {'banque': 'Standard Bank RDC', 'montant_demande_mrd': 40.0, 'taux_soumis_pct': 20.0},
        {'banque': 'Sofibanque SA', 'montant_demande_mrd': 30.0, 'taux_soumis_pct': 20.5},
        {'banque': 'Ecobank RDC', 'montant_demande_mrd': 25.0, 'taux_soumis_pct': 21.0},
        {'banque': 'FBNBank RDC', 'montant_demande_mrd': 20.0, 'taux_soumis_pct': 22.0},
        {'banque': 'Afriland First Bank', 'montant_demande_mrd': 15.0, 'taux_soumis_pct': 23.5}
    ]

    df = pd.DataFrame(soumissions)

    # 1. Tri par taux d'intérêt soumis croissant (les banques les moins exigeantes d'abord)
    df_trie = df.sort_values(by='taux_soumis_pct', ascending=True).copy()

    # 2. Algorithme d'attribution jusqu'à épuisement du volume cible
    montants_retenus = []
    reliquat = VOLUME_CIBLE_MRD_CDF

    for _, row in df_trie.iterrows():
        if reliquat <= 0:
            montants_retenus.append(0.0)
        elif row['montant_demande_mrd'] <= reliquat:
            montants_retenus.append(row['montant_demande_mrd'])
            reliquat -= row['montant_demande_mrd']
        else:
            montants_retenus.append(reliquat)
            reliquat = 0.0

    df_trie['montant_alloue_mrd'] = montants_retenus

    # 3. Calcul du Taux Moyen Pondéré (TMP) de la séance
    volume_total_adjuge = df_trie['montant_alloue_mrd'].sum()
    tmp = (df_trie['montant_alloue_mrd'] * df_trie['taux_soumis_pct']).sum() / volume_total_adjuge

    taux_marginal = df_trie[df_trie['montant_alloue_mrd'] > 0]['taux_soumis_pct'].max()

    print("\nRésultat officiel du dépouillement :")
    print(df_trie[['banque', 'taux_soumis_pct', 'montant_demande_mrd', 'montant_alloue_mrd']])

    print("\n" + "-" * 50)
    print(f"Volume total absorbé : {volume_total_adjuge:.1f} Mrd CDF")
    print(f"Taux Marginal d'adjudication : {taux_marginal:.2f} %")
    print(f"Taux Moyen Pondéré (TMP) : {tmp:.3f} %")
    print("-" * 50)

    return df_trie

if __name__ == '__main__':
    depouillement_adjudication_bbcc()
