"use client";
import { StarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import router from "next/router";

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
          toast.success("Rol actualizado");
          if (ref.current) ref.current.open = false;
          (evt.target as HTMLFormElement).reset();
        },
      },
    });
  };
  return (
    <details
      ref={ref}
      className="max-w-sm rounded-md border border-green-600 overflow-hidden"
    >
      <summary className="flex gap-2 items-center px-2 py-1 bg-green-600 text-white hover:bg-green-600/80 transtion">
        Magic Link <StarIcon size={16} />
      </summary>

      <form onSubmit={handleSubmit} className="px-2 py-1">
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>
        <div className="flex gap-2 items-center">
          <Input type="email" id="email" name="email" placeholder="Email" />
          <Button type="submit" disabled={isPending}>
            Enviar
          </Button>
        </div>
      </form>
    </details>
  );
};

export default MagicLinkForm;
