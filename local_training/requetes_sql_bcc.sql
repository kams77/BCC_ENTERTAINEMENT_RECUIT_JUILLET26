-- ============================================================================
-- BANQUE CENTRALE DU CONGO (BCC RDC) - RECUEIL DE REQUÊTES SQL DE RÉFÉRENCE
-- POUR LE TEST TECHNIQUE D'ADMISSION DATA ANALYSTE
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. HARMONISATION MULTIDEVISE CDF / USD ET ENCOURS NET DE CRÉDIT
-- Taux pivot officiel : 2 850 CDF = 1 USD
-- ----------------------------------------------------------------------------
SELECT 
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
ORDER BY encours_net_usd DESC;


-- ----------------------------------------------------------------------------
-- 2. AUDIT PRUDENTIEL DU TAUX DE CRÉANCES EN SOUFFRANCE (NPL) ET COUVERTURE
-- Seuil d'alerte DSIF : NPL Ratio <= 5.0%
-- ----------------------------------------------------------------------------
SELECT 
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
ORDER BY ratio_npl_pct DESC;


-- ----------------------------------------------------------------------------
-- 3. ANALYSE TEMPORELLE DU MARCHÉ DES CHANGES (WINDOW FUNCTION LAG)
-- Spread Parallèle vs Indicatif & Dépréciation Hebdomadaire
-- ----------------------------------------------------------------------------
SELECT 
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
        WHEN ((taux_parallele - taux_indicatif) / taux_indicatif) * 100 > 2.5 
        THEN 'TENSION_MARCHE (Adjudication devises)' 
        ELSE 'STABLE' 
    END AS signal_intervention_bcc
FROM bcc_taux_hebdo_usd_cdf
ORDER BY date ASC;


-- ----------------------------------------------------------------------------
-- 4. CONTRÔLE D'ÉGALITÉ COMPTABLE BILANTIELLE (DATA QUALITY)
-- Actif Total = Passif Total
-- ----------------------------------------------------------------------------
SELECT 
    code_banque,
    date_declaration,
    actif_total,
    passif_total,
    ROUND(ABS(actif_total - passif_total), 2) AS ecart_desequilibre
FROM declarations_bilantielles_mensuelles
WHERE ABS(actif_total - passif_total) > 0.01
ORDER BY ecart_desequilibre DESC;


-- ----------------------------------------------------------------------------
-- 5. CALCUL DU RATIO DE SOLVABILITÉ (CAR) POST-CHOC (STRESS-TEST)
-- Norme prudentielle BCC Instruction 14 : CAR >= 10.0%
-- ----------------------------------------------------------------------------
SELECT 
    banque,
    fonds_propres_init_m,
    rwa_init_m,
    ROUND((fonds_propres_init_m / rwa_init_m) * 100, 2) AS car_initial_pct,
    ROUND(
        ((fonds_propres_init_m - (creances_douteuses_m * 0.50)) 
        / (rwa_init_m * 1.15)) * 100, 
        2
    ) AS car_post_choc_pct,
    CASE 
        WHEN ((fonds_propres_init_m - (creances_douteuses_m * 0.50)) / (rwa_init_m * 1.15)) * 100 >= 10.0 
        THEN 'CONFORME' 
        ELSE 'SOUS-CAPITALISÉ' 
    END AS diagnostic_bcc
FROM dsif_banques_exposition_miniere
ORDER BY car_post_choc_pct ASC;
