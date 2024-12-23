"use server";

import { signIn, signOut } from "@/auth";

export async function logOut() {
  await signOut({ redirectTo: "/", redirect: true });
}

export async function login() {
  await signIn("google", {
    redirectTo: "/dashboard",
  });
}

export async function loginWithMetaMask({
  message,
  signature,
}: {
  message: string;
  signature: string;
}) {
  try {
    await signIn("MetaMask", {
      message: message,
      signature: signature,
      redirectTo: "/",
    });
  } catch (error) {
    console.error("Failed to login with MetaMask", error);
  }
}
