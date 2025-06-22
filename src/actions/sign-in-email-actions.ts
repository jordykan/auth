"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export const SignInEmailActions = async (formData: FormData) => {
  const email = formData.get("email") as string;
  if (!email) return { error: "Please enter your email" };

  const password = formData.get("password") as string;
  if (!password) return { error: "Please enter your password" };

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
      asResponse: true,
    });

    return { error: null };
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message };
    }
    return { error: "Internal server error" };
  }
};
