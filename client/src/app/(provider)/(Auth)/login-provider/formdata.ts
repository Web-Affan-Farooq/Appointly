import { create } from "zustand";
import type { z } from "zod";
import type { LoginFormSchema } from "@/shared/validations";

type FormData = z.infer<typeof LoginFormSchema>;

type FormDataState = {
  formData: FormData;
  setFormData: (formData: FormData) => void;
};

export const useFormData = create<FormDataState>()((set) => ({
  formData: {
    email: "",
    password: "",
  },
  setFormData: (formData) => set({ formData: formData }),
}));
