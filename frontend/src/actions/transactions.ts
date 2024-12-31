"use server";
import db from "@/lib/prisma/prisma";

export async function createTransaction(
  buyerAddress: string,
  sellerAddress: string,
  transactionHash: string,
  amount: number,
  price: number,
  type: string,
) {
  try {
    await db.transactions.create({
      data: {
        buyerId: buyerAddress,
        sellerId: sellerAddress,
        amount,
        type,
        price,
        transactionHash,
      },
    });
  } catch (error) {
    throw new Error(`Error recording transaction: ${error}`);
  }
}

export async function getTransactions(userId: string) {
  try {
    const data = await db.user.findUnique({
      where: { id: userId },
      select: { wallet: true },
    });

    if (!data) {
      throw new Error("User not found");
    }

    const wallet = data.wallet as string;

    const transactions = await db.transactions.findMany({
      where: {
        OR: [{ buyerId: wallet }, { sellerId: wallet }],
      },
    });
    return transactions;
  } catch (error) {
    throw new Error(`Error getting transactions: ${error}`);
  }
}
