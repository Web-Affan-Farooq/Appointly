import {
    pgTable,
    text,
    uuid,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const reschedule_requests = pgTable("reschedule_requests", {
    id: uuid("id").primaryKey().defaultRandom(),
    previous_slot_id:text("previous_slot_id").notNull(),
    requested_slot_id:text("requested_slot_id").notNull(),
});

export type RescheduleRequests = InferSelectModel<typeof reschedule_requests>
