"use client";
import { AccountsTable } from "@/components/admin/AccountsTable";
import { CreditMinting } from "@/components/admin/CreditMinting";
import { SummaryStatistics } from "@/components/admin/SummaryStatistics";
import { TimeFilter } from "@/components/admin/TimeFilter";
import { UsageCharts } from "@/components/admin/UsageCharts";
import { useEffect, useState } from "react";

const mockAccounts = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    diningCredits: 50,
    breakfastCredits: 30,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    diningCredits: 45,
    breakfastCredits: 25,
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    diningCredits: 60,
    breakfastCredits: 35,
  },
  // Add more mock accounts as needed
];

export const mockUsageData = [
  { date: "2024-12-14", diningCredits: 100, breakfastCredits: 50 }, // within the past week
  { date: "2024-12-15", diningCredits: 120, breakfastCredits: 60 }, // within the past week
  { date: "2024-12-16", diningCredits: 90, breakfastCredits: 45 }, // within the past week
  { date: "2024-12-17", diningCredits: 110, breakfastCredits: 55 }, // within the past week
  { date: "2024-12-18", diningCredits: 130, breakfastCredits: 65 }, // within the past week
  { date: "2024-12-19", diningCredits: 100, breakfastCredits: 50 }, // within the past week
  { date: "2024-12-20", diningCredits: 115, breakfastCredits: 58 }, // within the past week
  { date: "2024-11-21", diningCredits: 105, breakfastCredits: 52 }, // within the past month
  { date: "2024-11-30", diningCredits: 125, breakfastCredits: 62 }, // within the past month
  { date: "2024-10-21", diningCredits: 95, breakfastCredits: 48 }, // within the past month
  { date: "2024-07-21", diningCredits: 110, breakfastCredits: 55 }, // within the past year
  { date: "2024-01-21", diningCredits: 100, breakfastCredits: 50 }, // within the past year
  { date: "2023-12-21", diningCredits: 120, breakfastCredits: 60 }, // within the past year
];

export default function AdminPanel() {
  const [filteredUsageData, setFilteredUsageData] = useState(mockUsageData);

  const filterDataByPeriod = (period: string) => {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "week":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7
        );
        break;
      case "month":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        break;
      case "year":
        startDate = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate()
        );
        break;
      default:
        startDate = new Date(0); // Beginning of time
    }

    return mockUsageData.filter((data) => new Date(data.date) >= startDate);
  };

  const handleTimeFilterChange = (period: string) => {
    const filtered = filterDataByPeriod(period);
    setFilteredUsageData(filtered);
  };

  useEffect(() => {
    // Initialize with "week" filter
    handleTimeFilterChange("week");
  }, []);

  const totalAccounts = mockAccounts.length;
  const totalDiningCredits = mockAccounts.reduce(
    (sum, account) => sum + account.diningCredits,
    0
  );
  const totalBreakfastCredits = mockAccounts.reduce(
    (sum, account) => sum + account.breakfastCredits,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <TimeFilter onFilterChange={handleTimeFilterChange} />
      <div className="mt-8">
        <SummaryStatistics
          totalAccounts={totalAccounts}
          totalDiningCredits={totalDiningCredits}
          totalBreakfastCredits={totalBreakfastCredits}
        />
      </div>
      <div className="mt-8">
        <UsageCharts data={filteredUsageData} />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">All Accounts</h2>
        <AccountsTable accounts={mockAccounts} />
      </div>
      <div className="mt-8">
        <CreditMinting />
      </div>
    </div>
  );
}
