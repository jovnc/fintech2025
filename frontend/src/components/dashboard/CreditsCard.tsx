"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import ClaimCreditsButton from "./ClaimCreditsButton";

interface CreditCardProps {
  title: string;
  amount: number;
  imgSrc: string;
}

export function CreditsCard({ title, amount, imgSrc }: CreditCardProps) {
  return (
    <Card className="bg-gradient-to-br grid grid-cols-2 from-orange-100 to-orange-200 text-gray-800 p-5">
      <div className="justify-center flex flex-col">
        <CardTitle className="text-lg font-medium">{title} Credits</CardTitle>
        <div className="text-2xl font-bold">{amount}</div>
        <ClaimCreditsButton />
      </div>

      <div className="flex justify-end">
        <Image
          className="object-fill"
          src={imgSrc}
          width={120}
          height={120}
          alt="food image"
        />
      </div>
    </Card>
  );
}
