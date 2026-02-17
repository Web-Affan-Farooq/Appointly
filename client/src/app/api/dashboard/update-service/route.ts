import db from "@/db";
import { eq, type InferSelectModel } from "drizzle-orm";
import { service } from "@/db/schemas";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    id,
    updatedFields,
  }: { id: string; updatedFields: Partial<InferSelectModel<typeof service>> } =
    await req.json();

  console.log("Data recieved : ", updatedFields);
  try {
    await db.update(service).set(updatedFields).where(eq(service.id, id));
    return NextResponse.json(
      {
        message: "Details updated successfully",
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
