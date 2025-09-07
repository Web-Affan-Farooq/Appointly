import { pgTable ,uuid, varchar,integer, timestamp,boolean} from "drizzle-orm/pg-core";
import { user } from "./users";

export const service = pgTable("services",{
    id:uuid("id").primaryKey().defaultRandom(),
    user_id:uuid("user_id").notNull().references(() => user.id, {onDelete:"cascade"}),
    name:varchar("name").notNull(),
    description:varchar("description",{length:400}).notNull(),
    duration:integer("duration"),
    price:integer("price"),
    currency:varchar("currency").notNull(),
    max_appointments_per_day:integer("max_appointments_per_day"),
    is_active:boolean("is_active").default(true),
    created_at:timestamp("created_at").defaultNow(),
})