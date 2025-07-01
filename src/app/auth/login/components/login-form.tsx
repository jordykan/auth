"use client";

import { SignInEmailActions } from "@/actions/sign-in-email-actions";
import MagicLinkForm from "@/components/custom/magic-link-form";
import ReturnButton from "@/components/custom/return-button";
import SingInOauthButton from "@/components/custom/sign-in-oauth-buttons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LaughIcon } from "lucide-react";
import Link from "next/link";
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
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center gap-2">
                <h1 className="text-2xl font-bold">Bienvenido</h1>
                <p className="text-muted-foreground text-balance">
                  Inicia sesion en tu cuenta
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@exampe.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/auth/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Olvido su contrasena?
                  </a>
                </div>
                <Input id="password" type="password" name="password" />
              </div>
              <Button
                type="submit"
                color="primary"
                className="w-full"
                disabled={isPending}
              >
                Login
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  O continua con
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SingInOauthButton provider="google" signUp />
                <SingInOauthButton provider="github" signUp />
              </div>
              <div className="text-center text-sm">
                No tienes una cuenta?{" "}
                <a
                  href="/auth/register"
                  className="underline underline-offset-4"
                >
                  Registrate
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <LaughIcon className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        <ReturnButton href="/" label="Regresar al inicio " />
      </div>
    </div>
  );
};

export default LoginForm;
