import ReturnButton from "@/components/custom/return-button";
import SendVerificationEmailForm from "../login/components/send-verification-email-form";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}
const Page = async ({ searchParams }: PageProps) => {
  const error = (await searchParams).error;
  if (!error) redirect("/profile");
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/auth/login" label="Login" />
        <h1 className="text-3xl font-bold">Verify Email</h1>
      </div>
      <div className="text-destructive">
        {error === "invalid_token" || error === "token_expired"
          ? "Token Invalido"
          : "Error del servidor"}
      </div>
      <SendVerificationEmailForm />
    </div>
  );
};

export default Page;
