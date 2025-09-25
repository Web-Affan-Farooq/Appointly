import { Star, Quote } from "lucide-react";
// import { Card, CardContent } from "./ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Client",
      content:
        "Appointly made finding and booking with my therapist so simple. The automatic reminders and confirmations give me peace of mind. Best booking platform I've used!",
      rating: 5,
      avatar: "SJ",
      type: "client",
    },
    {
      name: "Dr. Michael Chen",
      role: "Healthcare Provider",
      content:
        "Managing appointments has never been easier. The dashboard is intuitive, and the automatic scheduling saves me hours each week. My patients love the seamless experience.",
      rating: 5,
      avatar: "MC",
      type: "provider",
    },
    {
      name: "Emily Rodriguez",
      role: "Client",
      content:
        "I love how I can see real reviews and ratings before booking. The process is straightforward, and I always get confirmation emails. Highly recommend Appointly!",
      rating: 5,
      avatar: "ER",
      type: "client",
    },
    {
      name: "James Wilson",
      role: "Fitness Trainer",
      content:
        "Appointly transformed my business. I can accept/reject appointments on the go, and the automated emails keep my clients informed. Revenue has increased by 40%!",
      rating: 5,
      avatar: "JW",
      type: "provider",
    },
    {
      name: "Lisa Park",
      role: "Client",
      content:
        "The best part is finding top-rated professionals in my area. The booking form is quick to fill out, and I always know exactly when my appointment is confirmed.",
      rating: 5,
      avatar: "LP",
      type: "client",
    },
    {
      name: "Robert Taylor",
      role: "Consultant",
      content:
        "The automatic completion tracking is brilliant. When clients attend, it's marked complete automatically. The analytics help me understand my business better.",
      rating: 5,
      avatar: "RT",
      type: "provider",
    },
  ];

  const stats = [
    { number: "4.9/5", label: "Average Rating" },
    { number: "50K+", label: "Happy Users" },
    { number: "99.8%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <section
      id="testimonials"
      className="w-full py-20 bg-gradient-to-br from-gray-50 to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#e189fa]/10 border border-[#e189fa]/20">
            <span className="text-sm font-medium text-[#e189fa]">
              ⭐ Customer Reviews
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-black">
            Loved by Thousands
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our clients and service providers are saying about their
            experience with Appointly.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-black mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <div className="p-6 space-y-4">
                {/* Quote Icon */}
                <div className="flex justify-between items-start">
                  <Quote
                    className={`h-8 w-8 ${testimonial.type === "client" ? "text-[#e189fa]" : "text-[#dbc81d]"}`}
                  />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#dbc81d] text-[#dbc81d]"
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  {/* <Avatar className="h-10 w-10">
                    <AvatarFallback
                      className={`${testimonial.type === "client" ? "bg-[#e189fa]/10 text-[#e189fa]" : "bg-[#dbc81d]/10 text-[#dbc81d]"}`}
                    >
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar> */}
                  <div>
                    <div className="font-semibold text-black">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Trusted by professionals across industries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Healthcare</div>
            <div className="text-2xl font-bold text-gray-400">Fitness</div>
            <div className="text-2xl font-bold text-gray-400">Beauty</div>
            <div className="text-2xl font-bold text-gray-400">Consulting</div>
            <div className="text-2xl font-bold text-gray-400">Education</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
