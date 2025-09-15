"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import { serviceCategories } from "@/constants";
import { Input } from "@/components/common";

const allServices = [
  {
    id: 1,
    name: "Haircut & Styling",
    provider: "The Barber's Shop",
    category: "salon",
    price: 45,
    description: "A classic haircut with professional styling and finish.",
  },
  {
    id: 2,
    name: "Full Body Massage",
    provider: "Bliss Spa",
    category: "clinic",
    price: 85,
    description: "Relaxing full body massage to relieve muscle tension.",
  },
  {
    id: 3,
    name: "Career Coaching",
    provider: "Success Mentors Inc.",
    category: "interview",
    price: 150,
    description:
      "Personalized career coaching session to help you achieve your goals.",
  },
  {
    id: 4,
    name: "Teeth Whitening",
    provider: "Bright Smiles Dental",
    category: "clinic",
    price: 200,
    description:
      "Professional teeth whitening for a brighter, more confident smile.",
  },
  {
    id: 5,
    name: "Makeup Application",
    provider: "Glamour Studio",
    category: "salon",
    price: 70,
    description:
      "Flawless makeup application for special occasions or daily wear.",
  },
  {
    id: 6,
    name: "Resume Review",
    provider: "Resume Pro",
    category: "interview",
    price: 50,
    description: "Detailed review and feedback on your resume to stand out.",
  },
  {
    id: 7,
    name: "Deep Tissue Massage",
    provider: "Bliss Spa",
    category: "clinic",
    price: 95,
    description:
      "Focused deep tissue massage to target specific problem areas.",
  },
  {
    id: 8,
    name: "Eyelash Extensions",
    provider: "Glamour Studio",
    category: "salon",
    price: 110,
    description:
      "Professional application of classic or volume eyelash extensions.",
  },
];

interface Service {
  id: number;
  name: string;
  provider: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredServices, setFilteredServices] = useState(allServices);

  useEffect(() => {
    let newServices = allServices;

    // Filter by category
    if (activeCategory !== "All") {
      newServices = newServices.filter(
        (service) =>
          service.category.trim().toLowerCase() ===
          activeCategory.trim().toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      newServices = newServices.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredServices(newServices);
  }, [searchTerm, activeCategory]);

  return (
    <main>
      <article>
        <section>
          <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8 md:p-12">
            <div className="max-w-7xl mx-auto py-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Available Services
              </h1>
              <p className="text-md text-gray-600 mb-8">
                Browse and book appointments with our top providers.
              </p>

              {/* Search Bar */}
              <div className="relative mb-8">
                <Input
                  type="text"
                  placeholder="Search for services or providers..."
                  className="w-full md:w-[60vw] border-none pl-12 pr-4 py-3 transition-all duration-300 shadow-sm text-gray-700 bg-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>

              {/* Categories Scrollbar */}
              <div className="flex overflow-x-auto no-scrollbar pb-4 mb-8 space-x-3">
                {serviceCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`
                px-5 py-2 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap
                transition-colors duration-300
                ${
                  activeCategory === category
                    ? "bg-pink text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              `}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <Card key={service.id} service={service} />
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500 py-12">
                    <i className="fas fa-exclamation-triangle text-4xl mb-4"></i>
                    <p className="text-xl">No services found.</p>
                    <p className="text-sm">
                      Try a different search term or category.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};
export default ServicesPage;
