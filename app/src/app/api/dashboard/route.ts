import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import db from "@/db";
import { service } from "@/db/schemas";
import { eq } from "drizzle-orm";

export const POST = async (req:NextRequest) => {
    const {userId} = await req.json();

    const servicesData = await db.select().from(service).where(eq(service.user_id, userId));

    return NextResponse.json(
        {
            data:{
                services:servicesData,
            }
        }
    )
}