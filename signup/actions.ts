"use server"

import { auth } from "@/lib/auth";


const createAccount =async () => {
    const data = await auth.api.signUpEmail({
    body: {
        name: "John Doe", // required
        email: "john.doe@example.com", // required
        password: "password1234", // required
        callbackURL: process.env.BETTER_AUTH_URL + "/account",
    },

});
}
export {
    createAccount
}