import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { z } from "zod";
import { ServicesAPISchema } from "@/validations/ServicesAPISchema";

interface ServiceState {
  services: z.infer<typeof ServicesAPISchema>[];
  loading: boolean;
  selectedService:z.infer<typeof ServicesAPISchema>;
  setSelectedService:(selectedService:z.infer<typeof ServicesAPISchema>) => void;
  setLoading: () => void;
  setService: (list: z.infer<typeof ServicesAPISchema>[]) => void;
}

export const useService = create<ServiceState>()(
  persist(
    (set) => ({
      services: [],
      loading: false,
      selectedService:{
        name:"",
        description:"",
        category:"",
        currency:"",
        ratings:[],
        appointmentsCount:0,
        max_appointments_per_day:0,
        details:[],
        provider_name:"",
        start_time:"",
        end_time:"",
        duration:0,
        id:"",
        created_at:new Date(),
        user_id:"",
        working_days:[],
        price:0,
        remainingAppointments:0,
      },
      setSelectedService:(selectedService) => set(() => ({selectedService:selectedService})),
      setLoading: () => set((state) => ({ loading: !state.loading })),
      setService: (list) =>
        set(() => ({
          services: list,
        })),
    }),
    {
          name: "services-page-data",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
