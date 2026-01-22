// import { auth } from "@/auth";
// import { NextResponse } from "next/server";

// export default auth((req) => {
//   const { pathname } = req.nextUrl;

//   const isLoggedIn = !!req.auth;
//   const isMentor = req.auth?.user?.isMentor === true;

//   // 🔐 Dashboard protection
//   if (pathname.startsWith("/dashboard") && !isLoggedIn) {
//     return NextResponse.redirect(new URL("/signin", req.url));
//   }

//   // 🔁 Home → dashboard if logged in
//   if (pathname === "/" && isLoggedIn) {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   // 🔁 Signin → dashboard if logged in
//   if (pathname === "/signin" && isLoggedIn) {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   // 🚫 Mentor-only page
//   if (pathname === "/dashboard/expert" && !isMentor) {
//     return NextResponse.redirect(new URL("/dashboard/profile", req.url));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/dashboard/:path*", "/signin", "/"],
// };

import {withAuth} from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(){
        return NextResponse.next();
    },
    {
        callbacks:{
            authorized({req, token}){
                const {pathname} = req.nextUrl;
                if(pathname.startsWith("/api/auth") ||
                pathname === "/test" ||
                pathname === "/signin" ||
                pathname === "/signup"   
                ) return true;

                if(pathname === "/") return true;

                return !!token;
            },
        },
    }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};