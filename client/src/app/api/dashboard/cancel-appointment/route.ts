import db from "@/db";
import { appointment } from "@/db/schemas";
import { inArray } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { appointments }: { appointments: string[] } = await req.json();
  try {
    await db
      .update(appointment)
      .set({
        status: "CANCELLED",
      })
      .where(inArray(appointment.id, appointments));
    return NextResponse.json(
      {
        message: "Appointments cancelled successfully",
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "An error occured",
      },
      { status: 500 },
    );
  }
};
