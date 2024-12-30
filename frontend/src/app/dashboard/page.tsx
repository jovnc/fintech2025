import CreditsDisplay from "@/components/dashboard/CreditsDisplay";
import { XrpCard } from "@/components/dashboard/XrpCard";

export default async function Dashboard() {
  return (
    <div className="mx-20 my-10 flex flex-col items-center justify-center gap-4">
      <div className="mb-8 flex flex-col justify-between">
        <h1 className="text-center text-3xl font-bold">
          Welcome to FinishYourCredits!
        </h1>
        <h3 className="text-md text-center text-gray-500">
          A better way to use your credits.
        </h3>
      </div>
      <CreditsDisplay />
      <XrpCard />

      {/* Active Sell Orders (allow modification - remove / update) */}
    </div>
  );
}
