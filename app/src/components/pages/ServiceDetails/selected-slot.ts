import {create} from "zustand"
import { AppointmentObjectSecured } from "@/@types/types";

interface SlotState {
    selectedSlot?:AppointmentObjectSecured ,
    setSelectedSlot:(slot:AppointmentObjectSecured) => void;
}
export const useSlot = create<SlotState>()((set) => (
    {
        selectedSlot:undefined,
        setSelectedSlot:(slot) =>set({
            selectedSlot:slot
        })
    }
))