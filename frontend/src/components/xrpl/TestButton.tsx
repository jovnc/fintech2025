"use client";

import { useReadContract } from "wagmi";
import { Button } from "../ui/button";
import { sendXRP } from "@/actions/xrpl";
import { wagmiContractConfig } from "@/lib/wagmi/contracts";

export default function TestButton() {
  const data = useReadContract({
    ...wagmiContractConfig,
    functionName: "totalSupply",
    args: [],
  });

  console.log(data);
  return (
    <Button
      onClick={async () => {
        await sendXRP();
      }}
    >
      Test
    </Button>
  );
}
