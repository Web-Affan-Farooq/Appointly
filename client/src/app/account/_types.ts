import type { Appointment, Service } from "@/db/schemas";

type ServiceProfile = Omit<
  Service,
  | "created_at"
  | "user_id"
  | "is_active"
  | "max_appointments_per_day"
  | "lastCountReset"
  | "maxCapacity"
> & {
  user: {
    name: string;
    email: string;
  };
};

type AppointmentProfile = Omit<
  Appointment,
  | "transfer_group"
  | "updated_at"
  | "customer_name"
  | "customer_email"
  | "booked"
> & {
  service: ServiceProfile;
};

export type { AppointmentProfile, ServiceProfile };
