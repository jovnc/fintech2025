"use client";
import { Card } from "@/components/ui/card";
import { convertDropsToXRP } from "@/lib/wagmi/utils";
import { useAccount, useBalance, useReadContract } from "wagmi";
import TopUpXRP from "./TopUpXRP";
import { CircleDollarSign } from "lucide-react";
import { vaultContractConfig } from "@/lib/wagmi/contracts";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { writeContract } from "@wagmi/core";
import { config } from "@/lib/wagmi/config";
import { usePrice } from "@/hooks/use-price";
import { convertToSGD } from "@/lib/utils";

export function XrpCard() {
  // Get the connected wallet's address
  const { address } = useAccount();

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
    <div className="grid w-full grid-cols-1 items-center justify-center gap-4 md:grid-cols-2">
      <CurrentXRPBalance amount={converted} symbol="XRP" refetch={refetch} />
      <WithdrawXRPBalance address={address || ""} refetch={refetch} />
    </div>
  );
}

function CurrentXRPBalance({
  amount,
  symbol,
  refetch,
}: {
  amount: number | string;
  symbol: string;
  refetch: () => void;
}) {
  const { price } = usePrice();
  return (
    <Card className="h-full w-full items-center justify-center bg-primary/10 p-5 sm:grid-cols-2">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="flex flex-row items-center justify-center gap-2">
          <CircleDollarSign />
          <p className="text-md text-center font-bold">XRP Balance</p>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="w-full text-center text-2xl font-bold">{amount}</p>
          <p className="text-sm text-muted-foreground">{symbol}</p>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-sm text-muted-foreground">
            (${convertToSGD(price, amount)} SGD)
          </p>
        </div>

        <TopUpXRP refetch={refetch} />
      </div>
    </Card>
  );
}

function WithdrawXRPBalance({
  address,
  refetch,
}: {
  address: string;
  refetch: () => void;
}) {
  const { data: vaultBalance } = useReadContract({
    ...vaultContractConfig,
    functionName: "getBalance",
    args: [address as `0x${string}`],
  });

  const balance = vaultBalance ? Number(convertDropsToXRP(vaultBalance)) : 0;

  const { price } = usePrice();

  const withdraw = async () => {
    if (balance <= 0) {
      toast({
        title: "Error",
        description: "You don't have enough balance to withdraw",
      });
      return;
    }
    try {
      const result = await writeContract(config, {
        ...vaultContractConfig,
        functionName: "withdraw",
        args: [BigInt(balance * 10 ** 18)],
      });
      toast({
        title: "Success",
        description: "Withdrawal successful",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to withdraw balance",
      });
    }
  };

  return (
    <Card className="w-full bg-primary/10 p-5 sm:grid-cols-2">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="flex flex-row items-center justify-center gap-2">
          <CircleDollarSign />
          <p className="text-md text-center font-bold">Withdraw Balance</p>
        </div>

        <div className="flex flex-row items-center justify-center gap-2">
          <p className="w-full text-center text-2xl font-bold">{balance}</p>
          <p className="text-sm text-muted-foreground">XRP</p>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-sm text-muted-foreground">
            (${convertToSGD(price, balance)} SGD)
          </p>
        </div>
        <Button onClick={withdraw} className="w-1/2">
          Withdraw
        </Button>
      </div>
    </Card>
  );
}
