import { breakfastTokenAbi, dinnerTokenAbi } from "./abi";

export const breakfastContractAddress =
  "0xac7F6648160C0bB61314C0f60E4080215B4E394d";

export const breakfastContractConfig = {
  address: breakfastContractAddress,
  abi: breakfastTokenAbi,
} as const;

export const dinnerContractAddress =
  "0x0e2204BD123b8A2440B0db4082643F16311E0Ae1";

export const dinnerContractConfig = {
  address: dinnerContractAddress,
  abi: dinnerTokenAbi,
} as const;
