import { Appointment, Service } from "@/db/schemas";

// type exm extends Omit<Service, "">
type ServiceProfile= Omit<Service , 
          "created_at"|
          "user_id"|
          "is_active"|
          "max_appointments_per_day"|
          "lastCountReset"|
          "maxCapacity"
          >  & 
          {
  user: {
    name: string;
    email: string;
  };
}

type AppointmentProfile = Omit<
  Appointment,
  | "transfer_group"
  | "created_at"
  | "customer_name"
  | "customer_email"
  | "booked"
> & {
 service:ServiceProfile
}

export type { AppointmentProfile, ServiceProfile };
