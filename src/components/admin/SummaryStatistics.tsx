import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryStatisticsProps {
  totalAccounts: number;
  totalDiningCredits: number;
  totalBreakfastCredits: number;
}

export function SummaryStatistics({
  totalAccounts,
  totalDiningCredits,
  totalBreakfastCredits,
}: SummaryStatisticsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAccounts}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Dining Credits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDiningCredits}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Breakfast Credits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBreakfastCredits}</div>
        </CardContent>
      </Card>
    </div>
  );
}
