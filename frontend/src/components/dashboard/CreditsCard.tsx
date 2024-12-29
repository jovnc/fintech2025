"use client";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ClaimCreditModal } from "./ClaimCreditsModal";

interface CreditCardProps {
  title: string;
  amount: number;
  imgSrc: string;
}

export function CreditsCard({ title, amount, imgSrc }: CreditCardProps) {
  return (
    <Card className="grid grid-cols-2 bg-primary/10 p-5">
      <div className="flex flex-col justify-center gap-2">
        <CardTitle className="text-sm font-medium">{title} Credits</CardTitle>
        <div className="text-xl font-bold">{amount}</div>
        <ClaimCreditModal type={title} />
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
