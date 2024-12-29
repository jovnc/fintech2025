"use server";

import db from "@/lib/prisma/prisma";

export async function getUsers() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        wallet: true,
      },
    });
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
}
