import db from "@/db";
import { type Service, service } from "@/db/schemas";
import { GenerateSlots } from "@/shared/utils";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

type ReqPayload = Pick<
  Service,
  "id" | "working_days" | "duration" | "start_time" | "end_time"
>;

export const POST = async (req: NextRequest) => {
  const { id, duration, working_days, start_time, end_time }: ReqPayload =
    await req.json();
  let requiredService = null;

  if (!id || !duration || !working_days || !start_time || !end_time) {
    const fetchedService = await db.query.service.findFirst({
      where: eq(service.id, id),
      columns: {
        duration: true,
        working_days: true,
        start_time: true, // "09:00"
        end_time: true, // "21:00"
      },
    });
    requiredService = fetchedService;
  }
  requiredService = {
    id,
    duration,
    working_days,
    start_time,
    end_time,
  };

  const slots = await GenerateSlots(requiredService);

  return NextResponse.json(
    {
      slots: slots,
    },
    {
      status: 200,
    },
  );
};
