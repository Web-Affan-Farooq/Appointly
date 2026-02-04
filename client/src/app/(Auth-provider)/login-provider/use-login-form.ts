// _____ Hooks ...
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

// _____ Libraries  ...
import { LoginFormSchema } from "@/shared/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import axios from "axios";

export const useLoginForm = () => {
  // _____ React hook form ...
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
      const { data, status, statusText } = await axios.post(
        "/api/accounts/provider/login",
        formData,
      );

      if (status === 404) {
        toast.error(`${statusText} ${status}`);
      }

      toast.success(data.message);
      router.push("/dashboard");
    },
  );

  return {
    isSubmitting,
    register,
    errors,
    login,
  };
};
