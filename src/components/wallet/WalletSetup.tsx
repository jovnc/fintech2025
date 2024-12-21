"use client";

import {
  addWalletToUser,
  associateWalletToUser,
  dissociateWalletFromUser,
  getWalletByUserId,
} from "@/actions/wallet";
import { toast } from "@/hooks/use-toast";
import { createWallet } from "@/lib/xrpl/wallet";
import { useEffect, useState } from "react";

const WalletSetup = ({ userId }: { userId: string }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    // Check if user already has a wallet
    // If so, display the wallet address
    async function updateWalletAddress() {
      const wallet = await getWalletByUserId(userId);

      if (wallet) {
        setWalletAddress(wallet.address);
      }
    }
    updateWalletAddress();
  }, [walletAddress]);

  const handleGenerateWallet = async () => {
    try {
      const wallet = await createWallet();
      await addWalletToUser(userId, wallet);
      await associateWalletToUser(userId, wallet);

      // Alert the user to save their private key securely
      toast({
        variant: "default",
        description: `Your wallet details:
      Address: ${wallet.address}
      Seed: ${wallet.seed}
  
      Save this information securely. You will need it to access your wallet.`,
      });

      setWalletAddress(wallet.address);
    } catch (error) {
      toast({
        variant: "destructive",
        description: `Error creating wallet: ${error}`,
      });
    }
  };

  const handleConnectWallet = async () => {
    console.log("TEST");
  };

  const handleDisconnectWallet = async () => {
    await dissociateWalletFromUser(userId);
    toast({
      variant: "default",
      description: `Successfully disconnected wallet`,
    });
    setWalletAddress(null);
  };

  return (
    <div>
      <h1>Create Your XRPL Wallet</h1>
      {walletAddress && (
        <div>
          <p>Your wallet address: {walletAddress}</p>
          <button onClick={handleDisconnectWallet}>Disconnect wallet</button>
        </div>
      )}
      {!walletAddress && (
        <>
          <button onClick={handleGenerateWallet}>Generate Wallet</button>
          <button onClick={handleConnectWallet}>
            Connect your existing wallet
          </button>
        </>
      )}
    </div>
  );
};

export default WalletSetup;
