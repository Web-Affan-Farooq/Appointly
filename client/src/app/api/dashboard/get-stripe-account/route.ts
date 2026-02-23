import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PaymentService } from "@/shared/services";

// Get Stripe account info
export const POST = async (req: NextRequest) => {
  const { accountId }: { accountId: string } = await req.json();
  const payments = new PaymentService();

  const { status, data } = await payments.GetProviderCountry(accountId);

  return NextResponse.json(data, { status });
};
