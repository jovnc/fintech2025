import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// globalThis is not affected by hot reload
const db = globalThis.prisma ?? prismaClientSingleton();

export default db;

// in development, whenever we update a file, next.js will perform a hot reload, then we will get an error that there are too many Prisma Clients
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
