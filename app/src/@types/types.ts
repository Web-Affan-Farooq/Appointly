import { z } from "zod";
import { ServicesAPISchema } from "@/app/services/_validations/services-api-schema";
import type { Service } from "@/db/schemas";
import type { Appointment } from "@/db/schemas";

type AppointmentObjectSecured = Omit<Appointment, "transfer_group">;
type ServiceData = Service & {
	appointments: AppointmentObjectSecured[];
};

type DashboardAPIResponse = {
	services: ServiceData[];
};
type DashboardAPIRequest = {
	userId: string;
};

type ClientService = z.infer<typeof ServicesAPISchema>

export type {
	ClientService,
	ServiceData,
	DashboardAPIResponse,
	DashboardAPIRequest,
	AppointmentObjectSecured,
};

