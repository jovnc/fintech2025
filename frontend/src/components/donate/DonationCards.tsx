"use client";
import { Card, CardHeader } from "../ui/card";
import { DonationForm } from "./DonationForm";
import { CommunityProgress } from "./CommunityProgress";
import { useAccount, useReadContract } from "wagmi";
import {
  breakfastContractConfig,
  dinnerContractConfig,
} from "@/lib/wagmi/contracts";
import { bigIntToNumber } from "@/lib/utils";

export default function DonationCards() {
  const { address } = useAccount();
  const { data: bfastAmount } = useReadContract({
    ...breakfastContractConfig,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });
  const { data: dinnerAmount } = useReadContract({
    ...dinnerContractConfig,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  const { data: bfastDonated } = useReadContract({
    ...breakfastContractConfig,
    functionName: "getTotalDonations",
  });

  const { data: dinnerDonated } = useReadContract({
    ...dinnerContractConfig,
    functionName: "getTotalDonations",
  });

  return (
    <>
      <Card className="flex flex-col gap-4 bg-primary/10 p-10">
        <CardHeader className="text-center text-xl font-bold">
          BFAST Credits Donation
        </CardHeader>
        <div className="grid gap-16 md:grid-cols-2">
          <DonationForm currency="BFAST" amount={bigIntToNumber(bfastAmount)} />
          <CommunityProgress
            currency="BFAST"
            donated={bigIntToNumber(bfastDonated)}
          />
        </div>
      </Card>
      <Card className="flex flex-col gap-4 bg-primary/10 p-10">
        <CardHeader className="text-center text-xl font-bold">
          DINNER Credits Donation
        </CardHeader>
        <div className="grid gap-16 md:grid-cols-2">
          <DonationForm
            currency="DINNER"
            amount={bigIntToNumber(dinnerAmount)}
          />
          <CommunityProgress
            currency="DINNER"
            donated={bigIntToNumber(dinnerDonated)}
          />
        </div>
      </Card>
    </>
  );
}
