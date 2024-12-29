"use client";
import { useAccount, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { Button } from "../ui/button";
import { MetamaskIcon } from "./MetamaskIcon";
import { getWalletByUserId, linkWalletToUser } from "@/actions/wallet";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { connect, getAccount } from "@wagmi/core";
import { config } from "@/lib/wagmi/config";

const MetamaskLoginButton = ({ setOpen }: { setOpen: any }) => {
  const { data } = useSession();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const authenticateWithMetaMask = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!isConnected) {
      try {
        await connect(config, {
          connector: injected(),
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not connect to Metamask",
        });
      }
    }
  };

  const linkWallet = async () => {
    const { address } = getAccount(config);
    const currentWallet = await getWalletByUserId(data?.user?.id as string);

    if (currentWallet === null) {
      await linkWalletToUser(data?.user?.id as string, address as string);
    } else if (currentWallet === address) {
    } else {
      toast({
        title: "Error",
        description: "You already have a wallet associated with this account",
      });
      disconnect();
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full"
        onClick={async (e) => {
          await authenticateWithMetaMask(e);
          await linkWallet();
        }}
        size={"sm"}
      >
        <MetamaskIcon className="mr-2" />
        Metamask
      </Button>
    </>
  );
};

export default MetamaskLoginButton;
