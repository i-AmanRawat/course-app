import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicRoute = path == "/signup" || path == "/login";

  const token = request.cookies.get("token");

  if (isPublicRoute && token) {
    //redirect to home
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicRoute && !token) {
    //redirect to login
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/signup", "/login", "/courses", "/logout", "/course/:courseId*"],
};
