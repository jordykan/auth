"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth/api";

export const SignUpEmailActions = async (formData: FormData) => {
  const name = formData.get("name") as string;
  if (!name) return { error: "Please enter your name" };

  const email = formData.get("email") as string;
  if (!email) return { error: "Please enter your email" };

  const password = formData.get("password") as string;
  if (!password) return { error: "Please enter your password" };

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return { error: null };
  } catch (error) {
    if (error instanceof APIError) {
      const errCode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";
      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "Usuario ya existe" };
        case "PASSWORD_TOO_SHORT": {
          return { error: "Contrasenia corta" };
        }
        default:
          return { error: error.message };
      }
    }
    return { error: "Internal server error" };
  }
};
