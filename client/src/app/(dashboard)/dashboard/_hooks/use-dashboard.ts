// _____ Libraries ...
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

// _____ Types and schemas  ...
import { ServiceDashboard } from "../_types";

// _____ Server actions ...
import {cancelAppointmentAction} from "../_actions/cancel-appointment";
type Profile = {
  id: string;
  email: string;
  name: string;
  image?: string | null | undefined;
};

interface DashboardState {
  user: undefined | Profile;
  setUser: (user: Profile) => void;

  loading: boolean;
  setLoading: (state: boolean) => void;

  services: ServiceDashboard[];
  addService: (serviceDashboard: ServiceDashboard) => void;
  selectedService: ServiceDashboard;
  setServices: (list: ServiceDashboard[]) => void;
  selectService: (service: ServiceDashboard) => void;
  cancelAppointment: (ids: string[]) => void;
}

export const useDashboard = create<DashboardState>()(
  persist(
    (set, get) => ({
      user: undefined,
      setUser: (user) =>
        set({
          user: user,
        }),

      loading: false,
      setLoading: (loading) =>
        set({
          loading: loading,
        }),

      services: [],

      // ____Function for adding service and updating state ...
      addService: async (serviceDashboard) => {
          return set((state) => ({
            services: [...state.services, serviceDashboard],
          }));
      },

      // _____Initialize the selected service state ...
      selectedService: {
        name: "",
        description: "",
        category: "",
        currency: "",
        ratings: [],
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
        last_generated: new Date(),
        is_active: false,
        maxCapacity: 0,
        appointments: [],
      },

      // ____ Setter function for updating the services list ...
      setServices: (list) => set(() => ({ services: list })),

      // ____ For selecting service ...
      selectService: (service) =>
        set(() => ({
          selectedService: service,
        })),

      // ____ For appointments cancellation...
      cancelAppointment: async (ids) => {
        // _____ Updae in database ...
        const { message, success } = await cancelAppointmentAction(ids);
        if (!success) {
          toast.error(message);
        }

        // _____ Update state...
        const { selectedService } = get();
        const updatedAppointments = selectedService.appointments.map((app) => {
          if (ids.includes(app.id)) {
            return { ...app, status: "CANCELLED" };
          } else return app;
        });

        toast.success(message);

        return set((state) => ({
          selectedService: { ...state.selectedService, updatedAppointments },
        }));
      },
    }),
    {
      name: "dashboard-data",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
