"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/common";
import { useOTP } from "./use-otp";
import Link from "next/link";

export const OTPForm = () => {
  const { setOTP, resendOTP, verifyOTP, loading } = useOTP();

  return (
    <div>
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Enter OTP</h1>
          <p className="text-muted-foreground text-sm text-balance">
            We've sent you otp to login to your account
          </p>
        </CardHeader>
        <CardContent>
          <form className={cn("flex flex-col gap-6")}>
            <div className="grid gap-6">
              <InputOTP maxLength={6} onChange={(e) => setOTP(e)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                type="button"
                onClick={verifyOTP}
                className={`w-full ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                Login
              </Button>
            </div>
            <div className="text-center text-sm">
              Don't have an account?
              <Link href="/create-account" className="text-pink font-bold">
                Sign up
              </Link>
            </div>
            <div className="text-center text-sm cursor-pointer">
              <button
                type="button"
                // biome-ignore lint/a11y/useKeyWithClickEvents: because its not link
                onClick={resendOTP}
                tabIndex={0}
                className="text-pink font-bold"
              >
                Click here
              </button>
              If you didn't get the OTP code
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
