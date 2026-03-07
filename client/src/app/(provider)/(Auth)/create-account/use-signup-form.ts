"use client";
// _____ Libraries ...
import { zodResolver } from "@hookform/resolvers/zod";

// _____ Hooks ...
import { useForm } from "react-hook-form";

// _____ Libraries ...
import type { z } from "zod";
import axios from "axios";
import { toast } from "sonner";

// _____ Validations  ...
import { ProviderSignupAPIRequestSchema } from "./_validations";
import { authClient } from "@/lib/auth-client";

// _____ Function for signup post request ...
const signup = async (
  formData: z.infer<typeof ProviderSignupAPIRequestSchema>,
) => {
  const { data, status } = await axios.post(
    "/api/provider/auth/create",
    formData,
  );
  if (status !== 302) {
    toast.error(data.message);
  }
  authClient.getSession();
};

export const useSignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ProviderSignupAPIRequestSchema),
    mode: "onChange",
  });

  const signupReq = handleSubmit(signup);

  return {
    register,
    signupReq,
    errors,
    isSubmitting,
  };
};
