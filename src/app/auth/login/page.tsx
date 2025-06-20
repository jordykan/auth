import ReturnButton from "@/components/custom/return-button";
import LoginForm from "./components/login-form";
import Link from "next/link";

const Page = async () => {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/" label="Home" />
        <h1 className="text-3xl font-bold">Login</h1>
      </div>
      <LoginForm />
      <p className="text-muted-foreground text-sm">
        No tienes una cuenta?{" "}
        <Link href="/auth/register" className="hover:text-foreground">
          Registrar
        </Link>
      </p>
    </div>
  );
};

export default Page;
