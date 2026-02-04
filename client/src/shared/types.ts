import type { Service } from "@/db/schemas";
import type { Appointment } from "@/db/schemas";

// ______ Type of appointment in all user facing pages ...
type AppointmentClient = Omit<
  Appointment,
  | "transfer_group"
  | "updated_at"
  | "customer_email"
  | "customer_name"
  | "status"
  | "booked"
> & {
  status: "PENDING" | "COMPLETED" | "CANCELLED" | "REQUESTED-RESCHEDULE";
};

// ______ Type of all services fetched in user facing pages ...
type ServiceData = Service & {
  appointments: AppointmentClient[];
};

type ClientService = Omit<Service, "is_active">;

export type { ClientService, ServiceData, AppointmentClient };
