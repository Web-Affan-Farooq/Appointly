import { NextResponse } from "next/server";
import db from "@/db";
import { appointment } from "@/db/schemas";
import { gte , and , eq} from "drizzle-orm";
import dayjs from "dayjs";

export const GET = async () => {
    const appointments = await db.query.appointment.findMany({
      where: and(
        eq(appointment.customer_email,".com"),
        gte(appointment.start_time , dayjs().toDate()),
        eq(appointment.booked, true)
      ),
      columns: {
        transfer_group: false,
        created_at: false,
        customer_name: false,
        // customer_email: false,
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

    return NextResponse.json(
      {
        appointments
      }
    )
  }