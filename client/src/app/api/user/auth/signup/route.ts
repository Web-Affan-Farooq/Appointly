import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import type z from "zod";
import type { UserSignupFormSchema } from "@/app/(Auth-user)/signup-user/_validations";
// import bunyan from "bunyan";

// const logger = bunyan.createLogger({ name: "User Signup logger" });

export const POST = async (req: NextRequest) => {
  const body: z.infer<typeof UserSignupFormSchema> = await req.json();
  try {
    // logger.info("20 : Running user signup ...");
    const data = await auth.api.signUpEmail({
      body: {
        ...body,
        callbackURL: `${process.env.BETTER_AUTH_URL}/account`,
      },
    });
    // logger.info("27 : Signup successfull ... ", { ...data });
    return NextResponse.json(
      {
        data: {
          name: data.user.name,
          email: data.user.email,
        },
        message: "Signup successfull",
      },
      { status: 201 },
    );
    // biome-ignore lint/suspicious/noExplicitAny:dont need to explicitly declare entire type of NextResponse.
  } catch (err: any) {
    // logger.error("32 : An error occured : ", err);

    return NextResponse.json(
      {
        message: err.body.message,
      },
      { status: err.statusCode },
    );
  }
};
