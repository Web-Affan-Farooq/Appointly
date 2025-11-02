import { pgTable, uuid, timestamp, text , integer} from "drizzle-orm/pg-core";
import { service } from "./services";
import { AppointmentStatus } from "./appointment-type"
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
  customer_name: text("customer_name").notNull(),
  customer_email: text("customer_email").notNull(),

    // status lifecycle
  status: AppointmentStatus("status").default("PENDING").notNull(),

    // Payment intent ...
    transfer_group:text(),
  // scheduling
  started_on: timestamp("started_on", { withTimezone: true }),
  ended_on: timestamp("ended_on", { withTimezone: true }),
  token:integer("token").notNull()
});

export type Appointment = InferSelectModel<typeof appointment>