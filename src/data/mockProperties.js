export const mockProperties = [
  {
    id: "prop-001",
    title: "Distressed Colonial in Historic District",
    address: "123 Maple Street",
    city: "Boston",
    state: "MA",
    zip: "02108",
    price: 420000,
    originalPrice: 550000,
    discountPercentage: 23.6,
    sqft: 2400,
    bedrooms: 4,
    bathrooms: 2.5,
    yearBuilt: 1920,
    propertyType: "Single Family",
    distressType: "foreclosure",
    description: "Historic colonial home in need of renovation. Original woodwork and craftsmanship throughout. Property is being sold as-is through bank foreclosure.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    source: "Bank of America REO",
    listedDate: "2025-03-15",
    latitude: 42.3601,
    longitude: -71.0589,
    investmentScore: 83,
    capRate: 7.2,
    estimatedRent: 3600,
    estimatedRoi: 14.5,
    repairEstimate: 80000,
    afterRepairValue: 620000
  },
  {
    id: "prop-002",
    title: "Short Sale Opportunity - Luxury Condo",
    address: "456 Ocean Drive, Unit 702",
    city: "Miami",
    state: "FL",
    zip: "33139",
    price: 590000,
    originalPrice: 780000,
    discountPercentage: 24.4,
    sqft: 1800,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2005,
    propertyType: "Condo",
    distressType: "short-sale",
    description: "Ocean view luxury condo available as short sale. Building includes pool, gym, and 24-hour security. Motivated seller, priced below market value.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    source: "Miami MLS",
    listedDate: "2025-03-28",
    latitude: 25.7617,
    longitude: -80.1918,
    investmentScore: 76,
    capRate: 5.8,
    estimatedRent: 3800,
    estimatedRoi: 12.8,
    repairEstimate: 30000,
    afterRepairValue: 750000
  },
  {
    id: "prop-003",
    title: "Bank-Owned Multi-Family Investment",
    address: "789 Washington Avenue",
    city: "Chicago",
    state: "IL",
    zip: "60607",
    price: 675000,
    originalPrice: 890000,
    discountPercentage: 24.2,
    sqft: 4200,
    bedrooms: 6,
    bathrooms: 4,
    yearBuilt: 1965,
    propertyType: "Multi-Family",
    distressType: "reo",
    description: "Three-unit multi-family building being sold by bank. Each unit has 2BR/1.5BA. Strong rental history and below market acquisition price.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    source: "Chase Bank REO",
    listedDate: "2025-04-02",
    latitude: 41.8781,
    longitude: -87.6298,
    investmentScore: 91,
    capRate: 8.4,
    estimatedRent: 6500,
    estimatedRoi: 18.2,
    repairEstimate: 120000,
    afterRepairValue: 950000
  },
  {
    id: "prop-004",
    title: "Probate Sale - Mid-Century Ranch",
    address: "321 Highland Drive",
    city: "Austin",
    state: "TX",
    zip: "78731",
    price: 380000,
    originalPrice: 450000,
    discountPercentage: 15.6,
    sqft: 1950,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 1962,
    propertyType: "Single Family",
    distressType: "probate",
    description: "Mid-century ranch home available through probate sale. Property features original hardwood floors, large lot, and excellent location in growing market.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    source: "Travis County Probate",
    listedDate: "2025-04-05",
    latitude: 30.2672,
    longitude: -97.7431,
    investmentScore: 79,
    capRate: 6.5,
    estimatedRent: 2800,
    estimatedRoi: 13.7,
    repairEstimate: 60000,
    afterRepairValue: 520000
  },
  {
    id: "prop-005",
    title: "Auction Property - Commercial Retail",
    address: "555 Main Street",
    city: "Phoenix",
    state: "AZ",
    zip: "85004",
    price: 820000,
    originalPrice: 1100000,
    discountPercentage: 25.5,
    sqft: 5500,
    bedrooms: 0,
    bathrooms: 2,
    yearBuilt: 1998,
    propertyType: "Commercial",
    distressType: "auction",
    description: "Corner retail property available at auction. Currently leased to established tenant with 3 years remaining on lease. Excellent investment opportunity.",
    images: ["/placeholder.svg"],
    source: "Arizona Property Auctions",
    listedDate: "2025-04-10",
    latitude: 33.4484,
    longitude: -112.0740,
    investmentScore: 87,
    capRate: 9.1,
    estimatedRent: 8200,
    estimatedRoi: 16.9,
    repairEstimate: 70000,
    afterRepairValue: 1200000
  },
  {
    id: "prop-006",
    title: "Distressed Apartment Complex",
    address: "888 River Road",
    city: "Atlanta",
    state: "GA",
    zip: "30309",
    price: 1250000,
    originalPrice: 1650000,
    discountPercentage: 24.2,
    sqft: 12000,
    bedrooms: 12,
    bathrooms: 8,
    yearBuilt: 1985,
    propertyType: "Multi-Family",
    distressType: "foreclosure",
    description: "12-unit apartment complex in foreclosure. Needs significant renovation but located in rapidly appreciating neighborhood. Excellent opportunity for value-add investors.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    source: "Fannie Mae HomePath",
    listedDate: "2025-04-12",
    latitude: 33.7490,
    longitude: -84.3880,
    investmentScore: 94,
    capRate: 10.2,
    estimatedRent: 14400,
    estimatedRoi: 22.5,
    repairEstimate: 350000,
    afterRepairValue: 2100000
  }
];

// Calculate dashboard stats from properties
export const getDashboardStats = () => {
  const totalProperties = mockProperties.length;
  
  // Calculate average discount
  const totalDiscount = mockProperties.reduce((acc, prop) => acc + prop.discountPercentage, 0);
  const averageDiscount = totalDiscount / totalProperties;
  
  // Calculate average investment score
  const totalScore = mockProperties.reduce((acc, prop) => acc + prop.investmentScore, 0);
  const averageInvestmentScore = totalScore / totalProperties;
  
  // Count properties listed today (or in this mock case, recent ones)
  const newListingsToday = 3;
  
  // Get top markets
  const marketCounts = {};
  mockProperties.forEach(prop => {
    const market = prop.city;
    marketCounts[market] = (marketCounts[market] || 0) + 1;
  });
  
  const topMarkets = Object.entries(marketCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  return {
    totalProperties,
    averageDiscount,
    averageInvestmentScore,
    newListingsToday,
    topMarkets
  };
};

