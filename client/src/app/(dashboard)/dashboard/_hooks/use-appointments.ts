"use client";
import { useDashboard } from "./use-dashboard";
import { useMemo } from "react";
import { create } from "zustand";

interface AppointmentsState {
  loading: boolean;
  toogleLoading: () => void;
  selectedAppointments: string[];
  setSelectedAppointments: (list: string[]) => void;
}

const useAppointmentsState = create<AppointmentsState>()((set) => ({
  loading: false,
  toogleLoading: () =>
    set((state) => ({
      loading: state.loading,
    })),
  selectedAppointments: [],
  setSelectedAppointments: (list) =>
    set({
      selectedAppointments: list,
    }),
}));

export const useAppointments = () => {
  const { selectedService } = useDashboard();

  const {
    selectedAppointments,
    setSelectedAppointments,
    loading,
    toogleLoading,
  } = useAppointmentsState();

  const appointments = useMemo(() => {
    return selectedService.appointments.sort();
  }, [selectedService]);

  return {
    selectedAppointments,
    setSelectedAppointments,
    loading,
    toogleLoading,
    appointments,
  };
};
