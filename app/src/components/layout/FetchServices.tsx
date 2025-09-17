"use client";

import { useService } from "@/stores/service";
import { useEffect } from "react";
import { FetchServicesAction } from "@/actions";
import { toast } from "sonner";

const FetchServices = ({ children }: { children: React.ReactNode }) => {
  const { setService, setLoading } = useService();

  useEffect(() => {
    const getData = async () => {
      console.log("______ Running data fetches ...");
      setLoading();
      try {
        const servicesData = await FetchServicesAction();
        setService(servicesData);
      } catch (err) {
        console.log(err);
        toast.error("An error occured");
      }
      console.log("______ Fetch Completed ...");
      setLoading();
    };
    getData();
    setInterval(() => {
      getData();
    }, 180000);
  }, []);
  return <>{children}</>;
};
export default FetchServices;
