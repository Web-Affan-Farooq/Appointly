import { createProviderAccount} from "@/app/(Auth-provider)/create-account/_actions";
import type { NextRequest } from "next/server";

export const POST = async (req:NextRequest) => {
	return await createProviderAccount(req)
}