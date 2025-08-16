export interface InvestmentParams {
  initialAmount: number;
  monthlyPayment: number;
  duration: number;
  scpiRate: number;
  etfRate: number;
  managementFees: number;
  entryFees: number;
  taxRate: number;
  socialTaxRate: number;
  reinvestDividends: boolean;
  inflationRate: number;
  scenario: 'optimiste' | 'neutre' | 'pessimiste';
}

export interface InvestmentResult {
  finalCapital: number;
  totalDividends: number;
  totalFees: number;
  totalTax: number;
  netFinalCapital: number;
  annualReturn: number;
  tri: number;
  npv: number;
  yearlyData: YearlyData[];
}

export interface YearlyData {
  year: number;
  capital: number;
  dividends: number;
  fees: number;
  tax: number;
  netCapital: number;
}

export interface ComparisonResult {
  scpi: InvestmentResult;
  etf: InvestmentResult;
  livretA: InvestmentResult;
}