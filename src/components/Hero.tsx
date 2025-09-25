import { Button } from "./ui/button";
import { Calendar, Users, ArrowRight, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="w-full bg-gradient-to-br from-white via-purple-50 to-pink-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#e189fa]/10 border border-[#e189fa]/20">
              <span className="text-sm font-medium text-[#e189fa]">
                ✨ Transform Your Appointment Management
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-black leading-tight">
                Book & Manage
                <span className="block text-[#e189fa]">Appointments</span>
                <span className="block">Effortlessly</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                The all-in-one platform that connects clients with top-rated service providers 
                while automating appointment management for businesses.
              </p>
            </div>

            {/* Value Props */}
            <div className="space-y-3">
              {[
                "Find & book with top-rated professionals",
                "Automated scheduling & notifications",
                "Streamlined business management"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#dbc81d] flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-[#e189fa] hover:bg-[#d175f0] text-black px-8 py-4 text-lg"
              >
                <Users className="h-5 w-5 mr-2" />
                For Clients
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-[#dbc81d] text-black hover:bg-[#dbc81d] hover:text-black px-8 py-4 text-lg"
              >
                <Calendar className="h-5 w-5 mr-2" />
                For Providers
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-black">10K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-black">50K+</div>
                <div className="text-sm text-gray-600">Appointments</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-black">99%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1641089017752-326a2e2f94f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBhcHBvaW50bWVudCUyMGJvb2tpbmd8ZW58MXx8fHwxNzU4ODI1Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern appointment booking interface"
                className="w-full h-auto"
              />
              
              {/* Floating Card - Appointment Booked */}
              <div className="absolute top-6 left-6 bg-white rounded-lg shadow-lg p-4 animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#e189fa] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-black">Appointment Confirmed!</div>
                    <div className="text-xs text-gray-500">Today at 2:00 PM</div>
                  </div>
                </div>
              </div>

              {/* Floating Card - Rating */}
              <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex text-[#dbc81d]">
                    {"★".repeat(5)}
                  </div>
                  <span className="text-sm font-medium text-black">4.9/5</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Trusted by thousands</div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-[#e189fa]/20 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 bottom-0 left-0 w-64 h-64 bg-[#dbc81d]/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}