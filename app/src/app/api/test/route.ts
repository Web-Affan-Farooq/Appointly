import { NextResponse } from "next/server";
import db from "@/db";
import { appointment   } from "@/db/schemas";
import { and, eq } from "drizzle-orm";

export const GET = async () =>{
        const appointments = await db.query.appointment.findMany({
          where: and(
            eq(appointment.customer_email,"example@gmail.com" ),
            eq(appointment.booked, true)
          ),
          columns:{
            transfer_group:false,
            created_at:false,
            customer_name:false,
            customer_email:false,
            booked:false,
          },
          with: {
            service:{
              columns: {
                is_active:false,
                max_appointments_per_day:false,
                lastCountReset:false,
                maxCapacity:false
              },
              with: {
                user:true
              }
            }
          }
        });

    return NextResponse.json({
        appointments
    })
}