import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const arr = req.json();

  console.log(`Array : ${arr}`);
  // try {
  //     const reschedules = await db.select().from(reschedule_requests).where()
  // } catch (err) {
  // }
  return NextResponse.json({
    message: "response",
  });
};
