import { breakfastTokenAbi, dinnerTokenAbi, vaultAbi } from "./abi";

export const breakfastContractAddress =
  "0xE0b2cd8d632751E0f9B9A82d0eA72284a0691c09";

export const breakfastContractConfig = {
  address: breakfastContractAddress,
  abi: breakfastTokenAbi,
} as const;

export const dinnerContractAddress =
  "0x06E31ee0dbf9bB819F121f44458D37E4911Ca006";

export const dinnerContractConfig = {
  address: dinnerContractAddress,
  abi: dinnerTokenAbi,
} as const;

export const vaultContractAddress =
  "0x8158BCe43FCcDB52b4667AB9303e38284CB16649";

export const vaultContractConfig = {
  address: vaultContractAddress,
  abi: vaultAbi,
} as const;
