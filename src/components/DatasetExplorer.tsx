import React, { useState } from 'react';
import { 
  Database, 
  Download, 
  Search, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  BarChart3, 
  FileText,
  Check
} from 'lucide-react';
import { DatasetItem } from '../types';

interface DatasetExplorerProps {
  datasets: DatasetItem[];
}

export const DatasetExplorer: React.FC<DatasetExplorerProps> = ({ datasets }) => {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>(datasets[0].id);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const currentDataset = datasets.find((d) => d.id === selectedDatasetId) || datasets[0];

  const handleDownloadCSV = (dataset: DatasetItem) => {
    const blob = new Blob([dataset.downloadData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', dataset.filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(dataset.id);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const filteredRows = currentDataset.previewRows.filter((row) => {
    if (!searchTerm) return true;
    return Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Overview Stats Bar - Key Congolese Macro Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Taux Indicatif BCC</span>
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono tabular-nums">
            2 912,0 <span className="text-xs text-slate-400 font-sans">CDF/USD</span>
          </div>
          <span className="text-[11px] text-amber-400 mt-1">Spread parallèle : +3,43%</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Réserves Officielles</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono tabular-nums">
            5 530,0 <span className="text-xs text-slate-400 font-sans">M$ USD</span>
          </div>
          <span className="text-[11px] text-emerald-400 mt-1">13,7 semaines d'importations</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Taux Dollarisation</span>
            <Layers className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono tabular-nums">
            86,1 <span className="text-xs text-slate-400 font-sans">%</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1">Dépôts bancaires en devises</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Cuivre LME (Spot)</span>
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono tabular-nums">
            9 020,0 <span className="text-xs text-slate-400 font-sans">USD/tonne</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1">Recettes fiscales : 326,5 M$</span>
        </div>
      </div>

      {/* Dataset Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {datasets.map((dataset) => {
          const isSelected = dataset.id === selectedDatasetId;

          return (
            <button
              key={dataset.id}
              onClick={() => {
                setSelectedDatasetId(dataset.id);
                setSearchTerm('');
              }}
              className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/90 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/40 hover:border-slate-700'
              }`}
            >
              <div>
                <span className="text-[11px] text-amber-400 font-medium block mb-1">
                  {dataset.frequency}
                </span>
                <h3 className="text-sm font-semibold text-white line-clamp-2">
                  {dataset.name}
                </h3>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-2 border-t border-slate-800">
                <span className="font-mono">{dataset.recordCount} lignes</span>
                <span className="text-[11px] text-slate-400">CSV</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Selected Dataset Table & Actions */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 flex flex-col overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white">{currentDataset.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{currentDataset.description}</p>
            <span className="text-[11px] text-slate-400 italic">Source : {currentDataset.source}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filtrer les données..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              onClick={() => handleDownloadCSV(currentDataset)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
            >
              {downloadSuccess === currentDataset.id ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Téléchargé !</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Exporter CSV</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="sticky top-0 bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                {currentDataset.headers.map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">
                    {h.replace(/_/g, ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  {currentDataset.headers.map((h) => {
                    const val = row[h];
                    const isNumber = typeof val === 'number';
                    return (
                      <td key={h} className="px-4 py-2.5 tabular-nums">
                        {isNumber ? val.toLocaleString('fr-FR') : (val ?? '-')}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-950/40 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Affichage de {filteredRows.length} lignes sur {currentDataset.recordCount} enregistrements</span>
          <span className="font-mono text-[11px]">Format standard BCC · UTF-8 Comma Delimited</span>
        </div>
      </div>
    </div>
  );
};
