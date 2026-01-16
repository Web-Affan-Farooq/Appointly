"use client";

import { useService } from "../_hooks/use-service";
import { useEffect } from "react";
import {getServices} from "../_actions";
import { toast } from "sonner";

export const FetchServices = ({ children }: { children: React.ReactNode }) => {
  const { setService, setLoading } = useService();

  /* _____ Short polling implementation ... */
  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      console.log("______ Running data fetches ...");
      try {
        const servicesData = await getServices();
        setService(servicesData);
      } catch (err) {
        console.log(err);
        toast.error("An error occured");
      }

      setLoading(false);
      console.log("______ Fetch Completed ...");
    };

    getData();
    setInterval(() => {
      getData();
    }, 180000);
  }, [setLoading, setService]);
  return <>{children}</>;
};