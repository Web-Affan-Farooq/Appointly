"use server";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt"

export const createAccount = async (formData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const hashedPassword = await bcrypt.hash(formData.password, 10);
    await auth.api.signUpEmail({
      body: {...formData, password:hashedPassword},
    });

    return { status: "success", message: "Account created" };
  } catch (err: any) {
    return { status: "error", message: err.message || "Signup failed" };
  }
};

// Social signup (if using OAuth / social providers)
export const signUpWithGoogle = async () => {
    const {data , error}= await authClient.signIn.social({
    provider: "google",
    callbackURL:"/dashboard"
  });
  if(error) {
    return {message:error.statusText}
  }

  if(data.url){
    return redirect(data.url)
  }
};
