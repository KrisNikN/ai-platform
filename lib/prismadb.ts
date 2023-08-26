import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  var prisma: PrismaClient | undefined;
}

const prismadb = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") globalThis.prisma = prismadb;

export default prismadb;
