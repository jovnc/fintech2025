import xrpl from "xrpl";
import db from "../prisma/prisma";
import { getClient, Networks } from "./xrplClient";

// Generate a new wallet
export const createWallet = async () => {
  try {
    // 1. connect to XRPL testnet
    const client = getClient(Networks.Devnet);
    await client.connect();

    // 2. Generate a new wallet
    const wallet = xrpl.Wallet.generate();

    // 3. Request Testnet XRP to fund the wallet
    const fundResult = await client.fundWallet(wallet);
    console.log(JSON.stringify(fundResult, null, 2));

    // 4. Disconnect from the XRPL testnet
    await client.disconnect();

    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      seed: wallet.seed,
    };
  } catch (error) {
    throw new Error(`Error creating wallet: ${error}`);
  }
};

// Check the balance of a wallet
export const checkWalletBalance = async (address: string) => {
  try {
    // 1. connect to XRPL testnet
    const client = getClient(Networks.Devnet);
    await client.connect();

    // 2. Get the balance of the wallet
    const balance = await client.getXrpBalance(address);

    return balance;
  } catch (error) {
    throw new Error(`Error checking wallet balance: ${error}`);
  }
};

// Retrieve user's wallet
export const getWallet = async (userId: string) => {
  const wallet = await db.wallet.findFirst({ where: { userId } });
  if (!wallet) {
    throw new Error(`Wallet not found for userId: ${userId}`);
  }
  return wallet;
};
