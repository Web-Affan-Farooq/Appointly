import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import db from "@/db";
import { user } from "@/db/schemas";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function DELETE(req:NextRequest) {
  try {
    const { email } = await req.json();

    // 1️⃣ Get the user from DB
    const [existingUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (!existingUser || !existingUser.stripe_account_id) {
      return NextResponse.json({ error: "No Stripe account linked" }, { status: 404 });
    }

    const stripeAccountId = existingUser.stripe_account_id;

    // 2️⃣ Delete the connected Stripe account
    const deleted = await stripe.accounts.del(stripeAccountId);
    console.log("Deleted Stripe account:", deleted);

    // 3️⃣ Remove user account ...
    await db
      .delete(user)
      .where(eq(user.email, email));

    return NextResponse.json({ message: "Account deleted successfully", redirect:"/" },{status:200});
  } catch (err: any) {
    console.error("Error deleting Stripe account:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
