import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import db from "@/db";
import { appointment } from "@/db/schemas";
import { eq, and, gte } from "drizzle-orm";
import type { AppointmentProfile } from "../../../../account/_types";
import dayjs from "dayjs";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();
  try {
    const appointments = await db.query.appointment.findMany({
      where: and(
        eq(appointment.customer_email, email),
        gte(appointment.start_time, dayjs().toDate()),
        eq(appointment.booked, true),
      ),
      columns: {
        transfer_group: false,
        created_at: false,
        updated_at: false,
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
            maxCapacity: false,
          },
          with: {
            user: {
              columns: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Data fetched successfully",
        appointments: appointments as AppointmentProfile[],
      },
      { status: 200 },
    );
  } catch (err) {
    console.log("An error occured", err);
    return NextResponse.json(
      {
        message: "An error occured",
        statusCode: 500,
      },
      { status: 200 },
    );
  }
};
