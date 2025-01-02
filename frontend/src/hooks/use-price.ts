import { PriceContext } from "@/providers/price";
import { useContext } from "react";

export const usePrice = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error("usePrice must be used within a PriceProvider");
  }
  return context;
};
