"use client";
// _____ Hooks  ...
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
// _____ Libraries  ....
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// ____ types and validations ...
import { LoginFormSchema } from "@shared/validations";
import { toast } from "sonner";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
  });

  const router = useRouter();

  const login = handleSubmit(
    async (formData: z.infer<typeof LoginFormSchema>) => {
      const { data, status } = await axios.post(
        "/api/user/auth/login",
        formData,
      );
      const { message } = data;

      if (status !== 200) {
        toast.error(message);
      }

      toast.success(message);
      router.push("/account");
      await authClient.getSession();
    },
  );

  const loginWithGoogle = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/account",
    });
    if (error) {
      return {
        message: error.statusText + error.message && error.message,
        status: error.status,
      };
    }
    if (data.url) {
      return redirect(data.url);
    }
  };

  return {
    register,
    loginWithGoogle,
    login,
    errors,
    isSubmitting,
  };
};
