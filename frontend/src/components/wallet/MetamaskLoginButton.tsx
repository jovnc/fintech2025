"use client";
import { toast } from "@/hooks/use-toast";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { injected } from "wagmi/connectors";
import { Button } from "../ui/button";
import { MetamaskIcon } from "./MetamaskIcon";

const MetamaskLoginButton = ({ setOpen }: { setOpen: any }) => {
  const { connect } = useConnect();

  const { address, isConnected } = useAccount();

  const { signMessage } = useSignMessage();

  const authenticateWithMetaMask = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!isConnected) {
      connect({ connector: injected() });
    }

    if (address) {
      const message = `Sign this message to authenticate with MetaMask: ${address}`;
      signMessage({ message });
    }

    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full"
        onClick={authenticateWithMetaMask}
        size={"sm"}
      >
        <MetamaskIcon className="mr-2" />
        Metamask
      </Button>
    </>
  );
};

export default MetamaskLoginButton;
