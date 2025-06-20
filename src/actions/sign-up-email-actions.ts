"use server";

import { auth } from "@/lib/auth";

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
    if (error instanceof Error) {
      return { error: "Ooops! something went wrong whilte registering" };
    }
    return { error: "Internal server error" };
  }
};
