import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import Credentials from "next-auth/providers/credentials";
// import { ethers } from "ethers";
import db from "./lib/prisma/prisma";

declare module "next-auth" {
  interface User {
    address?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      session.user.address = token.address as string;
      return session;
    },
  },
});
