"use client";
// ____ Hooks ...
import { useServiceFilter } from "./_hooks/use-service-filter";

// ____ Components and constants ...
import { serviceCategories } from "@/shared/constants";
import { Input } from "@/components/common";
import { Catalog } from "./_components/Catalog";

const ServicesPage = () => {
  const { searchTerm, setSearchTerm, activeCategory, setActiveCategory } =
    useServiceFilter();
  return (
    <main>
      <article>
        <section>
          <div className="min-h-screen bg-gray-50 font-sans px-4 py-16 sm:px-8 sm:py-20 md:px-12 md:py-26">
            <div className="max-w-7xl mx-auto py-8">
              Available Services
              <h1 className="text-4xl font-bold text-gray-900 mb-2"></h1>
              <p className="text-sm sm:text-md text-gray-600 mb-8">
                Browse and book appointments with our top providers.
              </p>
              {/* Search Bar */}
              <div className="relative mb-8">
                <Input
                  type="text"
                  placeholder="Search for services or providers..."
                  className="placeholder:text-sm w-full md:w-[60vw] w-[80vw] border-none pl-12 pr-4 py-3 transition-all duration-300 shadow-sm text-gray-700 bg-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
              {/* Categories Scrollbar */}
              <div className="flex overflow-x-auto no-scrollbar pb-4 mb-8 space-x-3">
                {serviceCategories.map((category) => (
                  <button
                    type="button"
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
              <Catalog />
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default ServicesPage;
