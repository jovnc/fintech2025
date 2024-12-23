"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CreditCardProps {
  title: string;
  amount: number;
}

export function CreditsCard({ title, amount }: CreditCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title} Credits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount}</div>
      </CardContent>
    </Card>
  );
}
