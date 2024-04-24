"use server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function refresh() {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

  const token = await new SignJWT({ sub: "2023063845", aud: "정보시스템학과" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2m")
    .sign(secret);
  cookies().set("refresh-token", token);
  return token;
  // const refreshToken = cookies().get("refresh-token");
  // try {
  //   const res = await fetch(process.env.SERVER_IP!, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       refreshToken,
  //     }),
  //   });
  //   if (res.ok) {
  //     const { accessToken } = await res.json();
  //     return accessToken;
  //   }
  // } catch (err) {
  //   console.error("Error refreshing access token:", err);
  //   return null;
  // }
}
