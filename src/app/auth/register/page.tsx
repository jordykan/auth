import Link from "next/link";
import RegisterForm from "./components/RegisterForm";

const Page = () => {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Register</h1>
      </div>

      <RegisterForm />
      <p className="text-muted-foreground text-sm">
        No tienes una cuenta?{" "}
        <Link href="/auth/login" className="hover:text-foreground">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Page;
