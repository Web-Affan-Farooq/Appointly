import { pgEnum } from "drizzle-orm/pg-core";

export const AppointmentStatus= pgEnum("appointment_status",["PENDING", "COMPLETED", "CANCELLED"])

/*
pending -----  > appointment booked and slot alloted 
completed  ---- > userattended the appointment 
cancelled ------> provider has cancelled the appointment .
*/
