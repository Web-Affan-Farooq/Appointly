import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { appointment } from "@/db/schemas";
import { InferInsertModel } from "drizzle-orm";
dayjs.extend(utc);

interface SlotInput {
  service_id: string;
  maxAppointments: number;
  durationMinutes: number;
  workingDays: string[];
  startTime: string; // "04:00", "22:00", "00:30", anything
  endTime: string; // same
  daysAhead?: number;
}
const CreateSlots = ({
  service_id,
  maxAppointments,
  durationMinutes,
  workingDays,
  startTime,
  endTime,
  daysAhead = 30,
}: SlotInput) => {
  console.log("Running createSlots() : ---------------------");
  const slots: InferInsertModel<typeof appointment>[] = [];

  const allowedDays = workingDays.map((d) => d.slice(0, 3).toLowerCase());
  const today = dayjs().utc().startOf("day");
  console.log("today : ", today);

  for (let i = 0; i < daysAhead; i++) {
    // _____ For each day in month
    console.log("Calculating : ", allowedDays);
    // ______ Add one day
    const date = today.add(i, "day");
    // _____ check that if service available on curent date , if not skip ...
    const weekdayKey = date.format("ddd").toLowerCase();
    if (!allowedDays.includes(weekdayKey)) continue;

    // ------------------------------------------------
    // 🌙 Build timestamps exactly as user provided
    // ------------------------------------------------
    const start = dayjs.utc(`${date.format("YYYY-MM-DD")} ${startTime}`);
    let end = dayjs.utc(`${date.format("YYYY-MM-DD")} ${endTime}`);

    // If user-provided endTime is earlier than startTime → next day shift
    if (end.isBefore(start)) {
      end = end.add(1, "day");
    }

    const daySlots: InferInsertModel<typeof appointment>[] = [];
    let cursor = start;

    // ------------------------------------------------
    // add the appointment duration in the day and check if its before service off time .. OR both are same
    // ------------------------------------------------
    while (
      cursor.add(durationMinutes, "minute").isBefore(end) ||
      cursor.add(durationMinutes, "minute").isSame(end)
    ) {
      const slotStart = cursor;
      const slotEnd = cursor.add(durationMinutes, "minute");

      daySlots.push({
        service_id,
        start_time: slotStart.toDate(),
        end_time: slotEnd.toDate(),
        slot_date: date.format("YYYY-MM-DD"),
        booked: false,
        token: daySlots.length + 1,
      });

      cursor = slotEnd;
    }

    // ------------------------------------------------
    // enforce daily max
    // ------------------------------------------------
    const finalGroup = daySlots.slice(0, maxAppointments);
    slots.push(...finalGroup);
  }

    slots.sort((a, b) => {
    const dateCompare = dayjs(a.slot_date).valueOf() - dayjs(b.slot_date).valueOf();
    if (dateCompare !== 0) return dateCompare;

    return dayjs(a.start_time).valueOf() - dayjs(b.start_time).valueOf();
  });

  return slots;
};
export default CreateSlots