import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/", 
    "/about", 
    "/events", 
    "/contact", 
    "/sign-in", 
    "/sign-up",
    "/success"
  ],
  // Routes to ignore Clerk authentication completely
  ignoredRoutes: [
    "/((?!api|trpc))(_next.*|.+\\.\\w+$)", 
    "/sign-in", 
    "/sign-up"
  ],
  // Custom afterAuth to prevent automatic redirects
  afterAuth(auth, req, evt) {
    // Allow all requests to proceed without automatic redirects
    return;
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
