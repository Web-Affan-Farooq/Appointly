import {
	date,
	pgTable,
	uuid,
	timestamp,
	text,
	boolean,
	integer,
} from "drizzle-orm/pg-core";
import { service } from "./services";
import { AppointmentStatus } from "./appointment-type";
import { InferSelectModel } from "drizzle-orm";

export const appointment = pgTable("appointments", {
	id: uuid("id").primaryKey().defaultRandom().notNull(),
	service_id: uuid("service_id")
		.notNull()
		.references(() => service.id, { onDelete: "cascade" }),

	// bookkeeping
	created_at: timestamp("created_at").defaultNow().notNull(),
	updated_at: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),

	// customer info
	customer_name: text("customer_name"),
	customer_email: text("customer_email"),

	// status lifecycle
	status: AppointmentStatus("status").default("PENDING").notNull(),

	// Payment intent ...
	transfer_group: text(),
	// scheduling
	start_time: timestamp("start_time", { withTimezone: true }).notNull(),
	end_time: timestamp("end_time", { withTimezone: true }).notNull(),
	token: integer("token").notNull(),

	slot_date: date("slot_date").notNull(),
	booked:boolean().default(false).notNull()
});

export type Appointment = InferSelectModel<typeof appointment>;

/*
slot_date: indicates the slot 
*/
