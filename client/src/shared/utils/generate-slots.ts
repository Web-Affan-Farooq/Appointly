import dayjs from "@/lib/dayjs";
import db from "@/db";
import { appointment, service } from "@/db/schemas";
import type { Appointment, Service } from "@/db/schemas";
import { eq } from "drizzle-orm";

type Payload = Pick<
  Service,
  "id" | "working_days" | "duration" | "start_time" | "end_time"
>;

type Fields = {
  [K in keyof Partial<Appointment>]: boolean;
};

interface Slot {
  service_id: string;
  start_time: Date;
  end_time: Date;
  slot_date: string;
  booked: boolean;
  token: number;
}

export async function GenerateSlots<K extends keyof Appointment>(
  fields: Fields,
  payload: Payload,
): Promise<Pick<Appointment, K>[]> {
  const { id, duration, working_days, start_time, end_time } = payload;

  const daysAhead = 30;
  const slots: Slot[] = [];

  const allowedDays = working_days.map((d) => d.slice(0, 3).toLowerCase());

  const today = dayjs().startOf("day");

  for (let i = 0; i < daysAhead; i++) {
    const date = today.add(i, "day");
    const weekdayKey = date.format("ddd").toLowerCase();

    if (!allowedDays.includes(weekdayKey)) continue;

    const start = dayjs(`${date.format("YYYY-MM-DD")} ${start_time}`);

    let end = dayjs(`${date.format("YYYY-MM-DD")} ${end_time}`);

    if (end.isBefore(start)) {
      end = end.add(1, "day");
    }

    let cursor = start;
    let token = 1;

    while (
      cursor.add(duration, "minute").isBefore(end) ||
      cursor.add(duration, "minute").isSame(end)
    ) {
      const slotEnd = cursor.add(duration, "minute");

      slots.push({
        service_id: id,
        start_time: cursor.toDate(),
        end_time: slotEnd.toDate(),
        slot_date: date.format("YYYY-MM-DD"),
        booked: false,
        token,
      });

      cursor = slotEnd;
      token++;
    }
  }

  let slotData: Pick<Appointment, K>[] = [];

  await db.transaction(async (tx) => {
    // Build returning selection dynamically
    const returningFields = Object.keys(fields).reduce(
      (acc, key) => {
        acc[key as K] = appointment[key as K];
        return acc;
      },
      {} as Record<K, any>,
    );

    slotData = await tx
      .insert(appointment)
      .values(slots)
      .returning(returningFields);

    await tx
      .update(service)
      .set({
        last_generated: dayjs().toDate(),
      })
      .where(eq(service.id, id));
  });

  // Safe sort only if required fields include these keys
  slotData.sort((a, b) => {
    const dateA = "slot_date" in a ? dayjs(a.slot_date as string).valueOf() : 0;

    const dateB = "slot_date" in b ? dayjs(b.slot_date as string).valueOf() : 0;

    if (dateA !== dateB) return dateA - dateB;

    const startA =
      "start_time" in a ? dayjs(a.start_time as Date).valueOf() : 0;

    const startB =
      "start_time" in b ? dayjs(b.start_time as Date).valueOf() : 0;

    return startA - startB;
  });

  return slotData;
}
