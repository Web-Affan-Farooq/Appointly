import {create} from "zustand";
import { ServiceData } from "@/@types/types";
import {persist,createJSONStorage} from "zustand/middleware";

interface DashboardState {
    services:ServiceData[];
    selectedService:ServiceData;
    setServices:(list:ServiceData[]) => void;    
    selectService:(service:ServiceData) => void;
}

export const useDashboard = create<DashboardState>()(
    persist(
            (set) => (
    {
        services:[],
        selectedService:{
            id:"",
            name:"",
            provider_name:"",
            description:"",
            details:[],
            appointments:[],
            max_appointments_per_day:0,
            duration:0,
            price:0,
            category:"",
            ratings:[],
            start_time:"",
            end_time:"",
            working_days:[],
            user_id:"",
            created_at:new Date(),
            currency:"",
            is_active:true,
        },
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