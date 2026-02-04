import {
  Search,
  Calendar,
  CheckCircle,
  Bell,
  Users,
  BarChart3,
} from "lucide-react";
// import { Badge } from "./ui/badge";
import Image from "next/image";

export function HowItWorks() {
  const clientSteps = [
    {
      step: "1",
      icon: <Search className="h-6 w-6" />,
      title: "Browse & Discover",
      description:
        "Search for service providers by category, location, and ratings. View profiles, reviews, and availability.",
    },
    {
      step: "2",
      icon: <Calendar className="h-6 w-6" />,
      title: "Book Appointment",
      description:
        "Fill out a simple booking form with your details and preferred time. Submit your appointment request.",
    },
    {
      step: "3",
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Get Confirmed",
      description:
        "Receive confirmation when your appointment is accepted, or alternative suggestions if declined.",
    },
    {
      step: "4",
      icon: <Bell className="h-6 w-6" />,
      title: "Attend & Complete",
      description:
        "Get reminders before your appointment. Attendance is automatically tracked and marked as complete.",
    },
  ];

  const providerSteps = [
    {
      step: "1",
      icon: <Users className="h-6 w-6" />,
      title: "Receive Requests",
      description:
        "New appointment requests appear instantly on your dashboard with all client details and preferences.",
    },
    {
      step: "2",
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Accept or Decline",
      description:
        "Review requests and make decisions. Clients are automatically notified via email of your response.",
    },
    {
      step: "3",
      icon: <Calendar className="h-6 w-6" />,
      title: "Auto-Schedule",
      description:
        "Accepted appointments are automatically added to your calendar with all necessary details.",
    },
    {
      step: "4",
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Track & Manage",
      description:
        "Monitor appointment status, track completions, and analyze your business performance.",
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#dbc81d]/10 border border-[#dbc81d]/20">
            <span className="text-sm font-medium text-[#dbc81d]">
              🚀 Simple Process
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-black">
            How Appointly Works
          </h2>
          <p className="max-sm:text-sm text-xl text-gray-600 max-w-3xl mx-auto">
            A streamlined process designed for both clients and service
            providers to make appointment management effortless.
          </p>
        </div>

        {/* Client Journey */}
        <div className="mb-20">
          <div className="text-center mb-12">
            {/* <Badge className="bg-[#e189fa] text-black text-lg px-6 py-2 mb-4">
              For Clients
            </Badge> */}
            <h3 className="text-2xl font-bold text-black">
              Book Your Perfect Appointment
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Steps */}
            <div className="space-y-6">
              {clientSteps.map((step) => (
                <div key={step.step} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#e189fa] rounded-full flex items-center justify-center text-black font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-[#e189fa]">{step.icon}</div>
                      <h4 className="text-lg font-semibold text-black">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 max-sm:text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzU4NzQ0MDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  width={500}
                  height={500}
                  alt="Mobile app interface for booking appointments"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#e189fa]/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Provider Journey */}
        <div>
          <div className="text-center mb-12">
            {/* <Badge className="bg-[#dbc81d] text-black text-lg px-6 py-2 mb-4">
              For Service Providers
            </Badge> */}
            <h3 className="text-2xl font-bold text-black">
              Manage Your Business Efficiently
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRhc2hib2FyZCUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTg3NzY4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  width={500}
                  height={500}
                  alt="Business dashboard with analytics"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#dbc81d]/20 rounded-full blur-2xl"></div>
            </div>

            {/* Steps */}
            <div className="space-y-6 lg:order-2">
              {providerSteps.map((step) => (
                <div
                  key={step.title.slice(0, 10)}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#dbc81d] rounded-full flex items-center justify-center text-black font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-[#dbc81d]">{step.icon}</div>
                      <h4 className="text-lg font-semibold text-black">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 max-sm:text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
