import { pgTable ,uuid, varchar, timestamp} from "drizzle-orm/pg-core";

const service = pgTable("services",{
    id:uuid("id").primaryKey().defaultRandom(),
    name:varchar("name").notNull(),
    createdAt:timestamp().defaultNow()
})