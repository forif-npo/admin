import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { refresh } from "./app/actions/refresh.server";

export async function middleware(req: NextRequest, res: NextResponse) {
  const accessToken = cookies().get("access-token")?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const { pathname, origin } = req.nextUrl;
  //로그아웃 처리
  if (pathname === "/sign-out") {
    const response = NextResponse.redirect(new URL("/sign-in", req.url));
    response.cookies.delete("access-token");
    response.cookies.delete("refresh-token");
    return response;
  }
  //로그인 페이지 처리
  if (pathname === "/sign-in" || pathname === "/") {
    if (accessToken) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }
  try {
    const { payload, protectedHeader } = await jwtVerify(accessToken!, secret);
    return NextResponse.next();
  } catch (err: any) {
    const newAccessToken = await refresh(); //refresh access token using refresh token
    console.log(newAccessToken);

    return NextResponse.redirect(req.nextUrl, {
      headers: {
        "Set-Cookie": `access-token=${newAccessToken}; Path=/; HttpOnly; SameSite=Strict; Secure`,
      },
    });
  }
}

export const config = {
  matcher: ["/dashboard", "/sign-in", "/sign-out", "/"],
};
