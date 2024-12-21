"use client";
import { getWalletBalance } from "@/actions/wallet";
import { useEffect, useState } from "react";

export default function WalletBalance({ userId }: { userId: string }) {
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const handleGetWalletBalance = async () => {
      const res = await getWalletBalance(userId);
      setWalletBalance(res);
    };
    handleGetWalletBalance();
  });

  return (
    <div>
      <h1>Wallet Balance</h1>
      <p>Your wallet balance: {walletBalance} XRP</p>
    </div>
  );
}
