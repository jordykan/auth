import ReturnButton from "@/components/custom/return-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const sp = await searchParams;
  const errorMessage =
    sp.error === "account_not_linked"
      ? "Esta cuenta ya está registrada con otro método de acceso."
      : "Ocurrió un error en el servidor. Intenta nuevamente.";

  return (
    <div className="container max-w-md mx-auto py-16 px-4 space-y-6">
      <Alert variant="destructive">
        <TriangleAlert className="h-5 w-5" />
        <AlertTitle>Error de autenticación</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
      <ReturnButton href="/auth/login" label="Volver al login" />
    </div>
  );
};

export default Page;
