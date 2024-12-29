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
