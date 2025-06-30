"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "../ui/button";
import Link from "next/link";

const GetStartedButton = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return (
      <Button size="sm" className="opacity-50">
        Iniciando
      </Button>
    );
  }

  const href = session ? "auth/profile" : "/auth/login";
  return (
    <div className="flex flex-col items-center gap-4 ">
      {/* {session && (
        <p className="flex  gap-2">
          <span
            data-role={session.user.role}
            className="size-4 rounded-full animate-pulse data-[role=USER]:bg-blue-600 data-[role=ADMIN]:bg-green-600"
          />
          Bienvenido de nuevo {session.user.name}!{" "}
        </p>
      )} */}
      <Button size="sm" asChild>
        <Link href={href}>Iniciar</Link>
      </Button>
    </div>
  );
};

export default GetStartedButton;
