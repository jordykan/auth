import Link from "next/link";
import RegisterForm from "./components/RegisterForm";
import SingInOauthButton from "@/components/custom/sign-in-oauth-buttons";

const Page = () => {
  return (
    // <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
    //   <div className="space-y-8">
    //     <h1 className="text-3xl font-bold">Register</h1>
    //   </div>
    //   <div className="space-y-4">
    //     <RegisterForm />
    //     <p className="text-muted-foreground text-sm">
    //       No tienes una cuenta?{" "}
    //       <Link href="/auth/login" className="hover:text-foreground">
    //         Login
    //       </Link>
    //     </p>
    //   </div>
    //   <div className="flex flex-col max-w-sm gap-4">
    //     <hr className="max-w-sm" />
    //     <SingInOauthButton provider="google" signUp />
    //     <SingInOauthButton provider="github" signUp />
    //   </div>
    // </div>
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-1xl">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Page;
