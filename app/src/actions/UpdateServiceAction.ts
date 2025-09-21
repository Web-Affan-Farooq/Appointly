"use server";
import db from "@/db";
import { InferSelectModel } from "drizzle-orm";
import { service } from "@/db/schemas";

type UpdateServiceResponse = {
  message: string;
  success: boolean;
};

const UpdateServiceAction = async (
  values: Partial<InferSelectModel<typeof service>>
): Promise<UpdateServiceResponse> => {
  try {
    await db.update(service).set(values);
    return {
      message: "Details updated successfully",
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "An error occured",
      success: false,
    };
  }
};
export default UpdateServiceAction;
