"use server";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import z from "zod";
import { UserSignupFormSchema } from "./_schema/user-signup";

// Social signup (if using OAuth / social providers)
export const signUpWithGoogle = async () => {
  const { data, error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/account",
  });
  if (error) {
    return { message: error.statusText };
  }

  if (data.url) {
    return redirect(data.url);
  }
};

export const signupWithEmail = async (formData:z.infer<typeof UserSignupFormSchema >):Promise<
{
  message:string;
  statusCode:422 | 500 | 201 ;
  data?:{
    name:string;
    email:string
  }
}
> => {
  try {
       const data = await auth.api.signUpEmail({
      body: {
        ...formData,
        callbackURL: process.env.BETTER_AUTH_URL + "/account",
      },
    });

    return {
      data: {
        name: data.user.name,
        email: data.user.email,
      },
      message: "Signup successfull",
      statusCode:201
    };
    // eslint-disable-next-line   @typescript-eslint/no-explicit-any
  } catch (err:any) {
    console.log(err)
    return {
      message: "Signup successfull",
      statusCode:err.statusCode
    };
  }
};