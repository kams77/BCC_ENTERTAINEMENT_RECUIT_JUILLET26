import React, { useState } from 'react';
import { Calculator, Scale, FileText, Check, Copy } from 'lucide-react';

export const FormulaCheatSheet: React.FC = () => {
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const formulas = [
    {
      id: 'car',
      name: 'Ratio de Solvabilité Prudentielle (Capital Adequacy Ratio - CAR)',
      category: 'Surveillance Bancaire (DSIF)',
      formula: 'CAR = (Tier 1 + Tier 2) / (RWA_crédit + RWA_marché + RWA_opérationnel) >= 10.0%',
      definition: 'Rapport entre les fonds propres prudentiels nets et la somme des actifs pondérés par les risques. En RDC, la norme est fixée à 10,0% minimum (Instruction n° 14 de la BCC), supérieure au standard de 8% de Bâle.',
      norme: 'CAR >= 10,0%'
    },
    {
      id: 'npl',
      name: 'Ratio de Créances en Souffrance (Non-Performing Loans - NPL)',
      category: 'Qualité du Portefeuille (DSIF)',
      formula: 'Ratio NPL (%) = (Créances Douteuses + Créances Compromises) / Total Crédits Bruts * 100',
      definition: 'Mesure la dégradation du portefeuille de crédits distribués. Selon l\'Instruction n° 15 de la BCC, tout dépassement de 5,0% place l\'établissement bancaire sous surveillance renforcée.',
      norme: 'NPL <= 5,0%'
    },
    {
      id: 'couverture',
      name: 'Taux de Couverture des Pertes par les Provisions',
      category: 'Prudence & Solvabilité',
      formula: 'Taux de Couverture (%) = Provisions Spécifiques Constitués / Créances en Souffrance * 100',
      definition: 'Capacité des provisions déjà déduites du résultat à amortir les pertes potentielles en cas de défaut total des débiteurs. La BCC recommande une couverture >= 70%.',
      norme: 'Couverture >= 70,0%'
    },
    {
      id: 'bbcc',
      name: 'Valeur Actuelle et Intérêts Précomptés sur Bons BCC (B-BCC)',
      category: 'Opérations Monétaires (DOM)',
      formula: 'VA = VN / [1 + (Taux * Jours / 360)]\nIntérêts Précomptés = VN - VA',
      definition: 'Les Bons BCC sont des titres négociables à intérêts précomptés émis par la BCC pour ponctionner la surliquidité bancaire. Jours = 7, 14, 28 ou 84 jours.',
      norme: 'Base de calcul monétaire : Exact/360'
    },
    {
      id: 'tmp',
      name: 'Taux Moyen Pondéré (TMP) de l\'Adjudication des Bons BCC',
      category: 'Politique Monétaire (CPM / DOM)',
      formula: 'TMP (%) = Somme(Montant_Alloué_i * Taux_Soumis_i) / Somme(Montants_Alloués)',
      definition: 'Taux d\'intérêt effectif moyen résultant du dépouillement des offres servies par taux croissant jusqu\'au volume cible d\'absorption de la liquidité fixé par la BCC.',
      norme: 'Baromètre officiel du marché monétaire'
    },
    {
      id: 'spread',
      name: 'Spread du Marché des Changes (Écart Officiel vs Parallèle)',
      category: 'Marché des Changes & DRE',
      formula: 'Spread (%) = [(Taux_Parallèle_Kin - Taux_Indicatif_BCC) / Taux_Indicatif_BCC] * 100',
      definition: 'Écart relatif entre le cours officiel indicatif et le cours du marché libre de Kinshasa. Si Spread > 2,5 - 3%, la BCC envisage des adjudications de devises pour calmer la spéculation.',
      norme: 'Seuil d\'alerte : Spread > 2,5%'
    },
    {
      id: 'reserves',
      name: 'Réserves Officielles en Semaines d\'Importations',
      category: 'Secteur Extérieur (DRE)',
      formula: 'Semaines d\'Importations = (Réserves Officielles USD / Importations Annuelles USD) * 52',
      definition: 'Indicateur clé de la vulnérabilité extérieure de la RDC. Il mesure le nombre de semaines pendant lesquelles le pays peut continuer d\'importer des biens essentiels en cas d\'arrêt des exportations.',
      norme: 'Objectif prudentiel : >= 12 à 14 semaines'
    },
    {
      id: 'dollarisation',
      name: 'Ratio de Dollarisation des Dépôts Bancaires',
      category: 'Agrégats Monétaires (DRE)',
      formula: 'Taux de Dollarisation (%) = Dépôts en Devises (USD) / Dépôts Bancaires Totaux * 100',
      definition: 'Proportion de l\'épargne nationale libellée en devises étrangères dans les banques congolaises. En RDC, cet indicateur est historiquement compris entre 83% et 87%.',
      norme: 'Constat RDC : ~85%'
    },
    {
      id: 'multiplicateur',
      name: 'Multiplicateur de Crédit Monétaire (k)',
      category: 'Économie Monétaire',
      formula: 'k = Masse Monétaire M2 / Base Monétaire M0',
      definition: 'Capacité du système bancaire commercial à créer de la monnaie scripturale à partir d\'une unité de monnaie centrale émise par la BCC.',
      norme: 'RDC : Faible (1,2 à 1,3) dû à la forte circulation fiduciaire'
    },
    {
      id: 'division',
      name: 'Règle de Division des Grands Risques (Instruction n° 21)',
      category: 'Surveillance Prudentielle (DSIF)',
      formula: 'Exposition Nette sur un Seul Groupe Débiteur <= 25,0% des Fonds Propres Prudentiels',
      definition: 'Interdiction absolue pour un établissement de crédit d\'engager plus du quart de son capital net sur un même emprunteur ou un groupe d\'entreprises liées.',
      norme: 'Plafond individuel strict : <= 25,0%'
    }
  ];

  const handleCopy = (formulaText: string, id: string) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedFormula(id);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Mémento des Formules & Ratios Réglementaires</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Formulaire Officiel du Data Analyst BCC
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Toutes les équations mathématiques, formules prudentielles et normes de la Banque Centrale du Congo indispensables pour résoudre les cas pratiques et briller lors de l'entretien d'admission.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formulas.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between gap-3 hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-semibold text-amber-400">
                  {item.category}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  {item.norme}
                </span>
              </div>

              <h2 className="text-base font-bold text-white mb-2">
                {item.name}
              </h2>

              <div className="relative p-3 rounded-xl bg-slate-950 border border-slate-800/80 my-2 group">
                <pre className="font-mono text-xs text-amber-300 whitespace-pre-wrap leading-relaxed">
                  {item.formula}
                </pre>
                <button
                  onClick={() => handleCopy(item.formula, item.id)}
                  title="Copier la formule"
                  className="absolute right-2 top-2 p-1.5 text-slate-500 hover:text-white rounded-lg bg-slate-900 border border-slate-800 opacity-80 hover:opacity-100 transition-all"
                >
                  {copiedFormula === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                {item.definition}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
