import { PrismaClient } from "@prisma/client";
import type { PageServerLoad } from './$types';

const prisma = new PrismaClient();

// User全件取得
export const load: PageServerLoad = async () => {
    const users = await prisma.user.findMany();

    return { users };
};
