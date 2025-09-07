"use server";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {z} from "zod";
import { LoginAPIRequestSchema,  LoginAPIResponseSchema} from "@/validations/LoginFormSchema";

export const simpleLogin = async ({
    email,
    password,
}:z.infer<typeof LoginAPIRequestSchema>) :Promise<z.infer<typeof LoginAPIResponseSchema>>=> {
  
    try {
    auth.api.signInEmail({
      body: { email, password },
    });

    return {
        message:"Login successfull",
        redirect:"/dashboard",
        success:true
    }

  } catch (err) {
    console.log(err);
    return {
        message:"An error occured",
        success:false
    }
  }
};

export const loginWithGoogle = async () => {
  // Social signup (if using OAuth / social providers)
  const { data, error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
  });
  if (error) {
    return { message: error.statusText };
  }
  if (data.url) {
    return redirect(data.url);
  }
};
