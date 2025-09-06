"use client";
// _____ utils ...
import { cn } from "@/lib/utils";
import ShowClientError from "@/utils/Error";
// _____ Components ...
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SignupForm } from "@/components";
// _____ Libraries ...
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// _____ Types ...
import {
  CheckoutAPIRequestSchema,
  CheckoutAPIResponseSchema,
} from "@/validations/CheckoutAPISchema";
// _____ Hooks ...
import { useForm } from "react-hook-form";
// _____ actions ...
import { createAccount, createSocialAccount } from "./actions";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CheckoutAPIRequestSchema),
    mode: "onChange",
  });

  const signup = async (formData: z.infer<typeof CheckoutAPIRequestSchema>) => {
    try {
      if (formData.plan === "FREE") {
        const response = await axios.post("");
      }

      const response = await axios.post("/api/payment/checkout", formData);
      const { data }: { data: z.infer<typeof CheckoutAPIResponseSchema> } =
        response;
      window.document.location.href = data.url;
    } catch (err) {
      ShowClientError(err, "Create payment error");
    }
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
          <strong className="text-pink font-bold">Appointly</strong>
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
          <Input
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
      </div>
      <div className="text-center text-sm">
        Already have an account?
        <Link href="/create-account" className="text-pink font-bold">
          Login
        </Link>
      </div>
    </form>
  );
}

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div> */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
