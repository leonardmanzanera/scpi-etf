import { InvestmentParams, InvestmentResult, YearlyData } from '../types';

export const calculateInvestmentReturns = (
  params: InvestmentParams,
  assetType: 'scpi' | 'etf' | 'livretA'
): InvestmentResult => {
  const {
    initialAmount,
    monthlyPayment,
    duration,
    scpiRate,
    etfRate,
    managementFees,
    entryFees,
    taxRate,
    socialTaxRate,
    reinvestDividends,
    inflationRate,
    scenario
  } = params;

  // Adjust rates based on scenario
  const scenarioMultipliers = {
    optimiste: 1.2,
    neutre: 1.0,
    pessimiste: 0.7
  };

  let baseRate = assetType === 'scpi' ? scpiRate : assetType === 'etf' ? etfRate : 2.0; // Livret A
  if (assetType !== 'livretA') {
    baseRate *= scenarioMultipliers[scenario];
  }

  const annualRate = baseRate / 100;
  const monthlyRate = annualRate / 12;
  const totalTaxRate = (taxRate + socialTaxRate) / 100;

  let capital = initialAmount * (1 - entryFees / 100);
  let totalDividends = 0;
  let totalFees = initialAmount * entryFees / 100;
  let totalTax = 0;
  const yearlyData: YearlyData[] = [];

  for (let year = 1; year <= duration; year++) {
    let yearlyDividends = 0;
    let yearlyFees = 0;
    let yearlyTax = 0;

    for (let month = 1; month <= 12; month++) {
      // Add monthly payment
      if (monthlyPayment > 0) {
        capital += monthlyPayment * (1 - entryFees / 100);
        yearlyFees += monthlyPayment * entryFees / 100;
      }

      // Calculate monthly returns
      const monthlyDividend = capital * monthlyRate;
      const monthlyManagementFee = capital * (managementFees / 100) / 12;
      const monthlyTaxOnDividend = monthlyDividend * totalTaxRate;

      yearlyDividends += monthlyDividend;
      yearlyFees += monthlyManagementFee;
      yearlyTax += monthlyTaxOnDividend;

      if (reinvestDividends && assetType !== 'livretA') {
        capital += monthlyDividend - monthlyTaxOnDividend - monthlyManagementFee;
      } else {
        capital -= monthlyManagementFee;
      }
    }

    totalDividends += yearlyDividends;
    totalFees += yearlyFees;
    totalTax += yearlyTax;

    yearlyData.push({
      year,
      capital,
      dividends: yearlyDividends,
      fees: yearlyFees,
      tax: yearlyTax,
      netCapital: capital + (reinvestDividends ? 0 : yearlyDividends - yearlyTax)
    });
  }

  const finalCapital = capital;
  const netFinalCapital = finalCapital + (reinvestDividends ? 0 : totalDividends - totalTax);
  const totalInvestment = initialAmount + (monthlyPayment * 12 * duration);
  const annualReturn = ((netFinalCapital / totalInvestment) ** (1 / duration) - 1) * 100;

  // Calculate TRI (Internal Rate of Return)
  const tri = calculateTRI(totalInvestment, netFinalCapital, duration);
  
  // Calculate NPV (Net Present Value)
  const npv = netFinalCapital - totalInvestment * Math.pow(1 + inflationRate / 100, duration);

  return {
    finalCapital,
    totalDividends,
    totalFees,
    totalTax,
    netFinalCapital,
    annualReturn,
    tri,
    npv,
    yearlyData
  };
};

const calculateTRI = (investment: number, finalValue: number, years: number): number => {
  if (investment <= 0 || finalValue <= 0 || years <= 0) return 0;
  return ((finalValue / investment) ** (1 / years) - 1) * 100;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPercentage = (percentage: number): string => {
  return `${percentage.toFixed(2)}%`;
};