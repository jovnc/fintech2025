"use client";
import { CircleCheckBig } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function SuccessClaimScreen({
  transactionId,
  type,
  setIsSuccess,
}: {
  transactionId: string;

  type: string;
  setIsSuccess: (value: boolean) => void;
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Function to format the current time
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString(); // Adjust format as needed
      setTime(formattedTime);
    };

    updateTime(); // Set initial time
  }, []);
  const handleClick = () => {
    setIsSuccess(false);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 border border-green-400 p-4">
      <p className="text-sm">Transaction ID: {transactionId}</p>
      <CircleCheckBig className="h-20 w-20 text-green-500" />
      <p className="text-lg font-bold">{time}</p>
      <p className="text-sm">Kent Ridge Hall {type}</p>
      <p className="mt-10 text-center text-xs text-gray-600">
        Note: please present this page to staff to claim your meal. Please
        confirm transaction once claimed to make a new claim.
      </p>
      <Button onClick={handleClick}>Confirm Transaction</Button>
    </div>
  );
}
