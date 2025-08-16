import React from 'react';
import { ComparisonResult } from '../types';
import { formatCurrency, formatPercentage } from '../utils/calculations';
import { TrendingUp, DollarSign, PieChart, Target } from 'lucide-react';

interface ResultsDisplayProps {
  results: ComparisonResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const { scpi, etf, livretA } = results;

  const KPICard = ({ 
    title, 
    scpiValue, 
    etfValue, 
    livretAValue, 
    icon: Icon, 
    isPercentage = false, 
    isCurrency = false 
  }: {
    title: string;
    scpiValue: number;
    etfValue: number;
    livretAValue: number;
    icon: any;
    isPercentage?: boolean;
    isCurrency?: boolean;
  }) => {
    const formatValue = (value: number) => {
      if (isPercentage) return formatPercentage(value);
      if (isCurrency) return formatCurrency(value);
      return value.toLocaleString('fr-FR');
    };

    const getBestPerformer = () => {
      const values = [
        { name: 'SCPI', value: scpiValue },
        { name: 'ETF', value: etfValue },
        { name: 'Livret A', value: livretAValue }
      ];
      return values.sort((a, b) => b.value - a.value)[0].name;
    };

    const best = getBestPerformer();

    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon className="text-blue-600 dark:text-blue-400" size={20} />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h3>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Meilleur: {best}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className={`flex justify-between items-center p-3 rounded-lg ${
            best === 'SCPI' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-slate-50 dark:bg-slate-700/50'
          }`}>
            <span className="font-medium text-slate-700 dark:text-slate-300">SCPI</span>
            <span className={`font-bold ${
              best === 'SCPI' ? 'text-green-700 dark:text-green-400' : 'text-slate-900 dark:text-white'
            }`}>
              {formatValue(scpiValue)}
            </span>
          </div>
          
          <div className={`flex justify-between items-center p-3 rounded-lg ${
            best === 'ETF' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-slate-50 dark:bg-slate-700/50'
          }`}>
            <span className="font-medium text-slate-700 dark:text-slate-300">ETF</span>
            <span className={`font-bold ${
              best === 'ETF' ? 'text-green-700 dark:text-green-400' : 'text-slate-900 dark:text-white'
            }`}>
              {formatValue(etfValue)}
            </span>
          </div>
          
          <div className={`flex justify-between items-center p-3 rounded-lg ${
            best === 'Livret A' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-slate-50 dark:bg-slate-700/50'
          }`}>
            <span className="font-medium text-slate-700 dark:text-slate-300">Livret A</span>
            <span className={`font-bold ${
              best === 'Livret A' ? 'text-green-700 dark:text-green-400' : 'text-slate-900 dark:text-white'
            }`}>
              {formatValue(livretAValue)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center">
          <Target className="mr-2 text-amber-600" size={24} />
          Résultats de la Simulation
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <KPICard
          title="Capital Final Net"
          scpiValue={scpi.netFinalCapital}
          etfValue={etf.netFinalCapital}
          livretAValue={livretA.netFinalCapital}
          icon={DollarSign}
          isCurrency
        />

        <KPICard
          title="TRI (Taux de Rendement Interne)"
          scpiValue={scpi.tri}
          etfValue={etf.tri}
          livretAValue={livretA.tri}
          icon={TrendingUp}
          isPercentage
        />

        <KPICard
          title="Rendement Annuel Moyen"
          scpiValue={scpi.annualReturn}
          etfValue={etf.annualReturn}
          livretAValue={livretA.annualReturn}
          icon={PieChart}
          isPercentage
        />

        <KPICard
          title="Total Dividendes"
          scpiValue={scpi.totalDividends}
          etfValue={etf.totalDividends}
          livretAValue={livretA.totalDividends}
          icon={DollarSign}
          isCurrency
        />

        <KPICard
          title="Total Frais"
          scpiValue={scpi.totalFees}
          etfValue={etf.totalFees}
          livretAValue={livretA.totalFees}
          icon={DollarSign}
          isCurrency
        />

        <KPICard
          title="Impact Fiscal Total"
          scpiValue={scpi.totalTax}
          etfValue={etf.totalTax}
          livretAValue={livretA.totalTax}
          icon={DollarSign}
          isCurrency
        />
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-6 border border-blue-200 dark:border-slate-600">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
          Résumé de Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(scpi.netFinalCapital - etf.netFinalCapital)}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Différence SCPI vs ETF
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {formatPercentage(Math.abs(scpi.tri - etf.tri))}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Écart TRI
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {scpi.netFinalCapital > etf.netFinalCapital ? 'SCPI' : 'ETF'}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Meilleur Investissement
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};