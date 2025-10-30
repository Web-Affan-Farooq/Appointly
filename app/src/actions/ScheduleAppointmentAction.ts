"use server";

import db from "@/db";
import { appointment } from "@/db/schemas";
import { inArray } from "drizzle-orm";

const ScheduleAppointmentAction = async (
  appointments: string[]
): Promise<{
  message: string;
  success: boolean;
}> => {
  try {
    await db.update(appointment)
      .set({
        status: "CONFIRMED",
      })
      .where(inArray(appointment.id, appointments));
    return {
      message: "Appointments confirmed successfully",
      success: true,
    };
  } catch (err) {
    console.log(err)
    return {
      message: "An error occured",
      success: false,
    };
  }
};

export default ScheduleAppointmentAction;
