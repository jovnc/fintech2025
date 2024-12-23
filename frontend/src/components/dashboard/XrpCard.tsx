"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

interface XrpCardProps {
  amount: number;
}

export function XrpCard({ amount }: XrpCardProps) {
  return (
    <Card className="bg-gradient-to-br grid sm:grid-cols-2 from-orange-200 to-orange-300 p-5">
      <div className="justify-center flex flex-col">
        <CardTitle className="text-lg font-medium">XRP Balance</CardTitle>

        <div className="text-2xl font-bold">{amount} XRP</div>
      </div>
    </Card>
  );
}
