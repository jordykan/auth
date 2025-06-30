import ReturnButton from "@/components/custom/return-button";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}
const Page = async ({ searchParams }: PageProps) => {
  const sp = await searchParams;
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/auth/login" label="Login" />
        <h1 className="text-3xl font-bold">Login Error</h1>
      </div>
      <div className="text-destructive">
        {sp.error === "account_not_linked"
          ? "Cuenta ya registrada con otro metodo"
          : "Error del servidor"}
      </div>
    </div>
  );
};

export default Page;
