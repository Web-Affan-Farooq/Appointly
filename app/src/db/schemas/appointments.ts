import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";
import { service } from "./services";
import { AppointmentStatus } from "./appointment-type"

export const appointment = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  service_id: uuid("service_id")
    .notNull()
    .references(() => service.id, { onDelete: "cascade" }),
  
  // scheduling
  started_on: timestamp("started_on", { withTimezone: true }).notNull(),
  ended_on: timestamp("ended_on", { withTimezone: true }).notNull(),

  // status lifecycle
  status: AppointmentStatus("status").default("PENDING").notNull(),

  // customer info
  customer_name: text("customer_name"),
  customer_email: text("customer_email"),

  // bookkeeping
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
