"use client";
import { Card } from "@/components/ui/card";
import { convertDropsToXRP } from "@/lib/wagmi/utils";
import { useAccount, useBalance } from "wagmi";
import TopUpXRP from "./TopUpXRP";

export function XrpCard() {
  // Get the connected wallet's address
  const { address, isConnected } = useAccount();

  // Get the balance of the connected wallet
  const {
    data: balance,
    isLoading: isBalanceLoading,
    refetch,
  } = useBalance({
    address,
  });

  const converted = balance?.value ? convertDropsToXRP(balance.value) : 0;

  return (
    <Card className="w-full bg-primary/10 p-5 sm:grid-cols-2">
      <div className="flex w-full flex-row justify-between">
        <p className="text-md w-full font-medium">XRP Balance</p>
        <div className="flex w-full flex-col items-end gap-2">
          <p className="w-full text-end">
            {converted} {balance?.symbol}
          </p>
          <TopUpXRP refetch={refetch} />
        </div>
      </div>
    </Card>
  );
}
