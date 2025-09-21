"use server";
import { AppointmentObjectSecured, DashboardAPIResponse } from "@/@types/types";
import db from "@/db";
import { service } from "@/db/schemas";
import { eq, InferSelectModel } from "drizzle-orm";

type ServicesData = InferSelectModel<typeof service> & {
    appointments:AppointmentObjectSecured[]
}
// _____ Action for fetching dashboard data for provider dashboard ...
const fetchDashboardAction = async (userId:string):Promise<DashboardAPIResponse>=> {
    const servicesData = await db.query.service.findMany({
            where:eq(service.user_id, userId),
            with:{
                appointments:{
                    columns: {
                        transfer_group:false,  // Important ! dont return appointment transfer group to service providers otherwise they an easily bypass restrictions and transfer all appointments's 100% price to their account 
                    }
                },
            }
        });

    return {
        services:servicesData as ServicesData[]// ignore this error , appointments are returned
    }
}
export default fetchDashboardAction;