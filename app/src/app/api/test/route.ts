import { NextResponse } from "next/server";
import db from "@/db";
import { service } from "@/db/schemas";
import { eq } from "drizzle-orm";


export const GET = async () => {
    const userId = "UmkSdW8hbHjMo5tpQHBV4c5QrxxlluqF"
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

    return NextResponse.json(
        {
            message:"Received data",
            services:servicesData
        }
    )
}