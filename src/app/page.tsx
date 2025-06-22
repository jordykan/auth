import GetStartedButton from "@/components/custom/get-started-button";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="flex justify-center gap-8 flex-col items-center">
        <h1 className="text-6xl font-bold">Better Auth</h1>
        <GetStartedButton />
      </div>
    </div>
  );
};

export default Page;
