import { Button } from "./ui/button";
import { Menu, Calendar, Users, Star } from "lucide-react";

export function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Calendar className="h-8 w-8 mr-2" style={{ color: '#e189fa' }} />
            <span className="text-2xl font-bold text-black">Appointly</span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-black transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-black transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-black transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-black transition-colors">
              Reviews
            </a>
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-black hover:bg-gray-100">
              Log In
            </Button>
            <Button 
              className="bg-[#e189fa] hover:bg-[#d175f0] text-black"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}