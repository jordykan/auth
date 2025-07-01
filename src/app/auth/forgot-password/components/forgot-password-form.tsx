"use client";

import ReturnButton from "@/components/custom/return-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgetPassword } from "@/lib/auth-client";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const email = String(formData.get("email"));

    if (!email) return toast.error("Ingrese su correo");

    await forgetPassword({
      email,
      redirectTo: "/auth/reset-password",
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
          toast.success("Reset link sent to your email!");
          router.push("/auth/forgot-password/success");
        },
      },
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Restablecer contrasenia
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Ingresa tu email y te enviaremos un enlace para restablecer tu
            contraseña
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Correo electronico
              </Label>
              <div className="relative ">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="tu@example.com"
                  className="pl-10 required"
                  id="email"
                  name="email"
                />
              </div>
            </div>
            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={isPending}
            >
              Enviar enlace de restablecimiento
            </Button>
          </form>
          <div className="text-center">
            <ReturnButton href="/auth/login" label="Regresar al login " />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
