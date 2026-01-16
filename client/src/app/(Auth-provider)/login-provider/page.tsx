"use client";
// _____ Hooks  ...
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// _____ utils ...
import { cn } from "@/lib/utils";
// _____ Components  ...
import { Input, Label, Button } from "@/components/common";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
// _____ Libraries  ....
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// _____ Actions  ....
import { simpleLogin } from "./action";
// ____ types and validations ...
import { LoginFormSchema } from "@/validations/login-schema";
import { PasswordInput } from "@/components/common";
import { toast } from "sonner";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (formData: z.infer<typeof LoginFormSchema>) => {
    setLoading(true);
    const { message, status } = await simpleLogin(formData);

    if (status === 404) {
      toast.error(message);
    }
    toast.success(message);
    router.push("/dashboard");
    setLoading(false);
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          {/* <Image src="/images/signup.svg" alt="Logo" width={100} height={100} /> */}
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </CardHeader>
        <CardContent>
          <form
            className={cn("flex flex-col gap-6")}
            onSubmit={handleSubmit(login)}
          >
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
                <PasswordInput
                  id="password"
                  required
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className={`w-full ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                Login to dashboard
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?
              <Link href="/create-account" className="text-pink font-bold">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default LoginForm;
