import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Search, Bell, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mobile-touch-target"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          
          <a href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-brand-600 dark:text-brand-400">
              Distressed<span className="text-foreground">AI</span>
            </span>
          </a>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-sm font-medium transition-colors hover:text-brand-600">
            Dashboard
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-600">
            Properties
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-600">
            Analytics
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-600">
            Watchlist
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand-600">
            Resources
          </a>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-8"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="mobile-touch-target">
            <Bell className="h-5 w-5" />
          </Button>
          
          <ModeToggle />
          
          <Button variant="default" size="sm" className="hidden md:flex">
            Sign In
          </Button>
          
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" className="mobile-touch-target">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Mobile menu */}
      <div
        className={`fixed inset-y-0 left-0 w-[270px] z-50 md:hidden bg-background border-r shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          maxHeight: '-webkit-fill-available',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)'
        }}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <span className="text-xl font-bold text-brand-600 dark:text-brand-400">
            DistressedAI
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-4">
          <nav className="flex flex-col space-y-1">
            <a 
              href="/" 
              className="flex items-center py-3 px-3 rounded-md text-base font-medium text-brand-600 bg-brand-50 dark:bg-sidebar-accent"
            >
              Dashboard
            </a>
            <a 
              href="#" 
              className="flex items-center py-3 px-3 rounded-md text-base font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              Properties
            </a>
            <a 
              href="#" 
              className="flex items-center py-3 px-3 rounded-md text-base font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              Analytics
            </a>
            <a 
              href="#" 
              className="flex items-center py-3 px-3 rounded-md text-base font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              Watchlist
            </a>
            <a 
              href="#" 
              className="flex items-center py-3 px-3 rounded-md text-base font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              Resources
            </a>
            <Button variant="default" className="w-full mobile-touch-target">
            Sign In
          </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

