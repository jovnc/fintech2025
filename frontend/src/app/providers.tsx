"use client";
import { ThemeProvider } from "@/components/dark-mode/theme-provider";
import { config } from "@/lib/wagmi/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { WagmiProvider } from "wagmi";
import { PriceProvider } from "../providers/price";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <PriceProvider>
            <SessionProvider>{children}</SessionProvider>
          </PriceProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
