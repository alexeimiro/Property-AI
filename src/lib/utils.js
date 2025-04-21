import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(number, decimals = 0) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number);
}

export function calculateROI(
  purchasePrice, 
  repairCosts, 
  monthlyRent, 
  expenseRatio = 0.4,
  downPaymentPercentage = 0.25
) {
  const totalInvestment = purchasePrice * downPaymentPercentage + repairCosts;
  const annualRent = monthlyRent * 12;
  const annualExpenses = annualRent * expenseRatio;
  const annualNetIncome = annualRent - annualExpenses;
  
  return (annualNetIncome / totalInvestment) * 100;
}

export function calculateCapRate(
  purchasePrice, 
  monthlyRent, 
  expenseRatio = 0.4
) {
  const annualRent = monthlyRent * 12;
  const annualExpenses = annualRent * expenseRatio;
  const annualNetIncome = annualRent - annualExpenses;
  
  return (annualNetIncome / purchasePrice) * 100;
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

