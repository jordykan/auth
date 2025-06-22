"use client";

import { SignInEmailActions } from "@/actions/sign-in-email-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const { error } = await SignInEmailActions(formData);
    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Bienvenido");
      router.push("/profile");
    }
    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm w-full">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password" />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
