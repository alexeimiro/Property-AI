
import { useState } from "react";
import { Property, PropertyFilter } from "@/types";
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
import { BadgeDollarSign, ArrowDownUp, Menu, Grid, Map, BarChart3, PieChart } from "lucide-react";

const Index = () => {
  // State for properties and filters
  const [properties] = useState<Property[]>(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("grid");
  const [sortOption, setSortOption] = useState("investmentScore");
  
  // Initial filter state
  const [filters, setFilters] = useState<PropertyFilter>({
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
  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setIsDetailsModalOpen(true);
  };
  
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };
  
  const handleFilterChange = (newFilters: PropertyFilter) => {
    setFilters(newFilters);
    setIsSidebarOpen(false);
  };
  
  const handleSortChange = (value: string) => {
    setSortOption(value);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Calculate dashboard stats
  const dashboardStats = getDashboardStats();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Distressed Property Investment Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover high-potential distressed property investments from multiple sources
            </p>
          </div>
          
          <div className="mb-8">
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
            <div className="flex-1 md:pl-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="md:hidden mr-2"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <Menu className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <h2 className="font-semibold">
                    {filteredProperties.length} Properties
                  </h2>
                </div>
                
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <div className="flex items-center space-x-1">
                    <select
                      className="bg-white dark:bg-gray-800 text-sm rounded-md border border-gray-200 dark:border-gray-700 px-3 py-1.5"
                      value={sortOption}
                      onChange={(e) => handleSortChange(e.target.value)}
                    >
                      <option value="investmentScore">Best Investment</option>
                      <option value="priceAsc">Price (Low to High)</option>
                      <option value="priceDesc">Price (High to Low)</option>
                      <option value="discountDesc">Highest Discount</option>
                      <option value="capRate">Highest Cap Rate</option>
                      <option value="newest">Newest</option>
                    </select>
                    <ArrowDownUp className="h-4 w-4 text-gray-500" />
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full sm:w-auto">
                    <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <TabsTrigger value="grid" className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700">
                        <Grid className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="map" className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700">
                        <Map className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700">
                        <BarChart3 className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              
              <TabsContent value="grid" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProperties.map((property) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                  
                  {sortedProperties.length === 0 && (
                    <div className="col-span-full p-8 text-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <BadgeDollarSign className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No properties found</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Try adjusting your filters to see more results
                      </p>
                      <Button 
                        variant="outline" 
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
              
              <TabsContent value="map" className="mt-0">
                <PropertyMap 
                  properties={sortedProperties} 
                  onSelectProperty={handleViewDetails}
                />
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium mb-4">Investment Analytics Dashboard</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    In a full implementation, this view would show charts and analytics about the current property market, 
                    including price trends, distressed property availability by location, and investment opportunity metrics.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-48 flex items-center justify-center">
                      <BarChart3 className="h-16 w-16 text-gray-400" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-48 flex items-center justify-center">
                      <PieChart className="h-16 w-16 text-gray-400" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </div>
      </main>
      
      <PropertyDetailsModal 
        property={selectedProperty} 
        isOpen={isDetailsModalOpen} 
        onClose={handleCloseDetailsModal}
      />
    </div>
  );
};

export default Index;
