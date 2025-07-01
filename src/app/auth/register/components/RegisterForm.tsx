"use client";

import { SignUpEmailActions } from "@/actions/sign-up-email-actions";
import ReturnButton from "@/components/custom/return-button";
import SingInOauthButton from "@/components/custom/sign-in-oauth-buttons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const RegisterForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const { error } = await SignUpEmailActions(formData);
    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Registro completado");
      router.push("/profile");
    }
    setIsPending(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className=" p-0">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center gap-2">
                <h1 className="text-2xl font-bold">Registrarse</h1>
                <p className="text-muted-foreground text-balance">
                  Ingresa tus datos
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
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
                </div>
                <Input id="password" type="password" name="password" />
              </div>
              <Button
                type="submit"
                color="primary"
                className="w-full"
                disabled={isPending}
              >
                Registrarse
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
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        <ReturnButton href="/auth/login" label="Regresar al login" />
      </div>
    </div>
  );
};

export default RegisterForm;
