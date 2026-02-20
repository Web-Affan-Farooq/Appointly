import type { InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const otp_sessions = pgTable("otp_sessions", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  otp: text("otp").notNull(),
  expiration: timestamp("created_at").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
});

export type OTPSessions = InferSelectModel<typeof otp_sessions>;
