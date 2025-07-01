import Link from "next/link";
import RegisterForm from "./components/RegisterForm";
import SingInOauthButton from "@/components/custom/sign-in-oauth-buttons";

const Page = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-1xl">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Page;
