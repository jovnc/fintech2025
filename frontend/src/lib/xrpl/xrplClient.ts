import { Client } from "xrpl";

let client: Client;

export enum Networks {
  Testnet = "wss://s.altnet.rippletest.net:51233",
  Devnet = "wss://s.devnet.rippletest.net:51233",
  // Sidechain = "wss://sidechain-net2.devnet.rippletest.net:51233/",
  Sidechain = "rpc-evm-sidechain.xrpl.org",
}

export function getClient(network: Networks): Client {
  if (!client) {
    client = new Client(network);
  }
  return client;
}
