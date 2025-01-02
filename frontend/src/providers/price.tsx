import { getXrpPrice } from "@/actions/xrp";
import React, { createContext, useState, useEffect } from "react";

// Create Context
export const PriceContext = createContext({
  price: "",
  loading: true,
  error: "",
  refreshPrice: () => {},
});

// Provider Component
export const PriceProvider = ({ children }: { children: React.ReactNode }) => {
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch price from API
  const fetchPrice = async () => {
    try {
      setLoading(true);
      setError("");
      const xrpPrice = await getXrpPrice();
      setPrice(xrpPrice);
    } catch (err) {
      setError("Failed to fetch price");
    } finally {
      setLoading(false);
    }
  };

  // Fetch price on mount
  useEffect(() => {
    fetchPrice();
  }, []);

  const value = {
    price,
    loading,
    error,
    refreshPrice: fetchPrice, // Allow manual refresh
  };

  return (
    <PriceContext.Provider value={value}>{children}</PriceContext.Provider>
  );
};
