import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { LoginFormSchema } from "@shared/validations/login-schema";

export const POST = async (req: NextRequest) => {
  try {
    // Parse and validate request body
    const body = await req.json();
    const validationResult = LoginFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Invalid input data",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password } = validationResult.data;

    console.log(`[Auth] Attempting sign-in for email: ${email}`);

    // Sign in the user
    const { user: authenticatedUser } = await auth.api.signInEmail({
      body: { email, password },
    });

    console.log(`[Auth] User found: ${authenticatedUser.id}`);

    // Send verification OTP
    console.log(`[Auth] Sending OTP to: ${email}`);
    const { success } = await auth.api.sendVerificationOTP({
      body: {
        email, // Use the actual email instead of hardcoded example
        type: "sign-in",
      },
    });

    if (success) {
      console.log(`[Auth] OTP sent successfully to: ${email}`);

      // Don't expose too much information in the response
      return NextResponse.json(
        {
          message: "Verification code sent successfully",
          userId: authenticatedUser.id, // Optional: return minimal user info
        },
        { status: 200 },
      );
    } else {
      console.error(`[Auth] Failed to send OTP to: ${email}`);
      return NextResponse.json(
        { message: "Failed to send verification code" },
        { status: 500 },
      );
    }
  } catch (err: any) {
    // Log the full error for debugging
    console.error("[Auth Error]:", {
      message: err.message,
      status: err.status,
      cause: err.cause,
    });

    // Handle specific error types
    if (err.message?.includes("Invalid email or password")) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    if (err.message?.includes("User not found")) {
      return NextResponse.json(
        { message: "No account found with this email" },
        { status: 404 },
      );
    }

    if (err.status === 429) {
      return NextResponse.json(
        { message: "Too many attempts. Please try again later." },
        { status: 429 },
      );
    }

    // Generic error response
    return NextResponse.json(
      { message: "An error occurred during authentication" },
      { status: 500 },
    );
  }
};
