"use server";

import db from "@/db";
import { appointment } from "@/db/schemas";
import { eq, and, gte } from "drizzle-orm";
import { AppointmentProfile } from "../_types";
import dayjs from "dayjs";

export const GetAppointments = async (email:string): Promise<{
  message: string;
  statusCode: 200 | 500; 
  appointments?: AppointmentProfile[]
}> => {
  try {
    const appointments = await db.query.appointment.findMany({
      where: and(
        eq(appointment.customer_email,email),
        gte(appointment.start_time , dayjs().toDate()),
        eq(appointment.booked, true)
      ),
      columns: {
        transfer_group: false,
        created_at: false,
        customer_name: false,
        customer_email: false,
        booked: false,
      },
      with: {
        service: {
          columns: {
            created_at: false,
            user_id: false,
            is_active: false,
            max_appointments_per_day: false,
            last_generated: false,
            maxCapacity: false
          },
          with: {
            user: {
              columns: {
                name: true,
                email: true,
              }
            }
          }
        }
      }
    });
    return {
      message: "Data fetched successfully",
      statusCode: 200,
      appointments: appointments as AppointmentProfile[],
    }
  } catch (err) {
    console.log("An error occured", err)
    return {
      message: "An error occured",
      statusCode: 500,

    }
  }

}