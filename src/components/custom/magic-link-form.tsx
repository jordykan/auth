"use client";
import { Loader2, StarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";

const MagicLinkForm = () => {
  const ref = useRef<HTMLDetailsElement>(null);
  const [isPending, setIsPending] = useState(false);
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const email = String(formData.get("email"));
    if (!email) return toast.error("Please enter your email");
    await signIn.magicLink({
      email,
      name: email.split("@")[0],
      callbackURL: "/profile",
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
          toast.success("Link enviado");
          if (ref.current) ref.current.open = false;
          (evt.target as HTMLFormElement).reset();
        },
      },
    });
  };
  return (
    <details
      ref={ref}
      className="w-full max-w-md rounded-lg  shadow-sm overflow-hidden"
    >
      <summary className="text-xs flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition rounded-t-lg">
        <StarIcon size={16} /> Inicar con Magic Link
      </summary>

      <Card className="border-none shadow-none rounded-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Accede con tu correo
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                disabled={isPending}
              />
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button className="bg-primary" type="submit" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                Enviar enlace
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </details>
  );
};

export default MagicLinkForm;
