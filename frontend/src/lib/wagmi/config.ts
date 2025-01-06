import { http, createConfig, createStorage, cookieStorage } from "@wagmi/core";
import { Chain, mainnet, sepolia } from "@wagmi/core/chains";
import { injected } from "wagmi/connectors";

const xrpl_evm_sidechain_devnet = {
  id: 1440002,
  name: "XRPL EVM Sidechain Devnet",
  nativeCurrency: { name: "XRP", symbol: "XRP", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-evm-sidechain.xrpl.org"] },
  },
  blockExplorers: {
    default: {
      name: "xrpl-evm-explorer-devnet",
      url: "https://evm-sidechain.xrpl.org",
    },
  },
  testnet: true,
} as const satisfies Chain;

export const config = createConfig({
  chains: [xrpl_evm_sidechain_devnet],
  connectors: [injected()],
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [xrpl_evm_sidechain_devnet.id]: http(),
  },
});
