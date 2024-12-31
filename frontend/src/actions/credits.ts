"use server";
import db from "@/lib/prisma/prisma";

export async function createCreditClaim(
  userId: string,
  transactionHash: string,
  type: string,
) {
  try {
    const data = await db.claimCredit.create({
      data: {
        userId: userId,
        transactionHash,
        type,
      },
    });
  } catch (error) {
    throw new Error(`Error recording credit claim: ${error}`);
  }
}

export async function getCreditClaims(userId: string) {
  try {
    const claims = await db.claimCredit.findMany({
      where: { userId },
    });
    return claims;
  } catch (error) {
    throw new Error(`Error getting credit claims: ${error}`);
  }
}
