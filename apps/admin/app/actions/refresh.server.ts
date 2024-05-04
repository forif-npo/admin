"use server";
import { SignJWT } from "jose";

export async function refresh() {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

  //access-token의 유효기간 : 30분
  const token = await new SignJWT({ sub: "2023063845", aud: "정보시스템학과" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30m")
    .sign(secret);
  return token;
}
