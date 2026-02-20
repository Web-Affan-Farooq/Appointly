import type { AddServiceAPISchema } from "@/app/(provider)/(dashboard)/add-service/_validations/add-service-api-schema";
import type { NextRequest } from "next/server";
import db from "@/db";
import { NextResponse } from "next/server";
import { service } from "@/db/schemas";

// _____ Libraries ...
import type { z } from "zod";

// ____ Utils ...
import { GenerateSlots } from "@shared/utils";

export const POST = async (req: NextRequest) => {
  const formData: z.infer<typeof AddServiceAPISchema> = await req.json();

  console.log(
    "--------------------- Running addServiceAction () ... -------------------------",
  );
  try {
    const [newService] = await db
      .insert(service)
      .values({
        ...formData,
        maxCapacity: formData.max_capacity,
        user_id: formData.user_id,
      })
      .returning();

    console.log("Inserted a new service  : ", newService);
    console.log("Generating slots  : ", "-------------");
    const slots: { id: string }[] = await GenerateSlots(
      {
        id: true,
      },
      {
        id: newService.id,
        duration: newService.duration,
        working_days: newService.working_days,
        start_time: newService.start_time,
        end_time: newService.end_time,
      },
    );

    console.log(`Generated total ${slots.length} slots ...`);

    console.log(
      "----------------------------Operation completed successfully-----------------------------",
    );

    return NextResponse.json(
      {
        message: "Added a new service",
        service: newService,
        // must sent the empty array instead of appointments list because we are generating future slots and assigning it, not creating appointment on each request
        appointments: [],
      },
      { status: 201 },
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
