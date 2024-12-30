"use client";

import { useAccount, useReadContract } from "wagmi";
import { CreditsCard } from "./CreditsCard";
import {
  breakfastContractConfig,
  dinnerContractConfig,
} from "@/lib/wagmi/contracts";

export default function CreditsDisplay() {
  const { address } = useAccount();

  const breakfastResult = useReadContract({
    ...breakfastContractConfig,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  const dinnerResult = useReadContract({
    ...dinnerContractConfig,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  const numberBreakfastCredits = Number(breakfastResult.data) / 10 ** 18;
  const numberDinnerCredits = Number(dinnerResult.data) / 10 ** 18;

  return (
    <div className="grid w-full grid-cols-1 items-center justify-center gap-4 md:grid-cols-2">
      <CreditsCard
        title="Breakfast"
        amount={numberBreakfastCredits || 0}
        imgSrc="/breakfast.png"
      />
      <CreditsCard
        title="Dinner"
        amount={numberDinnerCredits || 0}
        imgSrc="/dinner.png"
      />
    </div>
  );
}
