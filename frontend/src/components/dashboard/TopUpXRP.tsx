"use client";

import { useAccount } from "wagmi";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export default function TopUpXRP({ refetch }: { refetch: () => void }) {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const handleTopUp = async () => {
    setIsLoading(true);
    if (!isConnected) {
      toast({
        title: "Not connected",
        description: "Please connect your wallet",
      });
      setIsLoading(false);
      return;
    }
    const data = await fetch("/api/wallet", {
      method: "POST",
      body: JSON.stringify({ recipient: address, amount: 10 }),
    });
    const response = await data.json();
    console.log(response);
    if (!(response.status === "success")) {
      toast({
        title: "Error",
        description: response.error,
      });
      return;
    }
    refetch();
    toast({
      title: "Top up",
      description: "Your wallet has been topped up",
    });
    setIsLoading(false);
  };

  if (isLoading) {
    return <Button disabled>Loading...</Button>;
  }
  return (
    <Button onClick={handleTopUp} className="w-1/2">
      Top up
    </Button>
  );
}
