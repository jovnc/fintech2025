import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    XRPL_EVM_Sidechain_Devnet: {
      url: "https://rpc-evm-sidechain.xrpl.org",
      accounts: [process.env.DEV_PRIVATE_KEY || ""],
    },
  },
  etherscan: {
    apiKey: {
      XRPL_EVM_Sidechain_Devnet: "void",
    },
    customChains: [
      {
        network: "XRPL_EVM_Sidechain_Devnet",
        chainId: 1440002,
        urls: {
          apiURL: "https://explorer.xrplevm.org/api",
          browserURL: "https://explorer.xrplevm.org/",
        },
      },
    ],
  },
};

export default config;
