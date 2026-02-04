import { useMemo, useState } from "react";
import { useService } from "./use-service";

export const useServiceFilter = () => {
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
          activeCategory.trim().toLowerCase(),
      );
    }

    if (searchTerm) {
      newServices = newServices.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.provider_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    return newServices;
  }, [services, activeCategory, searchTerm]);

  return {
    filteredServices,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
  };
};
