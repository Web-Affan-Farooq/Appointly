// _____ Libraries ...
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { z } from "zod";

// _____ Types and schemas  ...
import { ServiceData } from "@/@types/types";
import { AddServiceAPIRequest } from "@/validations/AddServiceAPISchema";

// _____ Server actions ...
import CancelAppointmentAction from "@/actions/AppointmentCancelAction";
import { addServiceAction } from "@/components/pages/AddService/action";

interface DashboardState {
	services: ServiceData[];
	addService: (serviceData: z.infer<typeof AddServiceAPIRequest>) => void;
	selectedService: ServiceData;
	setServices: (list: ServiceData[]) => void;
	selectService: (service: ServiceData) => void;
	cancelAppointment: (ids: string[]) => void;
	// scheduleAppointment: (ids: string[]) => void;
}

export const useDashboard = create<DashboardState>()(
	persist(
		(set, get) => ({
			services: [],

			// ____Function for adding service and updating state ...
			addService: async (serviceData) => {
				// ___ 1. Call the server action ...
				const { message, success, service } =
					await addServiceAction(serviceData);

				// ___ 2. If it returns service , update the state ...
				if (service && success) {
					toast.success(message);

					return set((state) => ({
						services: [...state.services, service],
					}));
				}
			},

			// _____Initialize the selected service state ...
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
				lastCountReset: new Date(),
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

			// scheduleAppointment: async (ids) => {
			// 	// _____ Update in database ...
			// 	const { message, success } = await ScheduleAppointmentAction(ids);
			// 	if (!success) {
			// 		toast.error(message);
			// 	}

			// 	// _____ Update state...
			// 	const { selectedService } = get();
			// 	const updatedAppointments = selectedService.appointments.map((app) => {
			// 		if (ids.includes(app.id)) {
			// 			return { ...app, status: "CONFIRMED" };
			// 		} else return app;
			// 	});

			// 	toast.success(message);

			// 	return set((state) => ({
			// 		selectedService: { ...state.selectedService, updatedAppointments },
			// 	}));
			// },
		}),
		{
			name: "dashboard-data",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
