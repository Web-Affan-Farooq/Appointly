"use client";
// _____ utils ...
import { cn } from "@/lib/utils";
// _____ Components ...
import { Input, Label, Button } from "@/components/common";
import Link from "next/link";
import Image from "next/image";

// _____ Libraries ...
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// _____ Types ...
import { SignupAPIRequestSchema } from "@/validations/SignupFormSchema";
// _____ Hooks ...
import { useForm } from "react-hook-form";
// _____ actions ...
import { createAccount, signUpWithGoogle } from "./actions";
import { useState } from "react";
import { PasswordInput } from "../common";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupAPIRequestSchema),
    mode: "onChange",
  });

  const signup = async (formData: z.infer<typeof SignupAPIRequestSchema>) => {
    setLoading(true);
    try {
      await createAccount({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    } catch (err) {}
    setLoading(false);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(signup)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Get started with
          <strong className="text-pink font-bold">&nbsp; Appointly</strong>
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="name"
            placeholder="John doe"
            required
            {...register("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            type="password"
            required
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full">
          Signup
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          className={`w-full flex flex-row flex-nowrap justify-center items-center gap-[20px] font-normal ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => {
            signUpWithGoogle();
            setLoading(true);
          }}
        >
          <Image
            src={"/icons/google.svg"}
            alt="login with google account"
            width={19}
            height={19}
            className="w-[19px] h-[19px]"
          />
          Signup with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?
        <Link href="/login" className="text-pink font-bold">
          &nbsp; Login
        </Link>
      </div>
    </form>
  );
}
export default SignupForm;
