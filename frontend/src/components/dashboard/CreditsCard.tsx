"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ClaimCreditModal } from "./ClaimCreditsModal";

interface CreditCardProps {
  title: string;
  amount: number;
  imgSrc: string;
}

export function CreditsCard({ title, amount, imgSrc }: CreditCardProps) {
  return (
    <Card className="flex w-full flex-col items-center justify-center gap-4 bg-primary/10 p-5 sm:grid-cols-2">
      <div className="flex flex-row items-center justify-center gap-2">
        <Image
          className="object-fill"
          src={imgSrc}
          width={30}
          height={30}
          alt="food image"
        />
        <p className="text-md font-bold">{title} Credits</p>
      </div>

      <div className="text-center text-3xl font-bold">{amount}</div>
      <div className="flex w-full flex-row items-center justify-center gap-4">
        <ClaimCreditModal type={title} />
      </div>
    </Card>
  );
}
