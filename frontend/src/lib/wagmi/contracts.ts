import { breakfastTokenAbi, dinnerTokenAbi, vaultAbi } from "./abi";

export const breakfastContractAddress =
  "0x3B5D3C1C8680546dE442084109c5a28892805eB7";

export const breakfastContractConfig = {
  address: breakfastContractAddress,
  abi: breakfastTokenAbi,
} as const;

export const dinnerContractAddress =
  "0xA44832833589c503CBAAc7b033Bb85463B9F7c93";

export const dinnerContractConfig = {
  address: dinnerContractAddress,
  abi: dinnerTokenAbi,
} as const;

export const vaultContractAddress =
  "0x584a4A7F8401f9955323d29D120fd418AB87CA00";

export const vaultContractConfig = {
  address: vaultContractAddress,
  abi: vaultAbi,
} as const;
