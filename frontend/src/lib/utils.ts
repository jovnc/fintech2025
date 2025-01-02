import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function bigIntToNumber(value: bigint | undefined) {
  if (!value) return 0;
  return Number(value.toString()) / 10 ** 18;
}

export function convertToSGD(sgd: string, amount: string | number | undefined) {
  if (!amount) return 0;
  if (!sgd) return 0;
  return Number(sgd) * Number(amount);
}
