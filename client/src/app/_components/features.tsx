import {
  Calendar,
  Users,
  CheckCircle,
  Bell,
  Star,
  BarChart3,
  Clock,
  Shield,
} from "lucide-react";
// import { Card } from "@/components/common";

export function Features() {
  const clientFeatures = [
    {
      icon: <Star className="h-8 w-8" />,
      title: "Find Top-Rated Providers",
      description:
        "Browse and discover the best service providers based on ratings, reviews, and expertise in your area.",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Easy Booking",
      description:
        "Book appointments instantly with a simple form. Get confirmation and reminders automatically.",
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Smart Notifications",
      description:
        "Receive timely notifications about appointment confirmations, changes, and reminders.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Reliable",
      description:
        "Your personal information and appointments are protected with enterprise-grade security.",
    },
  ];

  const providerFeatures = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Dashboard Management",
      description:
        "View all appointment requests, manage your schedule, and track your business performance in one place.",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Accept/Reject Requests",
      description:
        "Review appointment requests and accept or reject them. Automated emails notify clients of decisions.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Auto-Scheduling",
      description:
        "Accepted appointments are automatically scheduled. Completed appointments are marked when clients attend.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Client Management",
      description:
        "Build lasting relationships with comprehensive client profiles and appointment history.",
    },
  ];

  return (
    <section id="features" className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#e189fa]/10 border border-[#e189fa]/20">
            <span className="text-sm font-medium text-[#e189fa]">
              ✨ Powerful Features
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-black">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto max-sm:text-sm">
            Whether you're booking appointments or managing your service
            business, Appointly provides all the tools you need in one powerful
            platform.
          </p>
        </div>

        {/* Client Features */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-black mb-2">For Clients</h3>
            <p className="text-gray-600 max-sm:text-sm">
              Find and book with the best service providers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientFeatures.map((feature) => (
              <div
                key={feature.title}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <div className="p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#e189fa]/10 text-[#e189fa]">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-black">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed max-sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Provider Features */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-black mb-2">
              For Service Providers
            </h3>
            <p className="text-gray-600">
              Streamline your business and grow your client base
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {providerFeatures.map((feature) => (
              <div
                key={feature.description.slice(0, 10)}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <div className="p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#dbc81d]/10 text-[#dbc81d]">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-black">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed max-sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
