import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

// 1. MUST be a default export for the Proxy feature
export default async function proxy(request: NextRequest) {
  console.log("Running middleware ...");
  const { pathname } = request.nextUrl;

  // 2. MANUAL MATCHER: Define which routes this proxy should care about
  const protectedPaths = [
    "/dashboard",
    "/account",
    "/dashboard/schedule",
    "/dashboard/appointments",
    "/dashboard/add-service",
  ];
  const isTargetRoute = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  // If it's not a route we care about, just continue
  if (!isTargetRoute) return;

  const sessionCookie = getSessionCookie(request);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isProvider =
    session && sessionCookie && session.user.role === "PROVIDER";
  const isUser = session && sessionCookie && session.user.role === "USER";

  // Logic for Redirections
  if (!isProvider && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/login-provider", request.url));
  }

  if (!isUser && pathname === "/account") {
    return NextResponse.redirect(new URL("/login-user", request.url));
  }

  if (!isUser && !isProvider) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Returning nothing/undefined allows the request to continue to the page
}

// import { type NextRequest, NextResponse } from "next/server";
// import { getSessionCookie } from "better-auth/cookies";
// import { headers } from "next/headers";
// import { auth } from "./lib/auth";

// export async function proxy(request: NextRequest) {
//   const sessionCookie = getSessionCookie(request);
//   const session = await auth.api.getSession({
//     headers: await headers()
//   })

//   const isProvider = session && sessionCookie && session.user.role === "PROVIDER";

//   const isUser = session && sessionCookie && session.user.role === "USER";

//   // THIS IS NOT SECURE!
//   // This is the recommended approach to optimistically redirect users
//   // We recommend handling auth checks in each page/route
//   if (!isProvider && request.nextUrl.pathname === "/dashboard") {
//     return NextResponse.redirect(new URL("/login-provider", request.url));
//   }
//   else if (!isUser && request.nextUrl.pathname === "/account") {
//     return NextResponse.redirect(new URL("/login-user", request.url));
//   }
//   else if (!isUser && !isProvider) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard", "/account", "/dashboard/schedule", "/dashboard/appointments", "/dashboard/add-service"], // Specify the routes the middleware applies to
// };
