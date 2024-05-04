import { jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { refresh } from "./app/actions/refresh.server";

export async function middleware(req: NextRequest, res: NextResponse) {
  const accessToken = cookies().get("access-token")?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const { pathname, origin } = req.nextUrl;

  //sign-out
  if (pathname === "/sign-out") {
    const response = NextResponse.redirect(new URL("/sign-in", req.url));
    response.cookies.delete("access-token");
    response.cookies.delete("refresh-token");
    return response;
  }
  //access sign-in(/) page
  if (pathname === "/sign-in" || pathname === "/") {
    if (accessToken) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }
  try {
    // verify jwt token
    const { payload, protectedHeader } = await jwtVerify(accessToken!, secret);
    return NextResponse.next();
  } catch (err) {
    // when access token expired
    if (err instanceof JWTExpired) {
      const newAccessToken = await refresh(); //refresh access token using refresh token

      return NextResponse.redirect(req.nextUrl, {
        headers: {
          "Set-Cookie": `access-token=${newAccessToken}; Path=/; HttpOnly; SameSite=Strict; Secure`,
        },
      });
    } else {
      const response = NextResponse.redirect(new URL("/sign-out", req.url));
      return response;
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-out", "/"],
};
