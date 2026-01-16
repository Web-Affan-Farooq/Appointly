"use server"

import db from "@/db"
import { appointment, reschedule_requests } from "@/db/schemas"
import { eq } from "drizzle-orm"

export const createRescheduleRequest = async (
  prevSlotId: string,
  reqSlotId: string
):Promise<{
    message:string;
    success:boolean
}> => {
  if (!prevSlotId || !reqSlotId) {
    return {
      success:false,
      message: "Invalid slot data"
    }
  }

  if (prevSlotId === reqSlotId) {
    return {
      success:false,
      message: "Requested slot must be different"
    }
  }

  try {
    await db.transaction(async (tx) => {
      // 1️⃣ Ensure appointment exists
      const existing = await tx.query.appointment.findFirst({
        where: eq(appointment.id, prevSlotId)
      })

      if (!existing) {
        throw new Error("Appointment not found")
      }

      // 2️⃣ Create reschedule request
      await tx.insert(reschedule_requests).values({
        previous_slot_id: prevSlotId,
        requested_slot_id: reqSlotId,
      })

      // 3️⃣ Update only THAT appointment
      await tx
        .update(appointment)
        .set({ status: "REQUESTED-RESCHEDULE" })
        .where(eq(appointment.id, prevSlotId))
    })

    return {
      success:true,
      message: "Reschedule request created"
    }

  } catch (err) {
    console.error("Reschedule error:", err)

    return {
      success:false,
      message: "Failed to create reschedule request"
    }
  }
}
