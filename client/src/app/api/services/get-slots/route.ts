import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import db from "@/db";
import { type Appointment, appointment } from "@/db/schemas";
import dayjs from "@/lib/dayjs";
import { and, eq, gt, not, or } from "drizzle-orm";

type Columns<T> = {
  [K in keyof T]: boolean;
};

type Req = {
  serviceId: string;
  columns: Columns<Appointment>;
};

export const POST = async (req: NextRequest) => {
  const { serviceId, columns }: Req = await req.json();
  try {
    const today = dayjs().format("YYYY-MM-DD");

    /**
     * Selects slots where :
     * 1. service id matched
     * 2. slot date >= today
     * 3. not booked
     */
    const slots = await db.query.appointment.findMany({
      where: and(
        eq(appointment.service_id, serviceId),
        or(gt(appointment.slot_date, today), eq(appointment.slot_date, today)),
        not(appointment.booked),
      ),
      columns: columns,
    });
    return NextResponse.json({ slots }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "An error occured" }, { status: 500 });
  }
};
