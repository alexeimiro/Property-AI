import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";
import { mockProperties } from "@/data/mockProperties";

// Random real estate images for the slider
const realtyImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1175&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1153&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
  "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1612637968894-660373e23b03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1628744876497-eb30460201f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1148&q=80"
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const progressRef = useRef(null);
  
  // Select random newest properties on component mount
  useEffect(() => {
    // Sort by listed date (newest first) and filter properties with discount
    let sortedProperties = [...mockProperties]
      .sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate))
      .filter(prop => prop.discountPercentage > 0);
    
    // If we don't have enough properties with discounts, use all properties
    if (sortedProperties.length < 5) {
      sortedProperties = [...mockProperties]
        .sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
    }
    
    // Create exactly 5 random properties
    const randomProperties = [];
    let propertyCopy = [...sortedProperties];
    
    // If we still don't have enough properties, duplicate some
    if (propertyCopy.length < 5) {
      const multiplier = Math.ceil(5 / propertyCopy.length);
      propertyCopy = Array(multiplier).fill(propertyCopy).flat().slice(0, 10);
    }
    
    // Get 5 random properties
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * propertyCopy.length);
      // Assign a random image to each property
      const property = {...propertyCopy[randomIndex]}; // Create a copy to avoid reference issues
      property.randomImage = realtyImages[i % realtyImages.length]; // Ensure each slide gets a different image
      randomProperties.push(property);
      propertyCopy.splice(randomIndex, 1);
    }
    
    setFeaturedProperties(randomProperties);
    setLoading(false);
  }, []);

  // Auto-advance slides with progress animation
  useEffect(() => {
    if (featuredProperties.length === 0 || loading) return;
    
    // Reset progress animation
    if (progressRef.current) {
      progressRef.current.style.transition = 'none';
      progressRef.current.style.width = '0%';
      
      // Force a reflow
      void progressRef.current.offsetWidth;
      
      // Start the animation
      progressRef.current.style.transition = 'width 4.9s linear';
      progressRef.current.style.width = '100%';
    }
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === featuredProperties.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredProperties.length, currentSlide, loading]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return <div className="h-[400px] bg-gray-200 animate-pulse"></div>;
  }

  return (
    <section className="relative w-full overflow-hidden">
      {/* Slider */}
      <div className="relative h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden">
        {/* Image slider */}
        <div className="absolute inset-0">
          {featuredProperties.map((property, index) => (
            <div
              key={`slide-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img
                src={property.randomImage}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              
              {/* Property info overlay - centered on mobile, right on desktop */}
              <div className="absolute left-1/2 bottom-[10%] sm:bottom-[20%] sm:right-[20%] sm:left-auto z-20 text-white w-[90%] sm:max-w-md transform -translate-x-1/2 sm:translate-x-0">
                <div className="bg-black/70 backdrop-blur-sm text-white rounded-lg px-4 sm:px-6 py-3 sm:py-4 w-full border border-white/10 shadow-xl">
                  <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 tracking-tight truncate">{property.title}</h3>
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <span className="flex items-center text-sm sm:text-base">
                      <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0 text-brand-400" />
                      <span className="truncate">{property.city}, {property.state}</span>
                    </span>
                    <span className="text-xs sm:text-base bg-brand-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-md font-medium">
                      {property.discountPercentage ? `${property.discountPercentage.toFixed(1)}% Off` : "Featured"}
                    </span>
                  </div>
                  <div className="text-sm sm:text-lg font-medium">
                    ${property.price.toLocaleString()} 
                    {property.originalPrice && property.originalPrice > property.price && 
                      <span className="text-gray-400 line-through text-xs sm:text-base ml-2">
                        ${property.originalPrice.toLocaleString()}
                      </span>
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Line indicators with progress */}
        <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center px-4 sm:px-8 md:px-16">
          <div className="flex space-x-2 w-full max-w-xs">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative h-0.5 sm:h-1 flex-1 bg-white/30 overflow-hidden"
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentSlide && (
                  <div 
                    ref={index === currentSlide ? progressRef : null}
                    className="absolute left-0 top-0 h-full bg-white w-0"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Hero text overlay - centered on mobile, left on desktop */}
        <div className="absolute top-1/3 sm:top-auto sm:bottom-[20%] left-1/2 sm:left-[20%] transform -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 sm:translate-y-0 z-10 text-white w-[90%] sm:max-w-md px-4 sm:px-0 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 drop-shadow-lg tracking-tight leading-tight">
            Find Distressed Properties at <span className="text-brand-400 font-extrabold">Unbeatable Prices</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg drop-shadow-md font-medium">
            Our AI identifies the best investment opportunities before anyone else
          </p>
        </div>
      </div>
    </section>
  );
} 