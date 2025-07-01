import ReturnButton from "@/components/custom/return-button";
import LoginForm from "./components/login-form";
import Link from "next/link";
import SingInOauthButton from "@/components/custom/sign-in-oauth-buttons";
import MagicLinkForm from "@/components/custom/magic-link-form";
import { Card, CardContent } from "@/components/ui/card";

const Page = async () => {
  return (
    //   <div className="space-y-4">
    //
    //

    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
