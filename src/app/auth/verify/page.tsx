import ReturnButton from "@/components/custom/return-button";
import SendVerificationEmailForm from "../login/components/send-verification-email-form";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}
const Page = async ({ searchParams }: PageProps) => {
  const error = (await searchParams).error;
  if (!error) redirect("/profile");
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Verificar Email
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            <div className="text-destructive">
              {error === "invalid_token" || error === "token_expired"
                ? "Token Invalido"
                : "Error del servidor"}
            </div>
          </CardDescription>
          <CardContent>
            <SendVerificationEmailForm />
          </CardContent>
        </CardHeader>
        <div className="text-center">
          <ReturnButton href="/auth/login" label="Regresar al login " />
        </div>
      </Card>
    </div>
  );
};

export default Page;
