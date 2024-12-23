import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/nav/NavBar";
import { SessionProvider } from "next-auth/react";
import { ChatComponent } from "@/components/chat/ChatComponent";
import { ThemeProvider } from "@/components/dark-mode/theme-provider";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi/config";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FINishYourCredits",
  description: "NUS Hall Dining Credit Trading App built on XRPL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
          <Toaster />
          <ChatComponent />
        </Providers>
      </body>
    </html>
  );
}
