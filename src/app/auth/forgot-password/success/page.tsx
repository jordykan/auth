import ReturnButton from "@/components/custom/return-button";

const Page = async () => {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/auth/login" label="Login" />
        <h1 className="text-3xl font-bold">Success</h1>
      </div>
      <div className="text-muted foreground">Success!</div>
    </div>
  );
};

export default Page;
