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
        <div className="mt-4 grid grid-cols-2 flex-wrap justify-center gap-4">
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleConnectCustodial}
              size={"sm"}
              variant={"outline"}
              className="flex items-center justify-center gap-2"
            >
              <Wallet className="h-4 w-4" />
              Custodial
            </Button>
            <div className="flex flex-col gap-4 text-center text-xs">
              <p>
                This will create an EOA wallet for you to use on this site. This
                will generate a new wallet for you to use on this site if you
                havent already.
              </p>
              <p className="text-2xs text-red-500">
                Note: if you have previously connected to a wallet, not
                available if you previously connected to Metamask
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <MetamaskLoginButton setOpen={setOpen} />
            <div className="flex flex-col gap-4 text-center text-xs">
              <p>Connect to your existing Metamask wallet.</p>
              <p className="text-2xs text-red-500">
                Note: if you have previously connected to a wallet, please use
                the same wallet
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
