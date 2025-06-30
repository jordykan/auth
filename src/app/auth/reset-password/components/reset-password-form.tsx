"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ResetPasswordProps {
  token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);

    const password = String(formData.get("password"));
    if (!password) return toast.error("Ingrese su contrasenia");

    const confirmPassword = String(formData.get("confirmPassword"));
    if (!confirmPassword) return toast.error("Password no coincide");

    await resetPassword({
      newPassword: password,
      token,

      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Password actualizado");
          router.push("/auth/verify/success");
        },
      },
    });
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">New Password</Label>
        <Input type="password" id="password" name="password" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input type="password" id="confirmPassword" name="confirmPassword" />
      </div>
      <Button type="submit" disabled={isPending}>
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
