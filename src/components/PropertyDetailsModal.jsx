import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Home,
  Bed,
  Bath,
  MapPin,
  Calendar,
  DollarSign,
  Tag,
  LineChart,
    PieChart,
    Wrench,
    Building,
    AlignLeft,
    Star,
  BookmarkPlus,
  Share2,
  Mail,
  Phone,
  ArrowLeft,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Heart, Send } from "lucide-react";

export function PropertyDetailsModal({ property, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!property) return null;

  const distressTypeColors = {
    'foreclosure': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'short-sale': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    'reo': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'probate': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'auction': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'other': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 mobile-modal overflow-auto max-h-[90vh] md:max-h-[80vh]">
        <div className="sticky top-0 z-10 bg-background border-b flex items-center justify-between p-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="mr-2 mobile-touch-target md:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-lg sm:text-xl">Property Details</DialogTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="mobile-touch-target hidden md:flex"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="relative w-full h-56 sm:h-80 mb-4 rounded-lg overflow-hidden">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
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
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-1">{property.title}</h2>
            <div className="flex items-center text-muted-foreground mb-3">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm">
                {property.address}, {property.city}, {property.state} {property.zipCode}
              </span>
            </div>
            <div className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-3">
              {formatCurrency(property.price)}
              <span className="text-sm font-normal text-muted-foreground ml-2 line-through">
                {formatCurrency(property.originalPrice)}
              </span>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
              <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <Bed className="h-4 w-4 mb-1 text-muted-foreground" />
                <span className="text-xs sm:text-sm font-medium">{property.bedrooms} Beds</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <Bath className="h-4 w-4 mb-1 text-muted-foreground" />
                <span className="text-xs sm:text-sm font-medium">{property.bathrooms} Baths</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <Home className="h-4 w-4 mb-1 text-muted-foreground" />
                <span className="text-xs sm:text-sm font-medium">{property.sqft.toLocaleString()} SqFt</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <Building className="h-4 w-4 mb-1 text-muted-foreground" />
                <span className="text-xs sm:text-sm font-medium">{property.propertyType}</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <Calendar className="h-4 w-4 mb-1 text-muted-foreground" />
                <span className="text-xs sm:text-sm font-medium">Year {property.yearBuilt}</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <Tag className="h-4 w-4 mb-1 text-muted-foreground" />
                <span className="text-xs sm:text-sm font-medium">{property.lotSize.toLocaleString()} SqFt Lot</span>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="details" className="mb-6">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="details" className="mobile-touch-target text-xs sm:text-sm">Details</TabsTrigger>
              <TabsTrigger value="investment" className="mobile-touch-target text-xs sm:text-sm">Investment</TabsTrigger>
              <TabsTrigger value="history" className="mobile-touch-target text-xs sm:text-sm">History</TabsTrigger>
              <TabsTrigger value="neighborhood" className="mobile-touch-target text-xs sm:text-sm">Area</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="text-sm sm:text-base">
              <h3 className="font-semibold mb-2">Property Description</h3>
              <p className="mb-4 text-muted-foreground">{property.description}</p>
              
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="grid grid-cols-2 gap-2 mb-4">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Star className="h-3 w-3 mr-2 text-brand-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="font-semibold mb-2">Property Details</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-muted-foreground">Property Type: </span>
                  <span>{property.propertyType}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Year Built: </span>
                  <span>{property.yearBuilt}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Lot Size: </span>
                  <span>{property.lotSize.toLocaleString()} sqft</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Heating: </span>
                  <span>{property.heating}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Cooling: </span>
                  <span>{property.cooling}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Parking: </span>
                  <span>{property.parking}</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="investment" className="text-sm sm:text-base">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="text-muted-foreground text-xs mb-1">Investment Score</div>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-brand-500" />
                    <span className="text-xl font-bold">{property.investmentScore}/100</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="text-muted-foreground text-xs mb-1">Cap Rate</div>
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-brand-500" />
                    <span className="text-xl font-bold">{property.capRate}%</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="text-muted-foreground text-xs mb-1">Est. ROI (1yr)</div>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-brand-500" />
                    <span className="text-xl font-bold">{property.estimatedRoi}%</span>
                  </div>
                </div>
              </div>
              
              <h3 className="font-semibold mb-2">Financial Details</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <span className="text-muted-foreground">Current Price: </span>
                  <span>{formatCurrency(property.price)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Original Price: </span>
                  <span>{formatCurrency(property.originalPrice)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Discount: </span>
                  <span>{formatCurrency(property.originalPrice - property.price)} ({property.discountPercentage.toFixed(1)}%)</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Est. Repairs: </span>
                  <span>{formatCurrency(property.estimatedRepairCost)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">ARV: </span>
                  <span>{formatCurrency(property.afterRepairValue)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Monthly Rent: </span>
                  <span>{formatCurrency(property.estimatedMonthlyRent)}</span>
                </div>
              </div>
              
              <h3 className="font-semibold mb-2">Distress Information</h3>
              <p className="mb-4 text-muted-foreground">
                This property is available as a {property.distressType.replace('-', ' ')} due to {property.distressReason}. 
                Current stage: {property.distressStage}.
              </p>
            </TabsContent>
            
            {/* Other tab contents would go here */}
          </Tabs>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button className="mobile-touch-target w-full bg-brand-500 hover:bg-brand-600">Contact Agent</Button>
            <Button variant="outline" className="mobile-touch-target w-full">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" className="mobile-touch-target w-full">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" className="mobile-touch-target w-full">
              <Send className="h-4 w-4 mr-2" />
              Offer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

