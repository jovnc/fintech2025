import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SalesVolume() {
  // In a real application, this data would come from an API or state management
  const dailyVolume = 15000;
  const weeklyVolume = 100000;
  const monthlyVolume = 450000;

  return (
    <Card>
      <CardHeader>
        <CardTitle>DINING Token Sales Volume</CardTitle>
        <CardDescription>Trading activity overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Daily</p>
            <p className="text-2xl font-bold">
              {dailyVolume.toLocaleString()} DINING
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Weekly</p>
            <p className="text-2xl font-bold">
              {weeklyVolume.toLocaleString()} DINING
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Monthly</p>
            <p className="text-2xl font-bold">
              {monthlyVolume.toLocaleString()} DINING
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
