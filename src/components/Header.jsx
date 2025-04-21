import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Search, Bell, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mobile-touch-target"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t pb-3 pt-2 px-4">
          <nav className="flex flex-col space-y-3">
            <a href="/" className="flex items-center py-2 text-base font-medium text-brand-600">
              Dashboard
            </a>
            <a href="#" className="flex items-center py-2 text-base font-medium text-muted-foreground">
              Properties
            </a>
            <a href="#" className="flex items-center py-2 text-base font-medium text-muted-foreground">
              Analytics
            </a>
            <a href="#" className="flex items-center py-2 text-base font-medium text-muted-foreground">
              Watchlist
            </a>
            <a href="#" className="flex items-center py-2 text-base font-medium text-muted-foreground">
              Resources
            </a>
            <div className="pt-2">
              <Button variant="default" className="w-full mobile-touch-target">
                Sign In
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

