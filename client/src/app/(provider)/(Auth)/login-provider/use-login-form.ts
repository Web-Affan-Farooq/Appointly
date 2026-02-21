// _____ Hooks ...
import { useForm, useWatch } from "react-hook-form";

// _____ Libraries  ...
import { LoginFormSchema } from "@/shared/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormData } from "./formdata";
import { authClient } from "@/lib/auth-client";

export const useLoginForm = () => {
  // ______ Persistent formData to survive refresh on otp form  ...

  const { setFormData } = useFormData();

  // ______ Must handle manually ...
  const [loading, setLoading] = useState(false);
  // _____ For controlling visibility of otp form  ...
  const [otpVisible, setOtpVisible] = useState(false);
  // _____ React hook form ...
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
  });
  // _____ Funtion for email password login ...
  const login = handleSubmit(
    async (formData: z.infer<typeof LoginFormSchema>) => {
      setLoading(true);
      const { data, status } = await axios.post(
        "/api/provider/auth/login",
        formData,
      );

      if (status !== 200) {
        toast.error(data.message);
      } else {
        setOtpVisible(true);
      }
      setLoading(false);
      await authClient.getSession()
    },
  );
  const _matchedValues = useWatch({ control });

  useEffect(() => {
    setFormData({ ...getValues() });
  }, [setFormData, _matchedValues]);

  return {
    otpVisible,
    setOtpVisible,
    loading,
    register,
    errors,
    login,
  };
};
