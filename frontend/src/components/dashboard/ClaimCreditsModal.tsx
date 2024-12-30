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
import { useWriteContract } from "wagmi";
import { ArrowRight } from "lucide-react";

export function ClaimCreditModal({ type }: { type: string }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { writeContractAsync } = useWriteContract();

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
