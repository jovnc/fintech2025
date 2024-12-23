"use server";
import db from "@/lib/prisma/prisma";
import { checkWalletBalance } from "@/lib/xrpl/wallet";

export async function addWalletToUser(
  userId: string,
  wallet: { address: string }
) {
  try {
    // Add wallet to user in database
    await db.wallet.create({
      data: {
        address: wallet.address, // save only public address, not secret
        userId,
      },
    });
  } catch (error) {
    throw new Error(`Error adding wallet to user: ${error}`);
  }
}

export async function associateWalletToUser(
  userId: string,
  wallet: { address: string }
) {
  try {
    // Associate the wallet with the user
    await db.user.update({
      where: { id: userId },
      data: {
        wallet: {
          connect: {
            userId: userId,
            address: wallet.address,
          },
        },
      },
    });
  } catch (error) {
    throw new Error(`Error associating wallet with user: ${error}`);
  }
}

export async function dissociateWalletFromUser(userId: string) {
  try {
    // Find the wallet associated with the user
    const wallet = await db.wallet.findFirst({ where: { userId } });

    if (!wallet) {
      throw new Error("Wallet not found for the user");
    }

    // Dissociate the wallet from the user
    // await db.wallet.update({
    //   where: { id: wallet.id },
    //   data: {
    //     userId: undefined,
    //   },
    // });

    // delete wallet
    await db.wallet.delete({ where: { id: wallet.id } });
  } catch (error) {
    throw new Error(`Error dissociating wallet from user: ${error}`);
  }
}

export async function getWalletByUserId(userId: string) {
  try {
    const wallet = await db.wallet.findFirst({ where: { userId } });
    return wallet;
  } catch (error) {
    throw new Error(`Error getting wallet: ${error}`);
  }
}

export async function getWalletBalance(userId: string | undefined) {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Get wallet address of user
    const wallet = await getWalletByUserId(userId);

    // Get wallet balance
    if (wallet) {
      const balance = await checkWalletBalance(wallet.address);
      return balance;
    } else {
      throw new Error("Wallet not found for user");
    }
  } catch (error) {
    throw new Error(`Error getting wallet balance: ${error}`);
  }
}
