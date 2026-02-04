import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const GET = async () => {
  const clientHeaders = await headers();
  await auth.api.signOut({
    headers: clientHeaders,
  });
  return NextResponse.json({ message: "Logout successfull" }, { status: 200 });
};
