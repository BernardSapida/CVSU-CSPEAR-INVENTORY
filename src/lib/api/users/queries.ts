import { db } from "@/lib/db/index";

export const getUsers = async () => {
    console.log("GET");
    const users = await db.users.findMany();
    console.log(users);
    return { users: users };
};

export const getUserByClerkUserId = async (clerkUserId: string) => {
    const user = await db.users.findFirst({
        where: {
            clerkUserId: clerkUserId
        }
    });
    console.log("FOUND");
    console.log(user);
    return user;
};