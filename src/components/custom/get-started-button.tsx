"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "../ui/button";
import Link from "next/link";

const GetStartedButton = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return (
      <Button size="sm" className="opacity-50">
        Get Started
      </Button>
    );
  }

  const href = session ? "auth/profile" : "/auth/login";
  return (
    <div className="flex flex-col items-center gap-4 ">
      <Button size="sm" asChild>
        <Link href={href}>Get Started</Link>
      </Button>
      {session && <p>Welcome Back, {session.user.name}! </p>}
    </div>
  );
};

export default GetStartedButton;
