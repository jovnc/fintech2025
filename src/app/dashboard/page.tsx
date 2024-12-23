import { CreditsCard } from "@/components/dashboard/CreditsCard";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";

async function getInitialData() {
  // Replace this with actual data fetching logic
  return {
    breakfastCredits: 5,
    dinnerCredits: 3,
    transactions: [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending" as "pending",
        email: "m@example.com",
      },
      {
        id: "489e1d42",
        amount: 125,
        status: "processing" as "processing",
        email: "example@gmail.com",
      },
    ],
  };
}

export default async function Dashboard() {
  const initialData = await getInitialData();

  return (
    <div className="py-10 px-15 mx-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-8 px-4">
        <CreditsCard title="Breakfast" amount={initialData.breakfastCredits} />
        <CreditsCard title="Dinner" amount={initialData.dinnerCredits} />
      </div>
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Transaction History</h2>
        <TransactionsTable data={initialData.transactions} />
      </div>
    </div>
  );
}
