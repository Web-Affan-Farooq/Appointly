import type { Appointment, Service } from "@/db/schemas";

type AppointmentDashboard = Omit<
  Appointment,
  "transfer_group" | "status" | "created_at"
> & {
  status: "PENDING" | "COMPLETED" | "CANCELLED" | "REQUESTED-RESCHEDULE";
};

// ______ Type of all services fetched in user facing pages ...

type ServiceDashboard = Service & {
  appointments: AppointmentDashboard[];
};

type DashboardAPIResponse = {
  services: ServiceDashboard[];
};

export type { AppointmentDashboard, DashboardAPIResponse, ServiceDashboard };
