import type { ServiceData } from "@/shared/types";
import { create } from "zustand";
import { useDashboard } from "../../_hooks/use-dashboard";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

interface UpdateState {
  updatedData: Partial<ServiceData>;
  setUpdatedData: (updatedData: Partial<ServiceData>) => void;
}
const useUpdateHandler = create<UpdateState>()((set) => ({
  updatedData: {},
  setUpdatedData: (updatedData) =>
    set((state) => ({
      updatedData: {
        ...state.updatedData,
        ...updatedData,
      },
    })),
}));

export const useServiceDetails = () => {
  // _____ Select selected service from global state ...
  const { selectedService } = useDashboard();

  // _____ For storing the values that are actually updated ...
  const { updatedData, setUpdatedData } = useUpdateHandler();

  // _____ For Toogling visibility of sheet component  ...
  const [open, setOpen] = useState(false);

  // _____ For controlling if sheet can be closed (only after save success) ...
  const [saved, setSaved] = useState(false);

  // _____ For controlling loading state...
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (Object.keys(updatedData).length > 0) {
      setLoading(true);
      const { data, status } = await axios.post(
        "/api/dashboard/update-service",
        {
          id: selectedService.id,
          updatedFields: updatedData,
        },
      );

      const { message } = data;
      if (status !== 200) {
        toast.error(message);
      } else {
        toast.success(message);
        setSaved(true);
        setOpen(false);
      }
      setLoading(false);
    }
  };

  return {
    updatesHandler: {
      updatedData: updatedData,
      setUpdatedData: setUpdatedData,
    },
    loadingHandler: {
      loading: loading,
      setLoading: setLoading,
    },
    saveHandler: {
      saved: saved,
      setSaved: setSaved,
    },
    selectedService,
    openHandler: {
      open,
      setOpen,
    },
    handleSave,
  };
};
