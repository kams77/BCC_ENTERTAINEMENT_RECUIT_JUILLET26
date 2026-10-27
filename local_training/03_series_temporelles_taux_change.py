"""
BCC DATA ANALYST TRAINING - EXERCICE 3
Sujet : Séries Chronologiques Financières, Spread Indicatif/Parallèle et Volatilité du Franc Congolais
Direction : DRE (Direction de la Recherche et des Études)
"""

import pandas as pd

def analyser_cours_change():
    print("=" * 70)
    print("BCC RDC - DRE : ANALYSE DES SÉRIES DU MARCHÉ DES CHANGES (CDF / USD)")
    print("=" * 70)

    # Données hebdomadaires de fin d'année
    donnees = [
        {'date': '2024-10-04', 'taux_indicatif': 2845.2, 'taux_parallele': 2890.0},
        {'date': '2024-10-11', 'taux_indicatif': 2847.8, 'taux_parallele': 2895.0},
        {'date': '2024-10-18', 'taux_indicatif': 2851.4, 'taux_parallele': 2902.0},
        {'date': '2024-10-25', 'taux_indicatif': 2853.1, 'taux_parallele': 2908.0},
        {'date': '2024-11-01', 'taux_indicatif': 2856.7, 'taux_parallele': 2915.0},
        {'date': '2024-11-08', 'taux_indicatif': 2858.9, 'taux_parallele': 2920.0},
        {'date': '2024-11-15', 'taux_indicatif': 2862.0, 'taux_parallele': 2925.0},
        {'date': '2024-11-22', 'taux_indicatif': 2865.4, 'taux_parallele': 2932.0},
        {'date': '2024-11-29', 'taux_indicatif': 2868.2, 'taux_parallele': 2938.0},
        {'date': '2024-12-06', 'taux_indicatif': 2872.0, 'taux_parallele': 2945.0},
        {'date': '2024-12-13', 'taux_indicatif': 2875.5, 'taux_parallele': 2950.0},
        {'date': '2024-12-20', 'taux_indicatif': 2880.1, 'taux_parallele': 2960.0}
    ]

    df = pd.DataFrame(donnees)
    df['date'] = pd.to_datetime(df['date'])

    # 1. Calcul du spread relatif en pourcentage
    df['spread_pct'] = ((df['taux_parallele'] - df['taux_indicatif']) / df['taux_indicatif'] * 100).round(2)

    # 2. Dépréciation hebdomadaire du cours officiel
    df['depreciation_hebdo_pct'] = (df['taux_indicatif'].pct_change() * 100).round(3)

    # 3. Seuil d'intervention BCC : spread > 2.5%
    df['signal_intervention'] = df['spread_pct'].apply(
        lambda s: 'TENSION_MARCHE (Adjudication requise)' if s > 2.5 else 'STABLE'
    )

    print("\nÉvolution hebdomadaire du marché des changes :")
    print(df[['date', 'taux_indicatif', 'taux_parallele', 'spread_pct', 'depreciation_hebdo_pct', 'signal_intervention']])

    tensions = df[df['spread_pct'] > 2.5]
    if not tensions.empty:
        premiere = tensions.iloc[0]
        print(f"\n[ALERTE CPM] Première rupture constatée le {premiere['date'].strftime('%d/%m/%Y')} avec un spread de {premiere['spread_pct']}%.")

    return df

if __name__ == '__main__':
    analyser_cours_change()
