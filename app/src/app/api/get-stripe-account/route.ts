import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Get Stripe account info
export const POST = async (accountId: string) => {
  const account = await stripe.accounts.retrieve(accountId);
  
  console.log("Provider account country: ", account.country); // e.g. "US", "AU"
  
  return {
    id: account.id,
    email: account.email,
    country: account.country,
    type: account.type,
  };
}
