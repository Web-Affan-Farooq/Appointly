import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isProvider =
    session && sessionCookie && session.user.role === "PROVIDER";

  const isUser = session && sessionCookie && session.user.role === "USER";

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!isProvider && request.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/login-provider", request.url));
  } else if (!isUser && request.nextUrl.pathname === "/account") {
    return NextResponse.redirect(new URL("/login-user", request.url));
  } else if (!isUser && !isProvider) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path", "/account/:path"], // Specify the routes the middleware applies to
};
