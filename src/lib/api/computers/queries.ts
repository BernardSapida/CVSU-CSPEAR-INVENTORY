import { ComputerId, computerIdSchema } from "@/lib/db/schema/computers";
import { db } from "@/lib/db/index";

export const getUsers = async () => {
    const c = await db.users.findMany();
    return { users: c };
};

export const getUserById = async (id: string) => {
    //   const { id: userId } = computerIdSchema.parse({ id });
    const user = await db.users.findFirst({ where: { id: id } });
    return { user: user };
};