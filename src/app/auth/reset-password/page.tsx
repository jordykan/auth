import ReturnButton from "@/components/custom/return-button";
import { redirect } from "next/navigation";
import ResetPasswordForm from "./components/reset-password-form";
interface PageProps {
  searchParams: Promise<{ token: string }>;
}
const Page = async ({ searchParams }: PageProps) => {
  const token = (await searchParams).token;
  if (!token) redirect("/auth/login");
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/auth/login" label="Login" />
        <h1 className="text-3xl font-bold">Reset Password</h1>
      </div>
      <div className="text-muted-foreground">
        Please enter your new password, Make sure it is at least 6 characters
      </div>
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default Page;
