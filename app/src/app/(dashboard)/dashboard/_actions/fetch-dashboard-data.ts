"use server";
import { DashboardAPIResponse , ServiceDashboard } from "../types";
import db from "@/db";
import { service } from "@/db/schemas";
import { eq } from "drizzle-orm";

// _____ Action for fetching dashboard data for provider dashboard ...
const fetchDashboardAction = async (
	userId: string,
): Promise<DashboardAPIResponse> => {
	const servicesData = await db.query.service.findMany({
		where: eq(service.user_id, userId),
		with: {
			appointments: {
				columns: {
					created_at:false,
					transfer_group: false, // Important ! dont return appointment transfer group to service providers otherwise they an easily bypass restrictions and transfer all appointments's 100% price to their account
				},
			},
		},
	});

	return {
		services: servicesData as ServiceDashboard[], // ignore this error , appointments are returned
	};
};
export default fetchDashboardAction;
