"use server";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

// Social signup (if using OAuth / social providers)
export const signUpWithGoogle = async () => {
	const { data, error } = await authClient.signIn.social({
		provider: "google",
		callbackURL: "/dashboard",
	});
	if (error) {
		return { message: error.statusText };
	}

	if (data.url) {
		return redirect(data.url);
	}
};
