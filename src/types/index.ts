
export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  propertyType: string;
  distressType: 'foreclosure' | 'short-sale' | 'reo' | 'probate' | 'auction' | 'other';
  description: string;
  images: string[];
  source: string;
  listedDate: string;
  latitude: number;
  longitude: number;
  investmentScore: number;
  capRate: number;
  estimatedRent: number;
  estimatedRoi: number;
  repairEstimate: number;
  afterRepairValue: number;
}

export interface PropertyFilter {
  priceRange: [number, number];
  location: string[];
  propertyType: string[];
  distressType: string[];
  bedrooms: number[];
  bathrooms: number[];
  investmentScoreMin: number;
  capRateMin: number;
}

export interface DashboardStats {
  totalProperties: number;
  averageDiscount: number;
  averageInvestmentScore: number;
  newListingsToday: number;
  topMarkets: { name: string; count: number }[];
}
