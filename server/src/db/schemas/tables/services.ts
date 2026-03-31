import {
  pgTable,
  time,
  text,
  uuid,
  varchar,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { user } from "./users";
import type { InferSelectModel } from "drizzle-orm";

export const service = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  provider_name: varchar("provider_name").notNull(),
  category: varchar("category").notNull(),
  description: varchar("description", { length: 400 }).notNull(),
  price: integer("price").notNull(),
  currency: varchar("currency").notNull(),
  is_active: boolean("is_active").default(true).notNull(),
  working_days: text("working_days").array().notNull(),
  start_time: time("start_time").notNull(),
  end_time: time("end_time").notNull(),
  duration: integer("duration").notNull(),
  max_appointments_per_day: integer("max_appointments_per_day").notNull(),
  ratings: integer("ratings").array().default([]).notNull(),
  details: text("details").array().default([]).notNull(),

  maxCapacity: integer("max_capacity").default(1).notNull(),
  last_generated: timestamp("last_count_reset").defaultNow().notNull(),
});

export type Service = InferSelectModel<typeof service>;
