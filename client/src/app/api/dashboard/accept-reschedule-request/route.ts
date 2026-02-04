import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import db from "@/db";
import { appointment } from "@/db/schemas";
import { and, eq, gt } from "drizzle-orm";
import dayjs from "@/lib/dayjs";

export const POST = async (req: NextRequest) => {
  try {
    const { previous, target }: { previous: string; target: string } =
      await req.json();

    const date = dayjs().toDate();

    await db.transaction(async (tx) => {
      // _____ find previous slot ...
      const previousSlot = await tx.query.appointment.findFirst({
        where: and(
          eq(appointment.id, previous),
          gt(appointment.start_time, date),
          eq(appointment.booked, true),
          eq(appointment.status, "PENDING"),
        ),
        columns: {
          id: true,
          customer_name: true,
          customer_email: true,
          transfer_group: true,
        },
      });

      // _____ find target slot ...
      const targetSlot = await tx.query.appointment.findFirst({
        where: and(
          eq(appointment.id, target),
          gt(appointment.start_time, date),
          eq(appointment.booked, false),
          eq(appointment.status, "REQUESTED-RESCHEDULE"),
        ),
        columns: {
          id: true,
          customer_name: true,
          customer_email: true,
          transfer_group: true,
        },
      });

      // _____ Return error if any slot is not found  ...

      if (!previousSlot) {
        return NextResponse.json(
          {
            message: "User appointment not found ...",
          },
          { status: 404 },
        );
      } else if (!targetSlot) {
        return NextResponse.json(
          {
            message: "Requested slot not found ...",
          },
          { status: 404 },
        );
      }

      // _____ Attach user data to the new target slot  ...
      await tx
        .update(appointment)
        .set({
          customer_name: previousSlot.customer_name,
          customer_email: previousSlot.customer_email,
          transfer_group: previousSlot.transfer_group,
          booked: true,
        })
        .where(eq(appointment.id, targetSlot.id));

      // _____ Make the previous slot empty ...
      await tx
        .update(appointment)
        .set({
          customer_name: null,
          customer_email: null,
          transfer_group: null,
          booked: false,
        })
        .where(eq(appointment.id, previousSlot.id));
    });

    // _____ Next : Push notification on the account that reschedule is accepted ...

    return NextResponse.json(
      {
        message: "Request accepted",
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(JSON.stringify(err));
    return NextResponse.json(
      {
        message: "An error occured",
      },
      { status: 500 },
    );
  }
};
