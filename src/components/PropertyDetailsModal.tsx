
import { useState } from "react";
import { Property } from "@/types";
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
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PropertyDetailsModal({ property, isOpen, onClose }: PropertyDetailsModalProps) {
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl sm:text-2xl">{property.title}</DialogTitle>
              <DialogDescription className="flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {property.address}, {property.city}, {property.state} {property.zip}
              </DialogDescription>
            </div>
            <div className="flex space-x-2">
              <Badge variant="outline" className={distressTypeColors[property.distressType]}>
                {property.distressType.replace('-', ' ')}
              </Badge>
              <Badge className="bg-brand-500 text-white">
                {property.discountPercentage.toFixed(1)}% Below Market
              </Badge>
            </div>
          </div>
        </DialogHeader>
        
        <div className="relative mb-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-lg overflow-hidden">
            {property.images.length > 0 ? (
              <>
                <div className="sm:col-span-2">
                  <img 
                    src={property.images[0]} 
                    alt={property.title}
                    className="w-full h-60 object-cover rounded-lg"
                  />
                </div>
                {property.images.slice(1, 3).map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${property.title} ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </>
            ) : (
              <div className="w-full h-60 bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-lg">
                <Home className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 shadow-lg rounded-full p-2">
            <div className="flex items-center text-brand-500 dark:text-brand-400">
              <Star className="h-5 w-5 mr-1 fill-current" />
              <span className="text-lg font-bold">{property.investmentScore}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-600" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Price</div>
              <div className="font-bold text-lg">{formatCurrency(property.price)}</div>
            </div>
          </div>
          
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center">
            <Building className="h-5 w-5 mr-2 text-blue-600" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Property Type</div>
              <div className="font-bold">{property.propertyType}</div>
            </div>
          </div>
          
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-600" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Year Built</div>
              <div className="font-bold">{property.yearBuilt}</div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Bed className="h-5 w-5 mb-1 text-gray-600" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                <div className="font-bold text-lg">{property.bedrooms}</div>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Bath className="h-5 w-5 mb-1 text-gray-600" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                <div className="font-bold text-lg">{property.bathrooms}</div>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Home className="h-5 w-5 mb-1 text-gray-600" />
                <div className="text-sm text-gray-600 dark:text-gray-400">Square Feet</div>
                <div className="font-bold text-lg">{property.sqft.toLocaleString()}</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300">{property.description}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Investment Opportunity</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Cap Rate</span>
                    <span className="text-sm font-medium">{property.capRate}%</span>
                  </div>
                  <Progress value={property.capRate * 10} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Estimated ROI</span>
                    <span className="text-sm font-medium">{property.estimatedRoi}%</span>
                  </div>
                  <Progress value={property.estimatedRoi * 5} className="h-2" />
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Source</span>
                <span className="text-sm">{property.source}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Listed Date</span>
                <span className="text-sm">{new Date(property.listedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="investment" className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Investment Analysis</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Investment Score</span>
                    <span className="text-sm font-medium">{property.investmentScore}/100</span>
                  </div>
                  <Progress value={property.investmentScore} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Purchase Price</div>
                    <div className="font-bold text-lg">{formatCurrency(property.price)}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Market Value</div>
                    <div className="font-bold text-lg">{formatCurrency(property.originalPrice)}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Est. Repair Cost</div>
                    <div className="font-bold text-lg">{formatCurrency(property.repairEstimate)}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">After Repair Value</div>
                    <div className="font-bold text-lg">{formatCurrency(property.afterRepairValue)}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Rent</div>
                    <div className="font-bold text-lg">{formatCurrency(property.estimatedRent)}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Annual Rental Income</div>
                    <div className="font-bold text-lg">{formatCurrency(property.estimatedRent * 12)}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Cap Rate</div>
                    <div className="font-bold text-lg">{property.capRate}%</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Cash on Cash Return</div>
                    <div className="font-bold text-lg">{(property.estimatedRoi * 0.8).toFixed(1)}%</div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Total Investment</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between">
                      <span>Purchase Price</span>
                      <span>{formatCurrency(property.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Repair Costs</span>
                      <span>{formatCurrency(property.repairEstimate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Closing Costs (est.)</span>
                      <span>{formatCurrency(property.price * 0.03)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatCurrency(property.price + property.repairEstimate + (property.price * 0.03))}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Property Details</h3>
              
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Property Type</div>
                  <div className="font-medium">{property.propertyType}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Year Built</div>
                  <div className="font-medium">{property.yearBuilt}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Square Footage</div>
                  <div className="font-medium">{property.sqft.toLocaleString()}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Lot Size</div>
                  <div className="font-medium">0.25 acres</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                  <div className="font-medium">{property.bedrooms}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                  <div className="font-medium">{property.bathrooms}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Parking</div>
                  <div className="font-medium">2 Car Garage</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cooling</div>
                  <div className="font-medium">Central Air</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Heating</div>
                  <div className="font-medium">Forced Air</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Utilities</div>
                  <div className="font-medium">Public</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Distress Information</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Distress Type</div>
                  <div className="font-medium capitalize">{property.distressType.replace('-', ' ')}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Original Market Value</div>
                  <div className="font-medium">{formatCurrency(property.originalPrice)}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Discount</div>
                  <div className="font-medium">{property.discountPercentage.toFixed(1)}% ({formatCurrency(property.originalPrice - property.price)})</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Source</div>
                  <div className="font-medium">{property.source}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Listed Date</div>
                  <div className="font-medium">{new Date(property.listedDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-brand-100 dark:bg-brand-900 rounded-full p-3 mr-3">
                    <Mail className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Email</div>
                    <div className="font-medium">contact@distressedassetai.com</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-brand-100 dark:bg-brand-900 rounded-full p-3 mr-3">
                    <Phone className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Phone</div>
                    <div className="font-medium">(555) 123-4567</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button className="w-full bg-brand-500 hover:bg-brand-600">Request More Information</Button>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Property Source</h3>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">Listed By</div>
                <div className="font-medium">{property.source}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Reference ID</div>
                <div className="font-medium">{property.id}</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex sm:justify-between gap-3 pt-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Close
          </Button>
          <div className="flex gap-2 flex-1">
            <Button variant="outline" className="flex-1">
              <BookmarkPlus className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button className="flex-1 bg-brand-500 hover:bg-brand-600">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
