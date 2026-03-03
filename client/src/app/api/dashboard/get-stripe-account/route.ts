import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PaymentService } from "@/shared/services";

export const POST = async (req: NextRequest) => {
  const { accountId }: { accountId: string } = await req.json();
  const payments = new PaymentService();

  const { status, data, message } = await payments.GetProviderInfo(accountId);

  return NextResponse.json(
    {
      data,
      message,
    },
    { status },
  );
};
