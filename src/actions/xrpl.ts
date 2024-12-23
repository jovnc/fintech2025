"use server";

import { bridgeXRP } from "@/lib/xrpl/bridge";

export async function sendXRP() {
  await bridgeXRP();
}
