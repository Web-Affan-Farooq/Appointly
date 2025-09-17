import type { Service } from "@/db/schemas";
import type { Appointment } from "@/db/schemas";

type AppointmentObjectSecured = Omit<Appointment, "transfer_group">;
type ServiceData = Service & {
    appointments:AppointmentObjectSecured[]
}

type DashboardAPIResponse = {
    services:ServiceData[]
}
type DashboardAPIRequest = {
    userId:string;
}

export type {
    ServiceData,
    DashboardAPIResponse,
    DashboardAPIRequest,
    AppointmentObjectSecured
}