import { create } from "zustand";
interface RescheduleState {
  prevSlotId: string;
  reqSlotId: string;
  setPrev: (id: string) => void;
  setReq: (id: string) => void;
}

export const useSlotReschedule = create<RescheduleState>()((set) => ({
  prevSlotId: "",
  reqSlotId: "",
  setPrev: (id) =>
    set({
      prevSlotId: id,
    }),
  setReq: (id) =>
    set({
      reqSlotId: id,
    }),
}));
