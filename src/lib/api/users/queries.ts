import { db } from "@/lib/db/index";

export const getUsers = async () => {
    const users = await db.users.findMany();
    return { users: users };
};

export const getUserByClerkUserId = async (clerkUserId: string) => {
    const user = await db.users.findFirst({
        where: {
            clerkUserId: clerkUserId
        }
    });

    return user;
};