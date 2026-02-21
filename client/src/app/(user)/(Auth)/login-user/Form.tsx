"use client";
// _____ Components  ...
import { Input, Label, Button, Loader } from "@/components/common";
import Image from "next/image";
import Link from "next/link";

// _____ Actions  ....
import { useLoginForm } from "./use-login-form";

// ____ types and validations ...
import { PasswordInput } from "@/components/common";

export function LoginForm() {
  const { login, loginWithGoogle, errors, isSubmitting, register } =
    useLoginForm();

  return (
    <form className={"flex flex-col gap-6"} onSubmit={login}>
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
          className={`w-full flex justify-center items-center ${isSubmitting ? "cursor-not-allowed py-[20px]" : "cursor-pointer"}`}
        >
          {isSubmitting ? <Loader /> : "Login"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          className={`w-full flex flex-row flex-nowrap justify-center font-normal items-center gap-[20px] ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => {
            loginWithGoogle();
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
        <Link href="/signup-user" className="text-pink font-bold">
          Sign up
        </Link>
      </div>
    </form>
  );
}
