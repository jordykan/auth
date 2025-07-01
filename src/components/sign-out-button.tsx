"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";

const SingOutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    await signOut({
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
          router.push("/auth/login");
        },
      },
    });
  };
  return (
    <div className="">
      <Button
        onClick={handleClick}
        size="sm"
        variant="destructive"
        disabled={isPending}
      >
        Cerrar sesion
      </Button>
    </div>
  );
};

export default SingOutButton;
