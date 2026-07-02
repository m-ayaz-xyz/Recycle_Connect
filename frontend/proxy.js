import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request) {

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
  );

  const { payload } = await jwtVerify(
    token,
    secret
  );

  const role = payload.role;

  if (
    request.nextUrl.pathname.startsWith("/vendor-dashboard")
    && role !== "vendor"
  ) {
    return NextResponse.redirect(
      new URL("/unauthorized", request.url)
    );
  }

  if (
    request.nextUrl.pathname.startsWith("/user-dashboard")
    && role !== "user"
  ) {
    return NextResponse.redirect(
      new URL("/unauthorized", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/vendor-dashboard/:path*",
    "/user-dashboard/:path*"
  ]
};