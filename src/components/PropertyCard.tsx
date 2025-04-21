import { Property } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Home,
  Bed,
  Bath,
  MapPin,
  Tag,
  Calendar,
  TrendingUp,
  Building
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

export function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const distressTypeColors = {
    'foreclosure': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'short-sale': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    'reo': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'probate': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'auction': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'other': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  };

  // Investment score color based on score value
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-amber-600";
    return "text-gray-600";
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md property-card-mobile">
      <div className="relative">
        <img 
          src={property.images[0] || "/placeholder.svg"} 
          alt={property.title}
          className="w-full h-40 sm:h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <Badge className={`${distressTypeColors[property.distressType]} capitalize text-xs sm:text-sm`}>
            {property.distressType.replace('-', ' ')}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge className="bg-brand-500 text-white text-xs sm:text-sm">
            {property.discountPercentage.toFixed(1)}% Off
          </Badge>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs sm:text-sm px-2 py-1 rounded">
          <div className={`flex items-center ${getScoreColor(property.investmentScore)}`}>
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>{property.investmentScore}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="pt-3 sm:pt-4 flex-grow p-3 sm:p-4">
        <h3 className="font-bold text-base sm:text-lg mb-1 truncate">{property.title}</h3>
        
        <div className="flex items-center text-muted-foreground mb-2 sm:mb-3">
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="text-xs sm:text-sm truncate">
            {property.city}, {property.state}
          </span>
        </div>
        
        <div className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-brand-600 dark:text-brand-400">
          {formatCurrency(property.price)}
          <span className="text-xs sm:text-sm font-normal text-muted-foreground ml-1 line-through">
            {formatCurrency(property.originalPrice)}
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-2 sm:mb-3">
          <div className="flex flex-col items-center p-1 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="flex items-center text-muted-foreground mb-0.5 sm:mb-1">
              <Bed className="h-3 w-3 mr-0.5 sm:mr-1" />
              <span className="text-xs">Beds</span>
            </div>
            <span className="font-medium text-xs sm:text-sm">{property.bedrooms}</span>
          </div>
          
          <div className="flex flex-col items-center p-1 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="flex items-center text-muted-foreground mb-0.5 sm:mb-1">
              <Bath className="h-3 w-3 mr-0.5 sm:mr-1" />
              <span className="text-xs">Baths</span>
            </div>
            <span className="font-medium text-xs sm:text-sm">{property.bathrooms}</span>
          </div>
          
          <div className="flex flex-col items-center p-1 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="flex items-center text-muted-foreground mb-0.5 sm:mb-1">
              <Home className="h-3 w-3 mr-0.5 sm:mr-1" />
              <span className="text-xs">SqFt</span>
            </div>
            <span className="font-medium text-xs sm:text-sm">{property.sqft.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
          <div className="flex items-center">
            <Building className="h-3 w-3 mr-1 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{property.propertyType}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{new Date(property.listedDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center">
            <Tag className="h-3 w-3 mr-1 text-muted-foreground flex-shrink-0" />
            <span className="truncate">Cap Rate: {property.capRate}%</span>
          </div>
          
          <div className="flex items-center">
            <TrendingUp className="h-3 w-3 mr-1 text-muted-foreground flex-shrink-0" />
            <span className="truncate">Est. ROI: {property.estimatedRoi}%</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 p-3 sm:p-4">
        <Button 
          onClick={() => onViewDetails(property)} 
          className="w-full bg-brand-500 hover:bg-brand-600 mobile-touch-target text-sm sm:text-base"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
