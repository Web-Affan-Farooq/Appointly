import {pgTable,time ,text,uuid, varchar,integer, timestamp,boolean, pgEnum} from "drizzle-orm/pg-core";
import { user } from "./users";

export const WeekDays = pgEnum("weekdays",[
    "MONDAY",
    "TUESDAYs",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
]);

export const service = pgTable("services",{
    id:uuid("id").primaryKey().defaultRandom(),
    created_at:timestamp("created_at").defaultNow(),
    user_id:text("user_id").notNull().references(() => user.id, {onDelete:"cascade"}),
    name:varchar("name").notNull(),
    description:varchar("description",{length:400}).notNull(),
    price:integer("price"),
    currency:varchar("currency").notNull(),
    is_active:boolean("is_active").default(true),
    working_days:WeekDays("working_days").array().notNull(),
    start_time:time("start_time").notNull(),
    end_time:time("end_time").notNull(),
    duration:integer("duration").notNull(),
    max_appointments_per_day:integer("max_appointments_per_day"),
    ratings:integer("ratings").array().default([])
});