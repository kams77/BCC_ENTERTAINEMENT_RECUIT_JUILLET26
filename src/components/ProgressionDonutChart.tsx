import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Code2, BookOpen, CheckCircle } from 'lucide-react';

interface ProgressionDonutChartProps {
  completedExercisesCount: number;
  totalExercisesCount: number;
  completedModulesCount: number;
  totalModulesCount: number;
}

export const ProgressionDonutChart: React.FC<ProgressionDonutChartProps> = ({
  completedExercisesCount,
  totalExercisesCount,
  completedModulesCount,
  totalModulesCount,
}) => {
  const totalValidated = completedExercisesCount + completedModulesCount;
  const totalPossible = totalExercisesCount + totalModulesCount; // 6 + 6 = 12
  const remainingCount = Math.max(0, totalPossible - totalValidated);
  const globalPercentage = Math.round((totalValidated / (totalPossible || 1)) * 100);

  // If nothing is completed yet, show a baseline empty ring segment
  const isZeroState = totalValidated === 0;

  const chartData = isZeroState
    ? [
        { name: 'En attente de démarrage', value: 12, color: '#334155' }
      ]
    : [
        { name: 'Exercices Techniques Validés', value: completedExercisesCount, color: '#F59E0B' },
        { name: 'Fiches de Révision Lues', value: completedModulesCount, color: '#10B981' },
        ...(remainingCount > 0
          ? [{ name: 'Objectifs Restants', value: remainingCount, color: '#1E293B' }]
          : [])
      ].filter((item) => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 shadow-xl text-xs z-50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.payload.color }} />
            <span className="font-semibold text-white">{data.name}</span>
          </div>
          <div className="text-slate-300 font-mono pl-4">
            {data.value} {data.value > 1 ? 'objectifs' : 'objectif'} ({Math.round((data.value / totalPossible) * 100)}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex items-center gap-3.5 p-2 sm:p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/90 shrink-0">
      {/* Donut Chart Container */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={26}
              outerRadius={38}
              paddingAngle={isZeroState ? 0 : 3}
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-mono text-xs sm:text-sm font-extrabold text-white tabular-nums tracking-tight">
            {globalPercentage}%
          </span>
          <span className="text-[9px] uppercase font-bold text-slate-400 -mt-0.5">
            Prêt
          </span>
        </div>
      </div>

      {/* Legend & Breakdown */}
      <div className="flex flex-col justify-center gap-1.5 text-xs pr-1">
        <div className="flex items-center justify-between gap-3 text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <Code2 className="w-3 h-3 text-amber-400" />
            <span>Exercices :</span>
          </span>
          <span className="font-mono font-bold text-amber-400 tabular-nums">
            {completedExercisesCount}/{totalExercisesCount}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <BookOpen className="w-3 h-3 text-emerald-400" />
            <span>Fiches :</span>
          </span>
          <span className="font-mono font-bold text-emerald-400 tabular-nums">
            {completedModulesCount}/{totalModulesCount}
          </span>
        </div>

        <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[10px] text-slate-400">
          <span>Total Validé</span>
          <span className="font-mono font-semibold text-white tabular-nums">
            {totalValidated}/{totalPossible}
          </span>
        </div>
      </div>
    </div>
  );
};
