import { pgEnum } from "drizzle-orm/pg-core";

export const AppointmentStatus= pgEnum("appointment_status",["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "REQUESTED"])

