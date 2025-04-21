import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Home, List, Layers, ZoomIn, ZoomOut } from "lucide-react";

export function PropertyMap({ properties, onSelectProperty }) {
  const [mapMode, setMapMode] = useState("standard");
  const [zoomLevel, setZoomLevel] = useState(12);
  
  // Mock implementation for demonstration purposes
  // In a real app, this would use a mapping library like Google Maps, Mapbox, or Leaflet
  return (
    <div className="relative w-full h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <MapPin className="h-16 w-16 mx-auto mb-2" />
          <p className="text-lg font-medium">Interactive Map</p>
          <p className="text-sm">In a real implementation, this would display an interactive map with property markers.</p>
          <p className="text-sm mt-4">Properties would be displayed as pins on locations:</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {properties.map((property) => (
              <div 
                key={property.id}
                onClick={() => onSelectProperty(property)}
                className="flex items-center p-2 bg-white dark:bg-gray-900 rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              >
                <Home className="h-4 w-4 mr-2 text-brand-500" />
                <span className="text-sm">{property.city}, {property.state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button 
          variant="secondary" 
          size="icon" 
          className="bg-white dark:bg-gray-900 shadow-md"
          onClick={() => setMapMode(mapMode === "standard" ? "satellite" : "standard")}
        >
          <Layers className="h-4 w-4" />
        </Button>
        <Button 
          variant="secondary" 
          size="icon" 
          className="bg-white dark:bg-gray-900 shadow-md"
          onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 20))}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button 
          variant="secondary" 
          size="icon" 
          className="bg-white dark:bg-gray-900 shadow-md"
          onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 1))}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button 
          variant="secondary" 
          size="icon" 
          className="bg-white dark:bg-gray-900 shadow-md"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Info footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-2 text-xs text-center">
        Map mode: {mapMode === "standard" ? "Standard" : "Satellite"} | Zoom level: {zoomLevel} | Properties shown: {properties.length}
      </div>
    </div>
  );
}

