"use server";

import { formSchema } from "@repo/types/src/schema";
import { User } from "@repo/types/src/user";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { z } from "zod";
const req_token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJkYzRlMTA5ODE1ZjQ2OTQ2MGU2M2QzNGNkNjg0MjE1MTQ4ZDdiNTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDA2MjA4Mjg5MDAxLTdsZWd2MGdjcjluajFzY25wM2cwMmV2aTY5YzZ0ZXBpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTAwNjIwODI4OTAwMS03bGVndjBnY3I5bmoxc2NucDNnMDJldmk2OWM2dGVwaS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMzQ1MDcyMzA2MTkzODA4ODA1MSIsImhkIjoiaGFueWFuZy5hYy5rciIsImVtYWlsIjoic3RhbmRhcmRzdGFyQGhhbnlhbmcuYWMua3IiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjkwYl9tNlpfeE5jNE40OWh6aHZLVmciLCJuYW1lIjoiwq3tkZzspIDshLEgfCDsoJXrs7Tsi5zsiqTthZztlZnqs7wgfCDtlZzslpHrjIAo7ISc7Jq4KSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMMDcxU3oxRUpBRVFGN3A3M21zYkpEV3BUWUgwTkdld3hxa1BhNWNpOWdPZz1zOTYtYyIsImdpdmVuX25hbWUiOiLtkZzspIDshLEgfCDsoJXrs7Tsi5zsiqTthZztlZnqs7wgfCDtlZzslpHrjIAo7ISc7Jq4KSIsImZhbWlseV9uYW1lIjoiwq0iLCJsb2NhbGUiOiJrbyIsImlhdCI6MTcwNzMwNjIxMCwiZXhwIjoxNzA3MzA5ODEwfQ.TDTJAvToAOGASS248L6U1fQeUUo5dfY14AJtxbNwAIyH-663BQF0UUojllTEp3U5FT1tzyFYugF9rF95xPGS8yoq5bKTkI81aNIHvI5fnbRhqvzQy5sfKTzKv_X0itr5RrV4gsiAdDiDr1H4FOpZ5xHTJ-ysi2myyF_IlNpe-2VfozJF2bGtl3pTtGSLNRL2V_idL5qWTroBEPYr6FhU3gldutBH6C6dfzkBRrq4Exb1X-sw4xV53ON58rlFWCG0dTuljOLBXviYkpKAvA883OCyF-HuMTjF-h9_ltLHG0cI6b92Pz2Y8qp1qxdk-RPCT563F_C54gNyV2_O5ZZvjQ";
export async function signin(values: z.infer<typeof formSchema>) {
  try {
    const res = await fetch(`${process.env.SERVER_IP!}/signin`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      body: JSON.stringify({
        id: values.id,
        password: values.password,
      }),
    });
    const data: User = await res.json();

    //토큰 만들기
    const token = sign(
      { sub: data.userId, aud: data.department },
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: "10s",
      },
    );
    cookies().set("access-token", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    return { data };
  } catch (err) {
    return { data: null };
  }
}
