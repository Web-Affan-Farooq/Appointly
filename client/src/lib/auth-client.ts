import { createAuthClient } from "better-auth/react";
import { betterauthURL } from "@/shared/constants/env";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: betterauthURL,
  plugins: [emailOTPClient()],
});
