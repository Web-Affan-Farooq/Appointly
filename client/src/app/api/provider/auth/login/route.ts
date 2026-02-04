import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { z } from "zod";
import type { LoginFormSchema } from "@shared/validations/login-schema";

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
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        message: "An error occured",
      },
      { status: 404 },
    );
  }
};

// export const loginWithGoogle = async () => {
//     // Social signup (if using OAuth / social providers)
//     const { data, error } = await authClient.signIn.social({
//         provider: "google",
//         callbackURL: "/dashboard",
//     });
//     if (error) {
//         return { message: error.statusText };
//     }
//     if (data.url) {
//         return redirect(data.url);
//     }
// };
