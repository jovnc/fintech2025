"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Scanner } from "@yudiel/react-qr-scanner";
import OTPForm from "./OTPForm";
import { useState } from "react";
import SuccessClaimScreen from "./SuccessClaimScreen";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ArrowRight } from "lucide-react";
import {
  breakfastContractConfig,
  dinnerContractConfig,
} from "@/lib/wagmi/contracts";
import { bigIntToNumber } from "@/lib/utils";

export function ClaimCreditModal({ type }: { type: string }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { writeContractAsync } = useWriteContract();

  const { address } = useAccount();
  const { data: bfastBalance } = useReadContract({
    ...breakfastContractConfig,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  const { data: dinnerBalance } = useReadContract({
    ...dinnerContractConfig,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  if (
    (type === "Breakfast" && bigIntToNumber(bfastBalance) < 1) ||
    (type === "Dinner" && bigIntToNumber(dinnerBalance) < 1)
  ) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-1/2">
            Claim
            <ArrowRight />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Claim</DialogTitle>
            <DialogDescription>
              Claim Your {type} Credits Here
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <p className="text-center">
              You do not have any {type} credits to claim.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/2">
          Claim
          <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Claim</DialogTitle>
          <DialogDescription>Claim Your {type} Credits Here</DialogDescription>
        </DialogHeader>
        {!isSuccess && (
          <div className="flex flex-col gap-4 py-4">
            <Scanner
              onScan={(detectedCodes) => {
                detectedCodes.forEach((code) => console.log(code));
              }}
            />
            <OTPForm
              type={type}
              setIsSuccess={setIsSuccess}
              writeContractAsync={writeContractAsync}
            />
          </div>
        )}
        {isSuccess && (
          <SuccessClaimScreen
            transactionId="1"
            type={type}
            time="14/12 12:00pm"
            setIsSuccess={setIsSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
