"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Wallet } from "lucide-react";
import MetamaskLoginButton from "./MetamaskLoginButton";

export function ConnectWalletModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const handleConnectCustodial = () => {
    console.log("Connecting to custodial wallet...");
    // Add your custodial wallet connection logic here
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-3/4 px-4">
        <DialogHeader>
          <DialogTitle className="text-center">Connect Wallet</DialogTitle>
        </DialogHeader>
        <p className="text-center text-gray-500">
          Choose how you would like to connect your wallet
        </p>
        <div className="grid grid-cols-2 gap-4 flex-wrap justify-center mt-4">
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleConnectCustodial}
              size={"sm"}
              variant={"outline"}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Custodial Wallet
            </Button>
            <div className="text-center text-xs">
              This will create an EOA wallet for you to use on this site. This
              will generate a new wallet for you to use on this site if you
              havent already.
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <MetamaskLoginButton setOpen={setOpen} />
            <div className="text-center text-xs">
              Connect to your existing Metamask wallet.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
