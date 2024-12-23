import { Progress } from "@/components/ui/progress";

interface CommunityProgressProps {
  current: number;
  goal: number;
}

export function CommunityProgress({ current, goal }: CommunityProgressProps) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Community Donation Progress</h3>
      <Progress value={percentage} className="w-full" />
      <p className="text-sm text-muted-foreground">
        {current.toLocaleString()} / {goal.toLocaleString()} credits donated
      </p>
      <p className="text-sm">
        Students and staff like you are making a difference!
      </p>
    </div>
  );
}
