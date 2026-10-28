# BCC DataPrep — Plateforme de Préparation au Concours Data Analyste (Banque Centrale du Congo)

Ce dépôt contient l'intégralité du programme d'entraînement technique et théorique pour réussir le **test d'admission au poste de Data Analyste à la Banque Centrale du Congo (BCC RDC)**.

---

## 🎯 Architecture du Projet

Le projet combine :
1. **Une application web interactive React / Tailwind / TypeScript** : console d'exercices interactifs, fiches de révision de la Loi 18/027 et de la réglementation prudentielle, simulateur d'examen blanc chronométré et explorateur de données financières.
2. **Un pack d'entraînement local (`/local_training/`)** : scripts Python autonomes, requêtes SQL d'audit financier et jeux de données officieux de la RDC prêts à l'emploi pour s'exercer en local avec Pandas, Jupyter Notebook et SQL.

---

## 💾 Votre progression

La progression (modules lus, exercices, examen blanc, oral, plan d'étude) est enregistrée **dans votre navigateur uniquement**. En pied de page, trois boutons permettent de la **sauvegarder** dans un fichier JSON, de la **restaurer** (autre appareil, cache vidé) ou de la **réinitialiser**.

---

## 💻 Pratique en Local sur votre Machine

### Étape 1 : Cloner le dépôt sur votre ordinateur
Ouvrez votre terminal (ou invite de commande PowerShell / Git Bash) sur votre machine locale :
```bash
git clone https://github.com/kams77/BCC_ENTERTAINEMENT_RECUIT_JUILLET26.git
cd BCC_ENTERTAINEMENT_RECUIT_JUILLET26
```

---

### Étape 2 : Lancer la Plateforme Web Interactive en Local

Assurez-vous d'avoir **Node.js** (version 18 ou supérieure) installé sur votre machine.

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement local
npm run dev
```
Ouvrez ensuite votre navigateur sur **`http://localhost:3000`** : vous aurez accès à l'interface complète (Exercices, Fiches de lecture, Examen blanc, Données du Condensé).

---

### Étape 3 : S'exercer avec les Scripts Python & Pandas en Local

Un dossier complet d'exercices Python a été préparé dans `/local_training` :

```bash
cd local_training

# 1. Créer un environnement virtuel Python
python -m venv venv

# 2. Activer l'environnement virtuel
# Sur Windows :
venv\Scripts\activate
# Sur Mac / Linux :
source venv/bin/activate

# 3. Installer les bibliothèques d'analyse financière
pip install -r requirements.txt

# 4. Lancer les scripts d'analyse financière
python 01_nettoyage_declarations_multidevises.py
python 02_audit_ratios_npl_dsif.py
python 03_series_temporelles_taux_change.py
python 04_adjudication_bons_bcc.py
python 05_stress_test_macroprudentiel.py

# 5. (Optionnel) Pour explorer interactivement via Jupyter Notebook
jupyter notebook
```

---

## 📊 Récapitulatif des Exercices Techniques Inclus

| Fichier | Direction BCC | Notions Techniques Clés |
| :--- | :--- | :--- |
| `01_nettoyage_declarations_multidevises.py` | DSIF (Surveillance) | Conversion CDF/USD au cours indicatif (2 850 CDF/USD), rejets de saisie aberrante, encours net. |
| `02_audit_ratios_npl_dsif.py` | DSIF (Surveillance) | Instruction n° 15, Ratio NPL (seuil 5%), taux de couverture des provisions sur créances douteuses. |
| `03_series_temporelles_taux_change.py` | DRE (Études) | Dépréciation hebdomadaire du CDF, calcul du spread indicatif/parallèle, seuil d'adjudication de devises. |
| `04_adjudication_bons_bcc.py` | DOM (Opérations) | Dépouillement des Bons BCC (B-BCC 28j), Taux marginal et calcul du Taux Moyen Pondéré (TMP). |
| `05_stress_test_macroprudentiel.py` | DSIF (Surveillance) | Choc de baisse de 35% du cours du cuivre, réévaluation du CAR Bâle/BCC (seuil légal 10%). |
| `requetes_sql_bcc.sql` | DSI / DRE / DSIF | Recueil complet des requêtes SQL d'audit, Window Functions (`LAG`, `OVER`, `PARTITION BY`). |

---

## 📚 Matières à Lire & Fiches de Révision Fondamentales

1. **Loi Organique n° 18/027 du 13 décembre 2018** : Statuts de la BCC, mandat fondamental de stabilité des prix (article 3) et indépendance de gestion.
2. **Conduite de la Politique Monétaire en RDC** : Bons BCC, réserve obligatoire différenciée (CDF vs devises), pass-through de change dans une économie dollarisée à ~85%.
3. **Instructions Prudentielles de la BCC** : Instruction n° 14 (CAR $\ge 10\%$), Instruction n° 15 (classification des créances en 5 catégories), Instruction n° 21 (division des risques $\le 25\%$).
4. **Condensé Hebdomadaire d'Informations Statistiques** : Masse monétaire (M0, M1, M2, M3), réserves de change en semaines d'importations, impact des cours du cuivre et du cobalt sur les recettes fiscales.
5. **Méthodologie du Concours** : Rédaction d'une note de synthèse macroéconomique pour le Gouverneur et arguments pour l'entretien d'admission.
