import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Get Stripe account info
export const POST = async (req: NextRequest) => {
	const { accountId }: { accountId: string } = await req.json();
	const account = await stripe.accounts.retrieve(accountId);
	console.log("Provider account country: ", account.country); // e.g. "US", "AU"

	return NextResponse.json({
		id: account.id,
		email: account.email,
		country: account.country,
		type: account.type,
	});
};
