import React from 'react';
import { ComparisonResult } from '../types';
import { formatCurrency, formatPercentage } from '../utils/calculations';
import { Download, FileText, Save } from 'lucide-react';
import jsPDF from 'jspdf';

interface ExportControlsProps {
  results: ComparisonResult;
  params: any;
}

export const ExportControls: React.FC<ExportControlsProps> = ({ results, params }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(30, 41, 59);
    doc.text('CapitalVision - Rapport de Simulation', 20, 30);
    
    // Parameters section
    doc.setFontSize(14);
    doc.text('Paramètres de Simulation', 20, 50);
    doc.setFontSize(10);
    doc.text(`Montant initial: ${formatCurrency(params.initialAmount)}`, 20, 65);
    doc.text(`Versement mensuel: ${formatCurrency(params.monthlyPayment)}`, 20, 75);
    doc.text(`Durée: ${params.duration} années`, 20, 85);
    doc.text(`Scénario: ${params.scenario}`, 20, 95);
    
    // Results section
    doc.setFontSize(14);
    doc.text('Résultats de Comparaison', 20, 120);
    
    // SCPI Results
    doc.setFontSize(12);
    doc.text('SCPI:', 20, 140);
    doc.setFontSize(10);
    doc.text(`Capital final net: ${formatCurrency(results.scpi.netFinalCapital)}`, 25, 150);
    doc.text(`TRI: ${formatPercentage(results.scpi.tri)}`, 25, 160);
    doc.text(`Rendement annuel: ${formatPercentage(results.scpi.annualReturn)}`, 25, 170);
    doc.text(`Total dividendes: ${formatCurrency(results.scpi.totalDividends)}`, 25, 180);
    
    // ETF Results
    doc.setFontSize(12);
    doc.text('ETF:', 20, 200);
    doc.setFontSize(10);
    doc.text(`Capital final net: ${formatCurrency(results.etf.netFinalCapital)}`, 25, 210);
    doc.text(`TRI: ${formatPercentage(results.etf.tri)}`, 25, 220);
    doc.text(`Rendement annuel: ${formatPercentage(results.etf.annualReturn)}`, 25, 230);
    doc.text(`Total dividendes: ${formatCurrency(results.etf.totalDividends)}`, 25, 240);
    
    // Conclusion
    const better = results.scpi.netFinalCapital > results.etf.netFinalCapital ? 'SCPI' : 'ETF';
    const difference = Math.abs(results.scpi.netFinalCapital - results.etf.netFinalCapital);
    
    doc.setFontSize(12);
    doc.text('Conclusion:', 20, 260);
    doc.setFontSize(10);
    doc.text(`Meilleur investissement: ${better}`, 25, 270);
    doc.text(`Différence de capital: ${formatCurrency(difference)}`, 25, 280);
    
    doc.save('capitalvision-simulation.pdf');
  };

  const saveSimulation = () => {
    const simulationData = {
      params,
      results,
      timestamp: new Date().toISOString(),
    };
    
    const savedSimulations = JSON.parse(localStorage.getItem('capitalvision-simulations') || '[]');
    savedSimulations.push(simulationData);
    localStorage.setItem('capitalvision-simulations', JSON.stringify(savedSimulations));
    
    alert('Simulation sauvegardée avec succès !');
  };

  const exportToCSV = () => {
    const csvData = [
      ['Année', 'SCPI Capital', 'ETF Capital', 'SCPI Dividendes', 'ETF Dividendes'],
      ...results.scpi.yearlyData.map((scpiYear, index) => [
        scpiYear.year,
        scpiYear.netCapital,
        results.etf.yearlyData[index].netCapital,
        scpiYear.dividends,
        results.etf.yearlyData[index].dividends
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'capitalvision-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
        <Download className="mr-2 text-blue-600 dark:text-blue-400" size={20} />
        Exporter & Sauvegarder
      </h3>
      
      <div className="flex flex-wrap gap-4">
        <button
          onClick={exportToPDF}
          className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <FileText className="mr-2" size={16} />
          Exporter PDF
        </button>
        
        <button
          onClick={exportToCSV}
          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <Download className="mr-2" size={16} />
          Exporter CSV
        </button>
        
        <button
          onClick={saveSimulation}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <Save className="mr-2" size={16} />
          Sauvegarder
        </button>
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
        Exportez vos résultats en PDF pour vos clients ou sauvegardez vos simulations pour les comparer ultérieurement.
      </p>
    </div>
  );
};