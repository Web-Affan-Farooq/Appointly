"use client";
// _____ Hooks  ...
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// _____ utils ...
import { cn } from "@/lib/utils";
// _____ Components  ...
import { Input, Label, Button } from "@/components/common";
import Image from "next/image";
import Link from "next/link";
// _____ Libraries  ....
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// _____ Actions  ....
import { simpleLogin, loginWithGoogle } from "./action";
// ____ types and validations ...
import { LoginAPIRequestSchema } from "@/validations/LoginFormSchema";
import { PasswordInput } from "@/components/common";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginAPIRequestSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (formData: z.infer<typeof LoginAPIRequestSchema>) => {
    setLoading(true);
    const { message, success, redirect } = await simpleLogin(formData);

    if (!success && !redirect) {
      // show error
    }
    alert(message);
    router.push("/dashboard");
    setLoading(false);
  };
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(login)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
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
          <PasswordInput id="password" required {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <Button
          type="submit"
          className={`w-full ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          className={`w-full flex flex-row flex-nowrap justify-center font-normal items-center gap-[20px] ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => {
            setLoading(true);
            loginWithGoogle();
            setLoading(false);
          }}
        >
          <Image
            src={"/icons/google.svg"}
            alt="login with google account"
            width={19}
            height={19}
            className="w-[19px] h-[19px]"
          />
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?
        <Link href="/create-account" className="text-pink font-bold">
          Sign up
        </Link>
      </div>
    </form>
  );
}
export default LoginForm;
