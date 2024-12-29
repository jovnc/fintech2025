"use server";
import db from "@/lib/prisma/prisma";

export async function getWalletByUserId(userId: string) {
  try {
    const wallet = await db.user.findFirst({
      where: { id: userId },
    });
    return wallet?.wallet;
  } catch (error) {
    throw new Error(`Error getting wallet: ${error}`);
  }
}

export async function linkWalletToUser(userId: string, wallet: string) {
  try {
    await db.user.update({
      where: { id: userId },
      data: { wallet },
    });
  } catch (error) {
    throw new Error(`Error linking wallet: ${error}`);
  }
}
