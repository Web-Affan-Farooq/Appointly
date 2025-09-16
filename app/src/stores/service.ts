import {create } from "zustand";
import {z} from "zod";
import { ServicesAPISchema } from "@/validations/ServicesAPISchema";

interface ServiceState {
    services:z.infer<typeof ServicesAPISchema>[];
    setService:(list:z.infer<typeof ServicesAPISchema>[]) => void;
}

export const useService = create<ServiceState>()((set) => ({
    services:[],
    setService:(list) => set(() => ({
        services:list
    }))
}))