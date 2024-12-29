import CreditsDisplay from "@/components/dashboard/CreditsDisplay";
import { XrpCard } from "@/components/dashboard/XrpCard";

export default async function Dashboard() {
  return (
    <div className="flex flex-col mx-20 items-center justify-center my-10">
      <div className="flex flex-col justify-between mb-8">
        <h1 className="text-3xl font-bold text-center">
          Welcome to FinishYourCredits!
        </h1>
        <h3 className="text-md text-gray-500 text-center">
          A better way to use your credits.
        </h3>
      </div>
      <CreditsDisplay />
      <div className="my-8 w-full">
        <XrpCard />
      </div>
    </div>
  );
}
