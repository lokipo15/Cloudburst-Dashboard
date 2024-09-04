import {PrismaAdapter} from "@lucia-auth/adapter-prisma";
import {PrismaClient} from "@prisma/client";

export let prisma = new PrismaClient();

export const adapter = new PrismaAdapter(prisma.session, prisma.user);