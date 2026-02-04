import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import db from "@/db";
import { service } from "@/db/schemas";
import { eq } from "drizzle-orm";

export const POST = async (req: NextRequest) => {
  const { userId } = await req.json();
  const serviceData = await db.query.service.findMany({
    where: eq(service.user_id, userId),
    with: {
      appointments: {
        columns: {
          transfer_group: false,
        },
      },
    },
  });

  return NextResponse.json({
    data: {
      services: serviceData,
    },
  });
};
