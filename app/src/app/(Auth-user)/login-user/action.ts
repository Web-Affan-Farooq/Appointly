"use server";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import {LoginFormSchema} from "@/validations/login-schema";

export const simpleLogin = async ({
	email,
	password,
}: z.infer<typeof LoginFormSchema>): Promise<{
	message:string;
	status:200 | 404
}> => {
	try {
		await auth.api.signInEmail({
			body: { email, password },
		});

		return {
			message: "Login successfull",
			status:200
		};
	} catch (err) {
		console.log(err);
		return {
			message: "An error occured",
			status:404
		};
	}
};

export const loginWithGoogle = async () => {
	// Social signup (if using OAuth / social providers)
	const { data, error } = await authClient.signIn.social({
		provider: "google",
		callbackURL: "/account",
	});
	if (error) {
		return { message: error.statusText };
	}
	if (data.url) {
		return redirect(data.url);
	}
};
