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
  breakfastContractAddress,
  breakfastContractConfig,
  dinnerContractConfig,
} from "@/lib/wagmi/contracts";
import { bigIntToNumber } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { createCreditClaim } from "@/actions/credits";
import { useSession } from "next-auth/react";
import { estimateGas } from "@wagmi/core";
import { config } from "@/lib/wagmi/config";

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

  const { data } = useSession();
  if (!data || !data.user) return null;
  const id = data.user.id;

  const handleFormSubmission = async (otp: string) => {
    if (otp === "1234" && type === "Breakfast") {
      try {
        const txHash = await writeContractAsync({
          ...breakfastContractConfig,
          functionName: "claimDiningCredit",
          args: [],
        });
        await createCreditClaim(id as string, txHash as string, type);
        setIsSuccess(true);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to claim credits. Please try again",
        });
      }
    } else if (otp === "1234" && type === "Dinner") {
      try {
        const txHash = await writeContractAsync({
          ...dinnerContractConfig,
          functionName: "claimDiningCredit",
          args: [],
        });
        await createCreditClaim(id as string, txHash as string, type);
        setIsSuccess(true);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to claim credits. Please try again",
        });
      }
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please try again",
      });
    }
  };

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
        <DialogContent className="w-3/4 px-4">
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
                handleFormSubmission(detectedCodes[0].rawValue);
              }}
            />
            <OTPForm handleForm={handleFormSubmission} />
          </div>
        )}
        {isSuccess && (
          <SuccessClaimScreen
            transactionId="1"
            type={type}
            setIsSuccess={setIsSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
