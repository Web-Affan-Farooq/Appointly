"use client";
import React, { useState, useMemo } from "react";
import Card from "./Card";
import { serviceCategories } from "@/constants";
import { Input } from "@/components/common";
import { useService } from "@/stores/service";

const ServicesPage = () => {
  const { services } = useService();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // ✅ Derive filtered services with useMemo
  const filteredServices = useMemo(() => {
    let newServices = services;

    if (activeCategory !== "All") {
      newServices = newServices.filter(
        (service) =>
          service.category.trim().toLowerCase() ===
          activeCategory.trim().toLowerCase()
      );
    }

    if (searchTerm) {
      newServices = newServices.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.provider_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return newServices;
  }, [services, activeCategory, searchTerm]);

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
                    className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap transition-colors duration-300 ${
                      activeCategory === category
                        ? "bg-pink text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
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
