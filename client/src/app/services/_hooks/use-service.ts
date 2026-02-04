import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ClientService } from "@shared/types";

interface ServiceState {
  loading: boolean;
  services: ClientService[];
  setLoading: (value: boolean) => void;
  setService: (list: ClientService[]) => void;
}

export const useService = create<ServiceState>()(
  persist(
    (set) => ({
      services: [],
      loading: false,
      selectedService: {
        name: "",
        description: "",
        category: "",
        currency: "",
        ratings: [],
        appointmentsCount: 0,
        max_appointments_per_day: 0,
        details: [],
        provider_name: "",
        start_time: "",
        end_time: "",
        duration: 0,
        id: "",
        created_at: new Date(),
        user_id: "",
        working_days: [],
        price: 0,
        remainingAppointments: 0,
      },
      setLoading: (value) => set(() => ({ loading: value })),
      setService: (list) =>
        set(() => ({
          services: list,
        })),
    }),
    {
      name: "services-page-data",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
