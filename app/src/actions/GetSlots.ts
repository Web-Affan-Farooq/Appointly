"use server"
import db from "@/db";
import { appointment } from "@/db/schemas";
import { and, eq, gt } from "drizzle-orm";
import dayjs from "dayjs";

const GetSlots = async (service_id: string) => {
  const today = dayjs().utc().format("YYYY-MM-DD");

  const slots = await db
    .select()
    .from(appointment)
    .where(
      and(
        eq(appointment.service_id, service_id),
        gt(appointment.slot_date, today)
      )
    );

  return slots;
};

export default GetSlots