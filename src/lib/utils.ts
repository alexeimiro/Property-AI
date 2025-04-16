
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(number: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number);
}

export function calculateROI(
  purchasePrice: number, 
  repairCosts: number, 
  monthlyRent: number, 
  expenseRatio = 0.4,
  downPaymentPercentage = 0.25
): number {
  const totalInvestment = purchasePrice * downPaymentPercentage + repairCosts;
  const annualRent = monthlyRent * 12;
  const annualExpenses = annualRent * expenseRatio;
  const annualNetIncome = annualRent - annualExpenses;
  
  return (annualNetIncome / totalInvestment) * 100;
}

export function calculateCapRate(
  purchasePrice: number, 
  monthlyRent: number, 
  expenseRatio = 0.4
): number {
  const annualRent = monthlyRent * 12;
  const annualExpenses = annualRent * expenseRatio;
  const annualNetIncome = annualRent - annualExpenses;
  
  return (annualNetIncome / purchasePrice) * 100;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
