import type { Service } from "@/db/schemas";
import type { Appointment } from "@/db/schemas";

type AppointmentClient = Omit<Appointment, "transfer_group" | 
"customer_email" |
"customer_name" |
"status" |
"booked" |
"created_at" |
"updated_at"> & {
	status:"PENDING" | "COMPLETED" | "CANCELLED" | "REQUESTED-RESCHEDULE"
};

type ServiceData = Service & {
	appointments: AppointmentClient[];
};

type DashboardAPIRequest = {
	userId: string;
};

type ClientService = Omit<Service , "is_active">

export type {
	ClientService,
	ServiceData,
	DashboardAPIRequest,
	AppointmentClient,
};

