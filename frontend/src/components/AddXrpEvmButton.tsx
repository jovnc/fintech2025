"use client";

import { useAccount, useChains, useSwitchChain } from "wagmi";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Network } from "lucide-react";

export function AddXrpEvmButton() {
  const { chains, switchChain } = useSwitchChain();
  const { chain: currentChain, isConnected } = useAccount();

  const xrpEvmSidechain = chains[0].id;

  const handleClick = () => {
    if (!isConnected) {
      toast({
        title: "Please connect your wallet first",
      });
      return;
    }
    if (currentChain?.id === xrpEvmSidechain) {
      toast({
        title: "Already connected to XRPL EVM Sidechain",
      });
    } else {
      switchChain({ chainId: xrpEvmSidechain });
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="profile"
      className="w-full"
      size={"sm"}
    >
      <Network className="mr-2 h-4 w-4" />
      Add Sidechain Network
    </Button>
  );
}
