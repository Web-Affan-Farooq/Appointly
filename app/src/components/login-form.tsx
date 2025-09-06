"use client";
// _____ Hooks  ...
import { useActionState } from "react";
import { useForm } from "react-hook-form";
// _____ utils ...
import { cn } from "@/lib/utils";
// _____ Components  ...
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
// _____ Libraries  ....
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginFormSchema = z
  .object({
    email: z.email(),
    password: z
      .string({ message: "Please Enter password" })
      .min(8, "Password must be at least 8 characters long")
      .max(15, "Password must be shorter than 15 characters")

      // _____ Validate lowercase characters
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must include lowercase characters",
      })

      // _____ Validate uppercase characters
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must include uppercase characters",
      })

      // _____ Validate lowercase characters
      .refine((val) => /[@$!%*?&]/.test(val), {
        message: "Password must include special characters",
      }),
  })
  .strict();

// _____ Server action  ...
async function simpleLogin(
  prevState: any,
  formData: z.infer<typeof LoginFormSchema>
) {
  "use server";
  try {
    // Validate the form data on the server
    const validatedData = LoginFormSchema.parse({
      email: formData.email,
      message: formData.password,
    });

    // Simulate a database save or API call
    console.log("Server Action received data:", validatedData);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network latency

    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    // If validation fails, return the zod errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed. Please check your form.",
        errors: error.flatten().fieldErrors,
      };
    }
    // Handle other server-side errors
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const initialState = {
    message: "",
  };

  const [state, formAction, pending] = useActionState(
    LoginAction,
    initialState
  );

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
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
