// // src/middleware/auth.middleware.ts
// import { Request, Response, NextFunction } from 'express';
// import { UnauthorizedError } from './error.middleware';
// import {auth} from "../../auth"

// export const authenticate = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     const req.
//       // 2. MANUAL MATCHER: Define which routes this proxy should care about
//   const protectedPaths = [
//     "/dashboard",
//     "/account",
//     "/dashboard/schedule",
//     "/dashboard/appointments",
//     "/dashboard/add-service",
//   ];
//   const isTargetRoute = protectedPaths.some((path) =>
//     pathname.startsWith(path),
//   );

//   // If it's not a route we care about, just continue
//   if (!isTargetRoute) return;

//   const sessionCookie = getSessionCookie(request);
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const isProvider =
//     session && sessionCookie && session.user.role === "PROVIDER";
//   const isUser = session && sessionCookie && session.user.role === "USER";

//   // Logic for Redirections
//   if (!isProvider && pathname === "/dashboard") {
//     return res.redirect(new URL("/login-provider", request.url));
//   }

//   if (!isUser && pathname === "/account") {
//     return res.redirect(new URL("/login-user", request.url));
//   }

//   if (!isUser && !isProvider) {
//     return res.redirect(new URL("/", request.url));
//   }

//     const session = await auth.api.getSession(req.headers)
//     // THIS IS NOT SECURE!
//     // This is the recommended approach to optimistically redirect users
//     // We recommend handling auth checks in each page/route
//     if (!session) {
//         return res.redirect(new URL("/sign-in", req.url));
//     }
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         throw new UnauthorizedError('No token provided');
//     }

//     const token = authHeader.split(' ')[1];
//     const user = verifyToken(token);

//     if (!user) {
//         throw new UnauthorizedError('Invalid token');
//     }
//     return next();
// };