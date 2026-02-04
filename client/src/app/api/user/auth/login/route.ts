import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { z } from "zod";
import type { LoginFormSchema } from "@shared/validations";

export const POST = async (req: NextRequest) => {
  const { email, password }: z.infer<typeof LoginFormSchema> = await req.json();

  try {
    await auth.api.signInEmail({
      body: { email, password },
    });

    return NextResponse.json(
      {
        message: "Login successfull",
      },
      { status: 200 },
    );

    // biome-ignore   lint/suspicious/noExplicitAny:dont need to explicitly declare entire type of NextResponse.
  } catch (err: any) {
    console.log(err);

    return NextResponse.json(
      {
        message: err.body.message,
      },
      { status: err.statusCode },
    );
  }
};
