import { createAuthClient } from "better-auth/react";
import { betterauthURL } from "@/shared/constants/env";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: betterauthURL,
});
