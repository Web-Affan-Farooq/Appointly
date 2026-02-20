// _____ Libraries ...
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { create } from "zustand";

// _____ Hooks and validations  ...
import { useState } from "react";
import { useFormData } from "./formdata";

// _____ Explicit type of state  ...
type UseOTP = {
  otp: string;
  setOTP: (val: string) => void;
};

// _____ Zustand state for handling otp input value ...
const useOTPState = create<UseOTP>()((set, _get) => ({
  otp: "",
  setOTP: (val) => set({ otp: val }),
}));

// _____ Wrap inside custom hook so that router can be accessible ...
export const useOTP = () => {
  const { formData } = useFormData();

  // _____ Control loading state of otp verification ...
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // _____ Zustand call...
  const { otp, setOTP } = useOTPState();

  // _____ OTP verification ...
  async function verifyOTP() {
    console.log("Verifying otp : ", formData.email);
    setLoading(true);
    const { data, error } = await authClient.emailOtp.checkVerificationOtp({
      email: formData.email, // required
      type: "sign-in", // required
      otp: otp, // required
    });

    if (data) {
      // _____ Redirect user to dashboard ...
      router.push("/dashboard");
    }
    if (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }

  // _____ Resending OTP ...
  async function resendOTP() {
    console.log("Resending otp  : ", formData.email);
    setLoading(true);
    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email: formData.email, // required
      type: "sign-in", // required
    });
    if (data) {
      toast.success("Check your inbox again");
    }
    if (error) {
      toast.success(error.message);
    }
    setLoading(false);
  }

  return {
    otp,
    setOTP,
    verifyOTP,
    resendOTP,
    loading,
  };
};
