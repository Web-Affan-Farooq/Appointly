import {create} from "zustand"

type TabSwitchState = {
    tab:"PENDING" | "CANCELLED" | "REQUESTED-RESCHEDULE";
    setTab:(tab:"PENDING" | "CANCELLED" | "REQUESTED-RESCHEDULE") => void;
}

export const useTab = create<TabSwitchState>()((set) => (
    {
        tab:"PENDING",
        setTab:(tab) => set(() => ({
            tab:tab
        }))
    }
))