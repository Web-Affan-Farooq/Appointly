import dayjs from "@/lib/dayjs";
import db from "@/db";
import { appointment, service } from "@/db/schemas";
import type { Appointment, Service } from "@/db/schemas";

type Payload = Pick<
  Service,
  "id" | "working_days" | "duration" | "start_time" | "end_time"
>;

interface Slot {
  service_id: string;
  start_time: Date;
  end_time: Date;
  slot_date: string;
  booked: boolean;
  token: number;
}

export async function GenerateSlots({
  id,
  duration,
  working_days,
  start_time,
  end_time,
}: Payload) {
  const daysAhead = 30;

  const slots: Slot[] = [];
  const allowedDays = working_days.map((d) => d.slice(0, 3).toLowerCase());
  const today = dayjs().startOf("day"); // LOCAL, not UTC

  for (let i = 0; i < daysAhead; i++) {
    const date = today.add(i, "day");
    const weekdayKey = date.format("ddd").toLowerCase();
    if (!allowedDays.includes(weekdayKey)) continue;

    // --------------------------------------------------
    // BUILD LOCAL DATE START/END TIMES
    // --------------------------------------------------
    const start = dayjs(`${date.format("YYYY-MM-DD")} ${start_time}`);
    let end = dayjs(`${date.format("YYYY-MM-DD")} ${end_time}`);

    // If end < start → next-day service
    if (end.isBefore(start)) {
      end = end.add(1, "day");
    }

    const daySlots: Slot[] = [];
    let cursor = start;

    // --------------------------------------------------
    // LOOP THROUGH SLOTS
    // --------------------------------------------------
    while (
      cursor.add(duration, "minute").isBefore(end) ||
      cursor.add(duration, "minute").isSame(end)
    ) {
      const slotStart = cursor;
      const slotEnd = cursor.add(duration, "minute");

      daySlots.push({
        service_id: id,
        start_time: slotStart.toDate(), // LOCAL Date object
        end_time: slotEnd.toDate(),
        slot_date: date.format("YYYY-MM-DD"),
        booked: false,
        token: daySlots.length + 1,
      });

      cursor = slotEnd;
    }

    slots.push(...daySlots);
  }

  let slotData: Appointment[] = [];

  await db.transaction(async (tx) => {
    slotData = (await tx
      .insert(appointment)
      .values(slots)
      .returning()) as Appointment[];

    await db.update(service).set({
      last_generated: dayjs().toDate(),
    });
  });

  // sort properly
  slotData.sort((a, b) => {
    const d = dayjs(a.slot_date).valueOf() - dayjs(b.slot_date).valueOf();
    if (d !== 0) return d;
    return dayjs(a.start_time).valueOf() - dayjs(b.start_time).valueOf();
  });

  return slotData;
}
