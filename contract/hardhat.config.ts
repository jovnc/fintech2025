import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    xrpEvmSidechain: {
      url: "",
      chainId: 0,
      accounts: [],
    },
  },
};

export default config;
