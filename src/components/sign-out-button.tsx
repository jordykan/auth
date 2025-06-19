"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

const SingOutButton = () => {
  const router = useRouter();
  const handleClick = async () => {
    await signOut({
      fetchOptions: {
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
      <Button onClick={handleClick} size="sm" variant="destructive">
        Cerrar sesion
      </Button>
    </div>
  );
};

export default SingOutButton;
