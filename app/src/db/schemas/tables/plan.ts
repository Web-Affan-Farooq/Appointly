import { pgEnum } from "drizzle-orm/pg-core";

export const PlanEnum = pgEnum("plan",["FREE","PRIMARY","PREMIUM"])