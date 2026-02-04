import { authClient } from "@/lib/auth-client";
import { use } from "react";

export const useCredentials = () => {
  const getData = async () => {
    const { data } = await authClient.getSession();
    return data?.user;
  };

  const data = use(getData());
  console.log("data from useCredentials : ", data);

  // return data
};
