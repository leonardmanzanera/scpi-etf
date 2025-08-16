import React from 'react';
import { InvestmentParams } from '../types';
import { Calculator, TrendingUp, Shield, Percent } from 'lucide-react';

interface ParametersFormProps {
  params: InvestmentParams;
  setParams: (params: InvestmentParams) => void;
}

export const ParametersForm: React.FC<ParametersFormProps> = ({ params, setParams }) => {
  const handleChange = (field: keyof InvestmentParams, value: number | boolean | string) => {
    setParams({ ...params, [field]: value });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="text-blue-600 dark:text-blue-400" size={24} />
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Paramètres d'Investissement
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Montant et versements */}
        <div className="space-y-4">
          <h3 className="flex items-center text-lg font-medium text-slate-700 dark:text-slate-300">
            <TrendingUp className="mr-2" size={20} />
            Capital
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Montant initial (€)
            </label>
            <input
              type="number"
              value={params.initialAmount}
              onChange={(e) => handleChange('initialAmount', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Versement mensuel (€)
            </label>
            <input
              type="number"
              value={params.monthlyPayment}
              onChange={(e) => handleChange('monthlyPayment', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Durée (années)
            </label>
            <input
              type="number"
              value={params.duration}
              onChange={(e) => handleChange('duration', parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="10"
              min="1"
              max="50"
            />
          </div>
        </div>

        {/* Rendements */}
        <div className="space-y-4">
          <h3 className="flex items-center text-lg font-medium text-slate-700 dark:text-slate-300">
            <Percent className="mr-2" size={20} />
            Rendements
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Taux SCPI (% annuel)
            </label>
            <input
              type="number"
              step="0.1"
              value={params.scpiRate}
              onChange={(e) => handleChange('scpiRate', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="4.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Taux ETF (% annuel)
            </label>
            <input
              type="number"
              step="0.1"
              value={params.etfRate}
              onChange={(e) => handleChange('etfRate', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="7.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Scénario
            </label>
            <select
              value={params.scenario}
              onChange={(e) => handleChange('scenario', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="pessimiste">Pessimiste</option>
              <option value="neutre">Neutre</option>
              <option value="optimiste">Optimiste</option>
            </select>
          </div>
        </div>

        {/* Frais et fiscalité */}
        <div className="space-y-4">
          <h3 className="flex items-center text-lg font-medium text-slate-700 dark:text-slate-300">
            <Shield className="mr-2" size={20} />
            Frais & Fiscalité
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Frais d'entrée (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={params.entryFees}
              onChange={(e) => handleChange('entryFees', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="5.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Frais de gestion (% annuel)
            </label>
            <input
              type="number"
              step="0.1"
              value={params.managementFees}
              onChange={(e) => handleChange('managementFees', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="1.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Impôt sur le revenu (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={params.taxRate}
              onChange={(e) => handleChange('taxRate', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="30.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Prélèvements sociaux (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={params.socialTaxRate}
              onChange={(e) => handleChange('socialTaxRate', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="17.2"
            />
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">
            Options
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Inflation annuelle (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={params.inflationRate}
              onChange={(e) => handleChange('inflationRate', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="2.0"
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="reinvestDividends"
              checked={params.reinvestDividends}
              onChange={(e) => handleChange('reinvestDividends', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="reinvestDividends" className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Réinvestissement des dividendes
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};