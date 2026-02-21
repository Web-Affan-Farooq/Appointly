// _____ Libraries ...
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import type z from "zod";
import { toast } from "sonner";

// _____ Zod validations ...
import { UserSignupFormSchema } from "./_validations";

// _____ Hooks ...
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

export const signupWithGoogle = async () => {
  const { data, error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/account",
  });
  if (error) {
    return { message: error.statusText };
  }

  if (data.url) {
    return redirect(data.url);
  }
};

export const useSignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UserSignupFormSchema),
    mode: "onChange",
  });

  const signup = handleSubmit(
    async (_formData: z.infer<typeof UserSignupFormSchema>) => {
      try {
        const { data } = await axios.post("/api/user/auth/signup", {
          ..._formData
        });
        const { message } = data; // name and email also returned make sure to manipulate account state ...
        toast.success(message);
        router.push("/account");

        // biome-ignore lint: lint/suspicious/noExplicitAny: don't mention all the response
      } catch (err: any) {
        console.log("Signup error : ", err);
        const { message } = err.response.data;
        toast.error(message);
      } finally {
        await authClient.getSession();
      }
    },
  );

  // Social signup (if using OAuth / social providers)

  return {
    register,
    errors,
    isSubmitting,
    signup,
  };
};
