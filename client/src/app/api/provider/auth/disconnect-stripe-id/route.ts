import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PaymentService } from "@/shared/services";

export async function DELETE(req: NextRequest) {
  const { email } = await req.json();

  const payments = new PaymentService();

  const { message, status } = await payments.DisconnectStripeAccount(email);

  return NextResponse.json({ message: message }, { status: status });
}
