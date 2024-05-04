"use server";

import { formSchema } from "@repo/types/src/schema";
import { User } from "@repo/types/src/user";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { z } from "zod";
export async function signIn(values: z.infer<typeof formSchema>) {
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
    if (res.status === 200) {
      const data: User = await res.json();
      //토큰 만들기
      const token = sign(
        { sub: data.userId, aud: data.department },
        process.env.JWT_SECRET_KEY!,
        {
          expiresIn: "24h",
        },
      );
      cookies().set("access-token", token, {
        httpOnly: true,
        sameSite: "strict",
      });

      return { data };
    } else {
      return { data: null, error: "unknown error" };
    }
  } catch (err) {
    return { data: null, error: err };
  }
}
