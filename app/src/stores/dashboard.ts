import {create} from "zustand";
import { ServiceData } from "@/@types/types";
import {persist,createJSONStorage} from "zustand/middleware";

interface DashboardState {
    services:ServiceData[];
    selectedService:ServiceData | null;
    setServices:(list:ServiceData[]) => void;    
    selectService:(service:ServiceData) => void;
}

export const useDashboard = create<DashboardState>()(
    persist(
            (set) => (
    {
        services:[],
        selectedService:null,
        setServices:(list) => set(() => ({services:list})),
        selectService:(service) => set(() => (
            {
                selectedService:service
            }
        )),
    }
),
      {
        name: "dashboard-data",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
);