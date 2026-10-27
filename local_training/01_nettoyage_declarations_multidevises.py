"""
BCC DATA ANALYST TRAINING - EXERCICE 1
Sujet : Nettoyage et Harmonisation de Déclarations Multidevises des Banques Commerciales (CDF / USD)
Direction : DSIF (Direction de la Surveillance des Intermédiaires Financiers)
"""

import pandas as pd
import numpy as np

# Taux officiel indicatif de la Banque Centrale du Congo (Fixing)
TAUX_INDICATIF_BCC = 2850.0

def load_and_clean_declarations():
    print("=" * 70)
    print("BCC RDC - DSIF : AUDIT ET NETTOYAGE DES DÉCLARATIONS MULTIDEVISES")
    print("=" * 70)

    # Données brutes simulées conformes aux déclarations transmises à la DSIF
    data = {
        'id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'banque': [
            'Rawbank SA', 'Rawbank SA', 
            'Equity BCDC', 'Equity BCDC', 
            'Trust Merchant Bank', 'Trust Merchant Bank', 'Trust Merchant Bank', 
            'Sofibanque SA', 'Sofibanque SA', 
            'Afriland First Bank'
        ],
        'devise': ['USD', 'CDF', 'USD', 'CDF', 'USD', 'USD', 'CDF', 'USD', 'CDF', 'USD'],
        'credit_brut': [
            125000000, 142500000000, 
            98000000, 85500000000, 
            -450000, 64000000, 57000000000, 
            42000000, 28500000000, 
            25000000
        ],
        'provisions': [
            6250000, 7125000000, 
            4900000, 4275000000, 
            0, 3200000, 2850000000, 
            2100000, 1425000000, 
            2500000
        ],
        'statut': ['ACTIF', 'ACTIF', 'ACTIF', 'ACTIF', 'ERREUR_SAISIE', 'ACTIF', 'ACTIF', 'ACTIF', 'ACTIF', 'ACTIF']
    }

    df = pd.DataFrame(data)
    print("\n1. Aperçu des données brutes déclarées par les banques :")
    print(df)

    # Étape 1 : Filtrage des erreurs matérielles et crédits négatifs
    df_valide = df[(df['credit_brut'] > 0) & (df['statut'] == 'ACTIF')].copy()
    nb_rejets = len(df) - len(df_valide)
    print(f"\n[CONTRÔLE QUALITÉ] {nb_rejets} enregistrement(s) erroné(s) rejeté(s).")

    # Étape 2 : Harmonisation en équivalent USD
    df_valide['credit_brut_usd'] = df_valide.apply(
        lambda r: r['credit_brut'] / TAUX_INDICATIF_BCC if r['devise'] == 'CDF' else r['credit_brut'],
        axis=1
    )

    df_valide['provisions_usd'] = df_valide.apply(
        lambda r: r['provisions'] / TAUX_INDICATIF_BCC if r['devise'] == 'CDF' else r['provisions'],
        axis=1
    )

    # Étape 3 : Calcul de l'encours net de crédit
    df_valide['credit_net_usd'] = df_valide['credit_brut_usd'] - df_valide['provisions_usd']

    # Étape 4 : Consolidation par établissement bancaire
    synthese = df_valide.groupby('banque').agg({
        'credit_brut_usd': 'sum',
        'provisions_usd': 'sum',
        'credit_net_usd': 'sum'
    }).sort_values(by='credit_net_usd', ascending=False)

    print("\n2. Situation consolidée en équivalent USD (Taux BCC : 2 850 CDF/USD) :")
    print(synthese.applymap(lambda x: f"{x:,.2f} USD"))

    print("\n[CONCLUSION DSIF] Rawbank SA et Equity BCDC dominent l'intermédiation de la place.")
    return synthese

if __name__ == '__main__':
    load_and_clean_declarations()
