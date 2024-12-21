import { Client } from "xrpl";

let client: Client;

const networks = {
  testnet: "wss://s.altnet.rippletest.net:51233",
};

export function getClient() {
  if (!client) {
    client = new Client(networks.testnet);
  }
  return client;
}
