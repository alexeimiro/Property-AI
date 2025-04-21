import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  DollarSign, 
  Building, 
  Tag, 
  Bed, 
  Bath, 
  Star, 
  MapPin,
  RefreshCw,
  Filter,
  X
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function FilterSidebar({ filters, onFilterChange, isOpen, onToggle }) {
  // Local state to track filters before submitting
  const [localFilters, setLocalFilters] = useState(filters);
  
  const handlePriceChange = (value) => {
    setLocalFilters({
      ...localFilters,
      priceRange: [value[0], value[1]]
    });
  };
  
  const handleLocationChange = (location, checked) => {
    setLocalFilters({
      ...localFilters,
      location: checked 
        ? [...localFilters.location, location]
        : localFilters.location.filter(loc => loc !== location)
    });
  };
  
  const handlePropertyTypeChange = (type, checked) => {
    setLocalFilters({
      ...localFilters,
      propertyType: checked 
        ? [...localFilters.propertyType, type]
        : localFilters.propertyType.filter(t => t !== type)
    });
  };
  
  const handleDistressTypeChange = (type, checked) => {
    setLocalFilters({
      ...localFilters,
      distressType: checked 
        ? [...localFilters.distressType, type]
        : localFilters.distressType.filter(t => t !== type)
    });
  };
  
  const handleBedroomsChange = (bedrooms, checked) => {
    setLocalFilters({
      ...localFilters,
      bedrooms: checked 
        ? [...localFilters.bedrooms, bedrooms]
        : localFilters.bedrooms.filter(b => b !== bedrooms)
    });
  };
  
  const handleBathroomsChange = (bathrooms, checked) => {
    setLocalFilters({
      ...localFilters,
      bathrooms: checked 
        ? [...localFilters.bathrooms, bathrooms]
        : localFilters.bathrooms.filter(b => b !== bathrooms)
    });
  };
  
  const handleInvestmentScoreChange = (value) => {
    setLocalFilters({
      ...localFilters,
      investmentScoreMin: value
    });
  };
  
  const handleCapRateChange = (value) => {
    setLocalFilters({
      ...localFilters,
      capRateMin: value
    });
  };
  
  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };
  
  const handleResetFilters = () => {
    const resetFilters = {
      priceRange: [0, 2000000],
      location: [],
      propertyType: [],
      distressType: [],
      bedrooms: [],
      bathrooms: [],
      investmentScoreMin: 0,
      capRateMin: 0
    };
    
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  return (
    <div className={`${isOpen ? 'block' : 'hidden'} md:block border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 w-full md:w-80 p-4 h-[calc(100vh-64px)] md:sticky top-16 overflow-y-auto`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filter Properties
        </h2>
        <Button variant="ghost" size="sm" onClick={onToggle} className="md:hidden">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search by keyword..." 
            className="pl-9" 
          />
        </div>
      </div>
      
      <Accordion type="multiple" defaultValue={["price", "location", "propertyType"]}>
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium py-3">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Price Range
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                defaultValue={[localFilters.priceRange[0], localFilters.priceRange[1]]}
                max={2000000}
                step={10000}
                onValueChange={handlePriceChange}
              />
              <div className="flex items-center justify-between">
                <div className="text-sm">{formatCurrency(localFilters.priceRange[0])}</div>
                <div className="text-sm">{formatCurrency(localFilters.priceRange[1])}</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="location">
          <AccordionTrigger className="text-sm font-medium py-3">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Location
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Boston, MA", "Miami, FL", "Chicago, IL", "Austin, TX", "Phoenix, AZ", "Atlanta, GA"].map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`location-${location}`} 
                    checked={localFilters.location.includes(location)}
                    onCheckedChange={(checked) => handleLocationChange(location, checked)}
                  />
                  <label
                    htmlFor={`location-${location}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="propertyType">
          <AccordionTrigger className="text-sm font-medium py-3">
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-2" />
              Property Type
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Single Family", "Multi-Family", "Condo", "Townhouse", "Commercial"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`type-${type}`}
                    checked={localFilters.propertyType.includes(type)}
                    onCheckedChange={(checked) => handlePropertyTypeChange(type, checked)}
                  />
                  <label
                    htmlFor={`type-${type}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="distressType">
          <AccordionTrigger className="text-sm font-medium py-3">
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              Distress Type
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["foreclosure", "short-sale", "reo", "probate", "auction", "other"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`distress-${type}`}
                    checked={localFilters.distressType.includes(type)}
                    onCheckedChange={(checked) => handleDistressTypeChange(type, checked)}
                  />
                  <label
                    htmlFor={`distress-${type}`}
                    className="text-sm leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type.replace('-', ' ')}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="beds">
          <AccordionTrigger className="text-sm font-medium py-3">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-2" />
              Bedrooms
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((beds) => (
                <div key={beds} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`beds-${beds}`}
                    checked={localFilters.bedrooms.includes(beds)}
                    onCheckedChange={(checked) => handleBedroomsChange(beds, checked)}
                  />
                  <label
                    htmlFor={`beds-${beds}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {beds} {beds === 5 ? "+" : ""}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="baths">
          <AccordionTrigger className="text-sm font-medium py-3">
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-2" />
              Bathrooms
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((baths) => (
                <div key={baths} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`baths-${baths}`}
                    checked={localFilters.bathrooms.includes(baths)}
                    onCheckedChange={(checked) => handleBathroomsChange(baths, checked)}
                  />
                  <label
                    htmlFor={`baths-${baths}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {baths} {baths === 4 ? "+" : ""}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="investmentMetrics">
          <AccordionTrigger className="text-sm font-medium py-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              Investment Metrics
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Min Investment Score</span>
                  <span className="text-sm">{localFilters.investmentScoreMin}</span>
                </div>
                <Slider
                  defaultValue={[localFilters.investmentScoreMin]}
                  max={100}
                  step={5}
                  onValueChange={(value) => handleInvestmentScoreChange(value[0])}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Min Cap Rate</span>
                  <span className="text-sm">{localFilters.capRateMin}%</span>
                </div>
                <Slider
                  defaultValue={[localFilters.capRateMin]}
                  max={15}
                  step={0.5}
                  onValueChange={(value) => handleCapRateChange(value[0])}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="mt-6 space-y-2">
        <Button onClick={handleApplyFilters} className="w-full bg-brand-500 hover:bg-brand-600">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={handleResetFilters} className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}

