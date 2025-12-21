import { CreateProviderAccount } from "@/app/(Auth-provider)/create-account/api";
import type { NextRequest } from "next/server";

export const POST = async (req:NextRequest) => {
	return await CreateProviderAccount(req)
}