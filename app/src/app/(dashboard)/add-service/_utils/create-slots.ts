import dayjs from "dayjs";

interface SlotInput {
  service_id: string;
  durationMinutes: number;
  workingDays: string[];  
  startTime: string;       // "09:00"
  endTime: string;         // "21:00"
  daysAhead?: number;
}

interface Slot {
        service_id:string;
        start_time: Date,
        end_time: Date
        slot_date: string
        booked: boolean,
        token: number,
      }

export default function CreateSlots({
  service_id,
  durationMinutes,
  workingDays,
  startTime,
  endTime,
  daysAhead = 30,
}: SlotInput) {
  
  const slots: Slot[] = [];
  const allowedDays = workingDays.map((d) => d.slice(0, 3).toLowerCase());
  const today = dayjs().startOf("day"); // LOCAL, not UTC

  for (let i = 0; i < daysAhead; i++) {
        const date = today.add(i, "day");
    const weekdayKey = date.format("ddd").toLowerCase();
    if (!allowedDays.includes(weekdayKey)) continue;

    // --------------------------------------------------
    // BUILD LOCAL DATE START/END TIMES
    // --------------------------------------------------
    const start = dayjs(`${date.format("YYYY-MM-DD")} ${startTime}`);
    let end = dayjs(`${date.format("YYYY-MM-DD")} ${endTime}`);

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
      cursor.add(durationMinutes, "minute").isBefore(end) ||
      cursor.add(durationMinutes, "minute").isSame(end)
    ) {
      const slotStart = cursor;
      const slotEnd = cursor.add(durationMinutes, "minute");

      daySlots.push({
        service_id,
        start_time: slotStart.toDate(),  // LOCAL Date object
        end_time: slotEnd.toDate(),
        slot_date: date.format("YYYY-MM-DD"),
        booked: false,
        token: daySlots.length + 1,
      });

      cursor = slotEnd;
    }

    slots.push(...daySlots);
  }

  // sort properly
  slots.sort((a, b) => {
    const d = dayjs(a.slot_date).valueOf() - dayjs(b.slot_date).valueOf();
    if (d !== 0) return d;
    return dayjs(a.start_time).valueOf() - dayjs(b.start_time).valueOf();
  });

  return slots;
}