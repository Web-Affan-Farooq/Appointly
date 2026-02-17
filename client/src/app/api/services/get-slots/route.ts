import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import db from "@/db";
import { type Appointment, type Service, appointment } from "@/db/schemas";
import dayjs from "@/lib/dayjs";
import { and, eq, gt, not, or } from "drizzle-orm";
import { GenerateSlots } from "@/shared/utils";

type Payload = Pick<
  Service,
  "id" | "duration" | "working_days" | "start_time" | "end_time"
>;

type Columns<T> = {
  [K in keyof T]: boolean;
};

type Req = Payload & {
  columns: Partial<Columns<Appointment>>;
};

export const POST = async (req: NextRequest) => {
  const { id, duration, working_days, start_time, end_time, columns }: Req =
    await req.json();

  const today = dayjs().format("YYYY-MM-DD");
  try {
    /**
     * Selects slots where :
     * 1. service id matched
     * 2. slot date >= today
     * 3. not booked
     */
    const slots = await db.query.appointment.findMany({
      where: and(
        eq(appointment.service_id, id),
        or(gt(appointment.slot_date, today), eq(appointment.slot_date, today)),
        not(appointment.booked),
      ),
      columns: columns,
    });

    if (slots.length === 0) {
      GenerateSlots(columns, {
        id,
        duration,
        working_days,
        start_time,
        end_time,
      });
    }
    return NextResponse.json({ slots }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "An error occured" }, { status: 500 });
  }
};
