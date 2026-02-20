import type { ServiceDashboard } from "@/app/(provider)/(dashboard)/dashboard/_types";
import db from "@/db";
import { service, appointment } from "@/db/schemas";
import { eq, and, gt } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import dayjs from "@/lib/dayjs";

// _____ Route for fetching dashboard data for provider dashboard ...
export const POST = async (req: NextRequest) => {
  const { userId }: { userId: string } = await req.json();
  const today = dayjs().format("YYYY-MM-DD");

  const servicesData = await db.query.service.findMany({
    where: eq(service.user_id, userId),
    with: {
      appointments: {
        where: and(
          eq(appointment.booked, true),
          gt(appointment.slot_date, today),
        ),
        columns: {
          created_at: false,
          transfer_group: false,
        },
      },
    },
  });

  return NextResponse.json({
    services: servicesData as ServiceDashboard[], // ignore this error , appointments are returned
  });
};
