import { create } from "zustand";

interface ProfileState {
  name: string;
  email: string;
  setInfo: (info: { name: string; email: string }) => void;
  appointments: [];
  setAppointments: (list: []) => void;
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
