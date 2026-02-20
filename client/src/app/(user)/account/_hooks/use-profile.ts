import { create } from "zustand";
import type { AppointmentProfile } from "../_types";

interface ProfileState {
  name: string;
  email: string;
  setInfo: (info: { name: string; email: string }) => void;
  appointments: AppointmentProfile[];
  setAppointments: (list: AppointmentProfile[]) => void;
}

export const useProfile = create<ProfileState>()((set) => ({
  name: "",
  email: "",
  setInfo: (info) =>
    set(() => ({
      name: info.name,
      email: info.email,
    })),
  appointments: [],
  setAppointments: (list) =>
    set(() => ({
      appointments: list,
    })),
}));
