"use client";
import { CircleCheckBig } from "lucide-react";
import { Button } from "../ui/button";

export default function SuccessClaimScreen({
  TransactionId,
  Time,
  setIsSuccess,
}: {
  TransactionId: string;
  Time: string;
  setIsSuccess: (value: boolean) => void;
}) {
  const handleClick = () => {
    setIsSuccess(false);
  };
  return (
    <div className="flex flex-col p-4 border border-green-400 items-center justify-center gap-4">
      <p className="text-sm">Transaction ID: {TransactionId}</p>
      <CircleCheckBig className="text-green-500 w-20 h-20" />
      <p className="text-lg font-bold">{Time}</p>
      <p className="text-sm">Kent Ridge Hall Dinner</p>
      <p className="text-xs text-gray-600 mt-10 text-center">
        Note: please present this page to staff to claim your meal. Please
        confirm transaction once claimed to make a new claim.
      </p>
      <Button onClick={handleClick}>Confirm Transaction</Button>
    </div>
  );
}
