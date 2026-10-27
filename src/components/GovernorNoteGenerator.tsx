import React, { useState } from 'react';
import { 
  FileText, 
  Sliders, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  AlertTriangle, 
  ShieldCheck,
  Lock,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface GovernorNoteGeneratorProps {
  strictMode?: boolean;
  isUnlocked?: boolean;
  onNavigateToRoadmap?: () => void;
}

export const GovernorNoteGenerator: React.FC<GovernorNoteGeneratorProps> = ({
  strictMode = true,
  isUnlocked = true,
  onNavigateToRoadmap,
}) => {
  const [tauxIndicatif, setTauxIndicatif] = useState<number>(2912);
  const [spreadParallele, setSpreadParallele] = useState<number>(3.4);
  const [reservesUsd, setReservesUsd] = useState<number>(5530);
  const [semainesImport, setSemainesImport] = useState<number>(13.7);
  const [inflationAnnuelle, setInflationAnnuelle] = useState<number>(14.8);
  const [tauxNplMoyen, setTauxNplMoyen] = useState<number>(5.4);
  const [cuivreLme, setCuivreLme] = useState<number>(9020);
  const [copied, setCopied] = useState<boolean>(false);

  // Derive alert flags
  const isExchangeStress = spreadParallele > 2.5;
  const isNplHigh = tauxNplMoyen > 5.0;
  const isReservesSafe = semainesImport >= 12.0;

  const generatedNote = `BANQUE CENTRALE DU CONGO
CABINET DU GOUVERNEUR / DIRECTION DE LA RECHERCHE ET DES ÉTUDES (DRE)
--------------------------------------------------------------------------------
NOTE DE CONJONCTURE MONÉTAIRE ET DE STABILITÉ FINANCIÈRE
À L'ATTENTION DE : Madame le Gouverneur de la Banque Centrale du Congo
OBJET : Évaluation hebdomadaire de la liquidité, du marché des changes et du risque bancaire
DATE D'ARRÊTÉ : Fin de période d'observation
--------------------------------------------------------------------------------

1. CONSTAT CHIFFRÉ ET TRAITEMENT STATISTIQUE RÉCENT
L'analyse des séries financières consolidées fait ressortir les évolutions majeures suivantes :
- Marché des changes : Le cours indicatif officiel de la BCC s'établit à ${tauxIndicatif.toLocaleString('fr-FR')} CDF pour 1 USD. L'écart (« spread ») avec le cours libre du marché parallèle de Kinshasa atteint ${spreadParallele.toFixed(2)}% ${isExchangeStress ? '(en zone de tension au-delà du seuil de vigilance de 2,50%)' : '(dans les limites normales de fluctuation)'}.
- Position extérieure : Les réserves officielles de change nettes se situent à ${reservesUsd.toLocaleString('fr-FR')} millions USD, soit une couverture de ${semainesImport.toFixed(1)} semaines d'importations de biens et services (cible prudentielle : >= 12,0 semaines).
- Environnement des prix : L'inflation en glissement annuel ressort à ${inflationAnnuelle.toFixed(1)}%, alimentée par le coefficient de pass-through de la dépréciation monétaire sur les produits importés.
- Système bancaire et risque de crédit : Le ratio moyen des créances en souffrance (NPL) du secteur s'élève à ${tauxNplMoyen.toFixed(2)}% du portefeuille brut ${isNplHigh ? '(dépassement du seuil de 5,00% fixé par l\'Instruction n° 15 de la BCC)' : '(conforme à la norme DSIF)'}.
- Secteur minier : Le cours spot du cuivre au London Metal Exchange (LME) cote à ${cuivreLme.toLocaleString('fr-FR')} USD/tonne.

2. FACTEURS EXPLICATIFS ET DIAGNOSTIC ANALYTIQUE
- La dollarisation structurelle des dépôts (stabilisée à environ 86%) amplifie la transmission des chocs de change vers le panier de la ménagère.
${isExchangeStress ? '- Le spread accru de ' + spreadParallele.toFixed(2) + '% traduit une demande spéculative accrue de devises de la part des opérateurs économiques locaux et des tensions de liquidité en devises au comptant.' : '- Le faible écart indicatif/parallèle atteste d\'une régulation adéquate de la liquidité en Francs Congolais.'}
${isNplHigh ? '- La hausse du ratio de NPL à ' + tauxNplMoyen.toFixed(2) + '% signale un début de contagion des retards de paiement, notamment auprès des sous-traitants miniers et des PME commerciales.' : '- Le portefeuille de crédits des banques de premier rang demeure résilient avec un taux de provisionnement adéquat.'}

3. RISQUES IDENTIFIÉS POUR LE CPM
- Risque d'accélération de l'inflation sous-jacente par effet de second tour si la dépréciation monétaire n'est pas endiguée.
- Risque de pression sur le ratio de solvabilité prudentielle (CAR) des établissements bancaires de deuxième et troisième catégorie.

4. RECOMMANDATIONS OPÉRATIONNELLES DE L'ANALYSTE
Sur la base de ces indicateurs, nous suggérons au Comité de Politique Monétaire (CPM) :
${isExchangeStress ? 'a) Conduire une adjudication ciblée de devises de 50 à 100 millions USD par la DOBM pour détendre le cours parallèle et réaligner le fixing officiel.\nb) Augmenter le volume d\'absorption de la liquidité bancaire par l\'émission de Bons BCC (B-BCC) à 28 jours au Taux Moyen Pondéré (TMP) de référence.' : 'a) Maintenir le dispositif actuel d\'Open Market sans intervention massive de devises.\nb) Poursuivre le calibrage fin des Bons BCC (B-BCC) 7 et 28 jours.'}
c) Instruire la Direction de la Surveillance des Intermédiaires Financiers (DSIF) d'exiger des plans de redressement sous 60 jours pour tout établissement affichant un NPL > 5,0%.
d) Maintenir la réserve obligatoire différenciée afin de continuer à décourager la spéculation sur les dépôts en devises.

Pour la Direction de la Recherche et des Études (DRE),
Le Data Analyst Conjoncturel`;

  const handleCopyNote = () => {
    navigator.clipboard.writeText(generatedNote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Épreuve Pratique · Rédaction Stratégique BCC</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Générateur de Note de Synthèse au Gouverneur
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Entraînez-vous à transformer des séries statistiques en note d'aide à la décision pour le Gouverneur et le Comité de Politique Monétaire (CPM).
          </p>
        </div>

        <button
          onClick={handleCopyNote}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-sm shrink-0"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Note Copiée !' : 'Copier la Note'}</span>
        </button>
      </div>

      {strictMode && !isUnlocked ? (
        <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-amber-500/40 flex flex-col items-center text-center gap-5 shadow-xl my-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Priorité Pédagogique BCC · Étape 13 (Phase 6)
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Rédaction Stratégique Verrouillée
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              La rédaction de la Note au Gouverneur et au Comité de Politique Monétaire (CPM) exige la maîtrise préalable du cadre méthodologique de direction (Module 06).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-left w-full max-w-lg space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Prérequis Indispensable :
            </span>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/70 border border-slate-800">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-white block">
                    Module 06 : Méthodologie du Concours & Posture
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Techniques de synthèse exécutive pour la haute direction BCC
                  </span>
                </div>
              </div>
              <span className="text-amber-400 font-mono text-xs font-bold shrink-0">
                Non validé
              </span>
            </div>
          </div>

          {onNavigateToRoadmap && (
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={onNavigateToRoadmap}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-md"
              >
                <span>Accéder au Parcours Séquentiel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Panel (4 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Paramètres Conjoncturels Simulés</span>
          </h2>

          {/* Slider 1: Taux Indicatif */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Taux Indicatif Officiel BCC</span>
              <span className="font-mono text-amber-400 font-bold tabular-nums">{tauxIndicatif} CDF</span>
            </div>
            <input
              type="range"
              min={2700}
              max={3100}
              step={5}
              value={tauxIndicatif}
              onChange={(e) => setTauxIndicatif(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Slider 2: Spread Parallèle */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Spread Marché Parallèle (%)</span>
              <span className={`font-mono font-bold tabular-nums ${isExchangeStress ? 'text-red-400' : 'text-emerald-400'}`}>
                {spreadParallele.toFixed(2)} % {isExchangeStress && '(Tension)'}
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={6.0}
              step={0.1}
              value={spreadParallele}
              onChange={(e) => setSpreadParallele(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block">Seuil d'alerte intervention BCC : &gt; 2,50%</span>
          </div>

          {/* Slider 3: Réserves de Change */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Réserves Officielles USD</span>
              <span className="font-mono text-amber-400 font-bold tabular-nums">{reservesUsd} M$</span>
            </div>
            <input
              type="range"
              min={4000}
              max={7000}
              step={50}
              value={reservesUsd}
              onChange={(e) => {
                const val = Number(e.target.value);
                setReservesUsd(val);
                setSemainesImport(Number(((val / 21000) * 52).toFixed(1)));
              }}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block">Couverture équivalente : {semainesImport} semaines</span>
          </div>

          {/* Slider 4: Taux NPL Bancaire */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Ratio Moyen NPL du Secteur</span>
              <span className={`font-mono font-bold tabular-nums ${isNplHigh ? 'text-red-400' : 'text-emerald-400'}`}>
                {tauxNplMoyen.toFixed(2)} % {isNplHigh && '(Alerte DSIF)'}
              </span>
            </div>
            <input
              type="range"
              min={2.0}
              max={10.0}
              step={0.1}
              value={tauxNplMoyen}
              onChange={(e) => setTauxNplMoyen(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block">Seuil prudentiel Instruction 15 : &lt;= 5,00%</span>
          </div>

          {/* Slider 5: Cuivre LME */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Cours du Cuivre (LME)</span>
              <span className="font-mono text-amber-400 font-bold tabular-nums">{cuivreLme} USD/tonne</span>
            </div>
            <input
              type="range"
              min={7500}
              max={11000}
              step={100}
              value={cuivreLme}
              onChange={(e) => setCuivreLme(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1 mt-auto">
            <span className="font-semibold text-slate-200">Conseil Concours BCC :</span>
            <p>
              Le jury de la BCC valorise les candidats capables d'associer un constat statistique à une recommandation monétaire concrète (ex. adjuger des devises si le spread dépasse 2,5%).
            </p>
          </div>
        </div>

        {/* Note Output Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-semibold text-white">Rendu Officiel de la Note</span>
            <span>Format Institutionnel BCC</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[620px] overflow-y-auto selection:bg-amber-500/30">
            {generatedNote}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
