import {create} from "zustand";
import { ServiceData } from "@/@types/types";

interface DashboardState {
    services:ServiceData[];
    setServices:(list:ServiceData[]) => void;    
}

export const useDashboard = create<DashboardState>()((set) => (
    {
        services:[],
        setServices:(list) => set(() => ({services:list})) 
    }
));