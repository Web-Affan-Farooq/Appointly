import {create} from "zustand"

interface AppointmentsState {
    loading:boolean
    toogleLoading:() => void;
    selectedAppointments:string[];
    setSelectedAppointments:(list:string[]) => void;
}

const useAppointmentsState = create<AppointmentsState>()((set) => ({
    loading:false,
    toogleLoading:() => set((state) => ({
        loading:state.loading
    })),
    selectedAppointments:[],
    setSelectedAppointments:(list) => set({
        selectedAppointments:list
    })
}))


export const useAppointments = () => {

    const {selectedAppointments,setSelectedAppointments , loading , toogleLoading } = useAppointmentsState();

    
    return {
        selectedAppointments,
        setSelectedAppointments,
        loading, 
        toogleLoading
    }
}