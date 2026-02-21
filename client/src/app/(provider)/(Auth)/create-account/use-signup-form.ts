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
import type { ProviderSignupAPIResponseSchema } from "./_validations";
import { authClient } from "@/lib/auth-client";

// _____ Function for signup post request ...
const signup = async (
  formData: z.infer<typeof ProviderSignupAPIRequestSchema>,
) => {
  try {
    const response = await axios.post("/api/provider/auth/create", formData);
    const { data }: { data: z.infer<typeof ProviderSignupAPIResponseSchema> } =
      response;
    window.document.location.href = data.url;
  } catch (err) {
    console.log(err);
    toast.error("An error occured while creating account");
  } finally {
    await authClient.getSession();
  }
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
