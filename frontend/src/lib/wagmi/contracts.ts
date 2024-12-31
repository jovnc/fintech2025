import { breakfastTokenAbi, dinnerTokenAbi, vaultAbi } from "./abi";

export const breakfastContractAddress =
  "0x34783b43E2219Bc376423C905571D30a9F6c5770";

export const breakfastContractConfig = {
  address: breakfastContractAddress,
  abi: breakfastTokenAbi,
} as const;

export const dinnerContractAddress =
  "0x0c695EB236B46D353b5EB90c3E9C79fa486249f3";

export const dinnerContractConfig = {
  address: dinnerContractAddress,
  abi: dinnerTokenAbi,
} as const;

export const vaultContractAddress =
  "0x02732d247497c148475c3f825F802d065944A211";

export const vaultContractConfig = {
  address: vaultContractAddress,
  abi: vaultAbi,
} as const;
