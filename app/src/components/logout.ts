"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export const logout = async ():Promise<{message:string}> => {
    const clientHeaders = await headers();

    await auth.api.signOut({
        headers:clientHeaders,
    })
    return {message:"Logout successfull"}
}