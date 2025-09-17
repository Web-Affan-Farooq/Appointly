import {create} from "zustand";
import { ServiceData } from "@/@types/types";
import {persist,createJSONStorage} from "zustand/middleware";

interface DashboardState {
    services:ServiceData[];
    setServices:(list:ServiceData[]) => void;    
}

export const useDashboard = create<DashboardState>()(
    persist(
            (set) => (
    {
        services:[],
        setServices:(list) => set(() => ({services:list})) 
    }
),
      {
        name: "services-page-data",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
);