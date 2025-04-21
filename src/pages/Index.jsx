import { useState } from "react";
import { Header } from "@/components/Header";
import { DashboardStats } from "@/components/DashboardStats";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyDetailsModal } from "@/components/PropertyDetailsModal";
import { FilterSidebar } from "@/components/FilterSidebar";
import { PropertyMap } from "@/components/PropertyMap";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { mockProperties, getDashboardStats } from "@/data/mockProperties";
import { BadgeDollarSign, ArrowDownUp, Menu, Grid, Map, BarChart3, PieChart, Filter } from "lucide-react";

const Index = () => {
  // State for properties and filters
  const [properties] = useState(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("grid");
  const [sortOption, setSortOption] = useState("investmentScore");
  
  // Initial filter state
  const [filters, setFilters] = useState({
    priceRange: [0, 2000000],
    location: [],
    propertyType: [],
    distressType: [],
    bedrooms: [],
    bathrooms: [],
    investmentScoreMin: 0,
    capRateMin: 0
  });
  
  // Filter properties based on selected filters
  const filteredProperties = properties.filter(property => {
    // Price range filter
    if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
      return false;
    }
    
    // Location filter
    if (filters.location.length > 0 && !filters.location.includes(`${property.city}, ${property.state}`)) {
      return false;
    }
    
    // Property type filter
    if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.propertyType)) {
      return false;
    }
    
    // Distress type filter
    if (filters.distressType.length > 0 && !filters.distressType.includes(property.distressType)) {
      return false;
    }
    
    // Bedrooms filter
    if (filters.bedrooms.length > 0 && !filters.bedrooms.includes(property.bedrooms)) {
      return false;
    }
    
    // Bathrooms filter
    if (filters.bathrooms.length > 0 && !filters.bathrooms.includes(property.bathrooms)) {
      return false;
    }
    
    // Investment score filter
    if (property.investmentScore < filters.investmentScoreMin) {
      return false;
    }
    
    // Cap rate filter
    if (property.capRate < filters.capRateMin) {
      return false;
    }
    
    return true;
  });
  
  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortOption) {
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      case "discountDesc":
        return b.discountPercentage - a.discountPercentage;
      case "investmentScore":
        return b.investmentScore - a.investmentScore;
      case "capRate":
        return b.capRate - a.capRate;
      case "newest":
        return new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime();
      default:
        return 0;
    }
  });
  
  // Handlers
  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setIsDetailsModalOpen(true);
  };
  
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setIsSidebarOpen(false);
  };
  
  const handleSortChange = (value) => {
    setSortOption(value);
  };
  
  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  
  // Calculate dashboard stats
  const dashboardStatsData = getDashboardStats();
  
  // Transform for the new DashboardStats component format
  const dashboardStats = [
    {
      title: "Total Properties",
      value: dashboardStatsData.totalProperties,
      change: {
        value: "+5% this week",
        positive: true
      },
      icon: "home"
    },
    {
      title: "Average Discount",
      value: `${dashboardStatsData.averageDiscount.toFixed(1)}%`,
      change: {
        value: "+2.5% vs market",
        positive: true
      },
      icon: "discount"
    },
    {
      title: "Investment Score",
      value: dashboardStatsData.averageInvestmentScore.toFixed(1),
      change: {
        value: "+1.2 pts",
        positive: true
      },
      icon: "trend"
    },
    {
      title: "New Today",
      value: dashboardStatsData.newListingsToday,
      change: {
        value: "-3 from yesterday",
        positive: false
      },
      icon: "dollar"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 mobile-overflow-fix">
      <Header />
      
      <main className="flex-1 pb-16 md:pb-0">
        <div className="container mx-auto py-3 sm:py-6">
          <div className="mb-3 sm:mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Distressed Property Investment</h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Discover high-potential distressed property investments
            </p>
          </div>
          
          <div className="mb-4 sm:mb-8 overflow-visible">
            <DashboardStats stats={dashboardStats} />
          </div>
          
          <div className="flex flex-col md:flex-row">
            {/* Sidebar for filters */}
            <FilterSidebar 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              isOpen={isSidebarOpen}
              onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            
            {/* Main content area */}
            <div className="flex-1 md:pl-6 w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="md:hidden mr-2 mobile-touch-target"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <Menu className="h-4 w-4 mr-1" />
                    <span className="text-xs">Filters</span>
                  </Button>
                  <h2 className="font-semibold text-xs sm:text-sm">
                    {filteredProperties.length} Properties
                  </h2>
                </div>
                
                <div className="flex items-center space-x-1 sm:space-x-2 w-full sm:w-auto">
                  <div className="flex items-center">
                    <select
                      className="bg-white dark:bg-gray-800 text-xs rounded-md border border-gray-200 dark:border-gray-700 px-2 py-1.5 mobile-input w-full sm:w-auto"
                      value={sortOption}
                      onChange={(e) => handleSortChange(e.target.value)}
                    >
                      <option value="investmentScore">Best Investment</option>
                      <option value="priceAsc">Price (Low-High)</option>
                      <option value="priceDesc">Price (High-Low)</option>
                      <option value="discountDesc">Highest Discount</option>
                      <option value="capRate">Highest Cap Rate</option>
                      <option value="newest">Newest</option>
                    </select>
                    <ArrowDownUp className="hidden sm:block h-4 w-4 text-gray-500 ml-1" />
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={handleTabChange} className="hidden sm:block w-auto">
                    <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <TabsTrigger value="grid" className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 mobile-touch-target p-1 sm:p-2">
                        <Grid className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="map" className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 mobile-touch-target p-1 sm:p-2">
                        <Map className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 mobile-touch-target p-1 sm:p-2">
                        <BarChart3 className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              
              <div className="mt-2">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsContent value="grid">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                      {sortedProperties.map((property) => (
                        <PropertyCard 
                          key={property.id} 
                          property={property} 
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                      
                      {sortedProperties.length === 0 && (
                        <div className="col-span-full p-4 sm:p-8 text-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <BadgeDollarSign className="mx-auto h-8 sm:h-12 w-8 sm:w-12 text-gray-400 mb-3 sm:mb-4" />
                          <h3 className="text-base sm:text-lg font-medium mb-2">No properties found</h3>
                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                            Try adjusting your filters to see more results
                          </p>
                          <Button 
                            variant="outline" 
                            className="mobile-touch-target"
                            onClick={() => handleFilterChange({
                              priceRange: [0, 2000000],
                              location: [],
                              propertyType: [],
                              distressType: [],
                              bedrooms: [],
                              bathrooms: [],
                              investmentScoreMin: 0,
                              capRateMin: 0
                            })}
                          >
                            Reset Filters
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="map">
                    <div className="h-[70vh] sm:h-[600px]">
                      <PropertyMap 
                        properties={sortedProperties} 
                        onSelectProperty={handleViewDetails}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="analytics">
                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Investment Analytics</h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                        In a full implementation, this view would show charts and analytics about the property market.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 sm:p-4 h-36 sm:h-48 flex items-center justify-center">
                          <BarChart3 className="h-10 sm:h-16 w-10 sm:w-16 text-gray-400" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 sm:p-4 h-36 sm:h-48 flex items-center justify-center">
                          <PieChart className="h-10 sm:h-16 w-10 sm:w-16 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden mobile-nav">
        <button className={`flex flex-col items-center ${activeTab === 'grid' ? 'text-primary' : 'text-muted-foreground'}`} onClick={() => handleTabChange('grid')}>
          <Grid className="h-5 w-5 mb-1" />
          <span className="text-xs">List</span>
        </button>
        <button className={`flex flex-col items-center ${activeTab === 'map' ? 'text-primary' : 'text-muted-foreground'}`} onClick={() => handleTabChange('map')}>
          <Map className="h-5 w-5 mb-1" />
          <span className="text-xs">Map</span>
        </button>
        <button className={`flex flex-col items-center ${activeTab === 'analytics' ? 'text-primary' : 'text-muted-foreground'}`} onClick={() => handleTabChange('analytics')}>
          <BarChart3 className="h-5 w-5 mb-1" />
          <span className="text-xs">Stats</span>
        </button>
        <button className={`flex flex-col items-center ${isSidebarOpen ? 'text-primary' : 'text-muted-foreground'}`} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Filter className="h-5 w-5 mb-1" />
          <span className="text-xs">Filter</span>
        </button>
      </div>

      {/* Details Modal */}
      <PropertyDetailsModal 
        property={selectedProperty}
        isOpen={isDetailsModalOpen} 
        onClose={handleCloseDetailsModal}
      />
    </div>
  );
};

export default Index;

