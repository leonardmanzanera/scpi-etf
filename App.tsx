import React, { useState, useEffect } from 'react';
import { InvestmentParams, ComparisonResult } from './types';
import { calculateInvestmentReturns } from './utils/calculations';
import { ParametersForm } from './components/ParametersForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ChartsDisplay } from './components/ChartsDisplay';
import { ExportControls } from './components/ExportControls';
import { useDarkMode } from './hooks/useDarkMode';
import { Moon, Sun, TrendingUp, Calculator } from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useDarkMode();
  const [params, setParams] = useState<InvestmentParams>({
    initialAmount: 10000,
    monthlyPayment: 500,
    duration: 10,
    scpiRate: 4.5,
    etfRate: 7.0,
    managementFees: 1.5,
    entryFees: 5.0,
    taxRate: 30.0,
    socialTaxRate: 17.2,
    reinvestDividends: true,
    inflationRate: 2.0,
    scenario: 'neutre'
  });

  const [results, setResults] = useState<ComparisonResult | null>(null);

  useEffect(() => {
    const scpiResult = calculateInvestmentReturns(params, 'scpi');
    const etfResult = calculateInvestmentReturns(params, 'etf');
    const livretAResult = calculateInvestmentReturns(params, 'livretA');

    setResults({
      scpi: scpiResult,
      etf: etfResult,
      livretA: livretAResult
    });
  }, [params]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                  CapitalVision
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Comparaison SCPI vs ETF
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
            >
              {isDark ? <Sun className="text-yellow-500" size={20} /> : <Moon className="text-slate-600" size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Parameters Form */}
          <ParametersForm params={params} setParams={setParams} />
          
          {/* Results */}
          {results && (
            <>
              <ResultsDisplay results={results} />
              <ChartsDisplay results={results} />
              <ExportControls results={results} params={params} />
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Calculator className="text-blue-600 dark:text-blue-400" size={20} />
              <span className="text-lg font-semibold text-slate-800 dark:text-white">
                CapitalVision
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Outil professionnel de comparaison d'investissements pour investisseurs particuliers et conseillers en gestion de patrimoine.
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-xs mt-2">
              Les simulations présentées sont basées sur des hypothèses et ne constituent pas des conseils financiers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;