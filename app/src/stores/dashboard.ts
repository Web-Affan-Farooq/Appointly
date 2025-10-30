import { create } from "zustand";
import { ServiceData } from "@/@types/types";
import { persist, createJSONStorage } from "zustand/middleware";
import CancelAppointmentAction from "@/actions/AppointmentCancelAction";
import { toast } from "sonner";
import ScheduleAppointmentAction from "@/actions/ScheduleAppointmentAction";

interface DashboardState {
  services: ServiceData[];
  selectedService: ServiceData;
  setServices: (list: ServiceData[]) => void;
  selectService: (service: ServiceData) => void;
  cancelAppointment: (ids: string[]) => void;
  scheduleAppointment: (ids: string[]) => void;
}

export const useDashboard = create<DashboardState>()(
  persist(
    (set, get) => ({
      services: [],
      selectedService: {
        id: "",
        name: "",
        provider_name: "",
        description: "",
        details: [],
        appointments: [],
        max_appointments_per_day: 0,
        duration: 0,
        price: 0,
        category: "",
        ratings: [],
        start_time: "",
        end_time: "",
        working_days: [],
        user_id: "",
        created_at: new Date(),
        currency: "",
        is_active: true,
      },
      setServices: (list) => set(() => ({ services: list })),
      selectService: (service) =>
        set(() => ({
          selectedService: service,
        })),
      cancelAppointment: async (ids) => {
        // _____ Updae in database ...
        const { message, success } = await CancelAppointmentAction(ids);
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
      scheduleAppointment: async (ids) => {
        // _____ Update in database ...
        const { message, success } = await ScheduleAppointmentAction(ids);
        if (!success) {
          toast.error(message);
        }

        // _____ Update state...
        const { selectedService } = get();
        const updatedAppointments = selectedService.appointments.map((app) => {
          if (ids.includes(app.id)) {
            return { ...app, status: "CONFIRMED" };
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
