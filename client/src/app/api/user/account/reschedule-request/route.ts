import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import db from "@/db";
import { appointment, reschedule_requests } from "@/db/schemas";
import { eq } from "drizzle-orm";

export const POST = async (req: NextRequest) => {
  const {
    prevSlotId,
    reqSlotId,
  }: {
    prevSlotId: string;
    reqSlotId: string;
  } = await req.json();

  if (!prevSlotId || !reqSlotId) {
    return NextResponse.json(
      {
        message: "Invalid slot data",
      },
      { status: 422 },
    );
  }

  if (prevSlotId === reqSlotId) {
    return NextResponse.json(
      {
        message: "Requested slot must be different",
      },
      { status: 500 },
    );
  }

  try {
    await db.transaction(async (tx) => {
      // 1️⃣ Ensure appointment exists
      const existing = await tx.query.appointment.findFirst({
        where: eq(appointment.id, prevSlotId),
      });

      if (!existing) {
        return NextResponse.json(
          {
            message: "Appointment does not exists",
          },
          { status: 401 },
        );
      }

      // 2️⃣ Create reschedule request
      await tx.insert(reschedule_requests).values({
        previous_slot_id: prevSlotId,
        requested_slot_id: reqSlotId,
      });

      // 3️⃣ Update only THAT appointment
      await tx
        .update(appointment)
        .set({ status: "REQUESTED-RESCHEDULE" })
        .where(eq(appointment.id, prevSlotId));
    });

    return NextResponse.json(
      {
        message: "Reschedule request created",
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Reschedule error:", err);

    return NextResponse.json(
      {
        message: "Failed to create reschedule request",
      },
      { status: 500 },
    );
  }
};
