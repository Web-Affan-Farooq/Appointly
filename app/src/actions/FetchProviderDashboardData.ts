"use server";
import db from "@/db";
import { service, user } from "@/db/schemas";
import { eq } from "drizzle-orm";


// _____ Action for fetching dashboard data for provider dashboard ...
const fetchDashboardAction = async (userId:string) => {
    const servicesData = await db.select().from(service).where(eq(service.user_id, user.id));
}
export default fetchDashboardAction;