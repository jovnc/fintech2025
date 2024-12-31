import { NextResponse } from "next/server";
import { ethers } from "ethers";

const FAUCET_PRIVATE_KEY = process.env.FAUCET_WALLET_PRIVATE_KEY;
const XRP_EVM_RPC = "https://rpc-evm-sidechain.xrpl.org";

export async function POST(req: Request) {
  const { recipient, amount } = await req.json();
  if (!recipient || !/^0x[a-fA-F0-9]{40}$/.test(recipient)) {
    return NextResponse.json(
      { error: "Recipient address and amount are required" },
      { status: 400 },
    );
  }

  try {
    // Connect o EVM sidechain
    const provider = new ethers.JsonRpcProvider(XRP_EVM_RPC);
    const wallet = new ethers.Wallet(FAUCET_PRIVATE_KEY as string, provider);

    const tx = {
      to: recipient,
      value: ethers.parseEther(amount.toString()), // Convert amount to Wei
    };

    const txResponse = await wallet.sendTransaction(tx);
    const receipt = await txResponse.wait();

    return NextResponse.json({
      status: "success",
      transactionHash: receipt?.getTransaction,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send transaction" },
      { status: 500 },
    );
  }
}
