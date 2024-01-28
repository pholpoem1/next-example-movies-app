"use server";

import { SignJWT, importJWK } from "jose";
import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { IFormData } from "./page";

export const login = async (data: IFormData) => {
  try {
    const username = data.username;
    const password = data.password;

    if (username === "test" && password === "123456") {
      const secretJWK = {
        kty: "oct",
        k: process.env.JOSE_SECRET
      };

      const secretKey = await importJWK(secretJWK, "HS256");
      const token = await new SignJWT({ username })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h") // Token expires in 1 hour
        .sign(secretKey);

      cookies().set("token", token);
      redirect("/");
    } else {
      return { message: "Login fail" };
    }
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log("error", error);
    return { message: "Failed to create" };
  }
};

export const logout = async () => {
  try {
    cookies().set("token", "");

    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
