"use client";
import { loginWithMetaMask } from "@/actions/auth";
import { toast } from "@/hooks/use-toast";
import { ethers } from "ethers";
import { Button } from "../ui/button";
import { Wallet } from "lucide-react";
import { signOut } from "next-auth/react";

declare global {
  interface Window {
    ethereum: any;
  }
}

const MetamaskLoginButton = () => {
  const authenticateWithMetaMask = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const message = `Sign this message to authenticate with MetaMask: ${address}`;

    // Request user to sign the message
    const signature = await signer.signMessage(message);

    console.log("TEST");
    const result = await loginWithMetaMask({ message, signature });

    toast({
      title: "Authentication",
      description: "Logged in with MetaMask",
    });
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-3/4"
        onClick={authenticateWithMetaMask}
      >
        <Wallet className="w-5 h-5 mr-2" />
        Sign in with MetaMask
      </Button>
    </>
  );
};

export default MetamaskLoginButton;
