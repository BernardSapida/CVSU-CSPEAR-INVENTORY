import { db } from "@/lib/db/index";
import { ObjectId } from 'mongodb';

export const registerUser = async (
    clerkUserId: string,
    firstname: string,
    lastname: string,
    email: string
) => {
    const user = await db.users.create({
        data:
        {
            id: new ObjectId().toString(),
            clerkUserId: clerkUserId,
            firstname: firstname,
            lastname: lastname,
            email: email,
            role: 'UNKNOWN',
            college: 'UNKNOWN',
        },
    });

    return user;
}

export const updateUserCollege = async (userId: string, college: College) => {
    await db.users.update({
        where: {
            id: userId
        },
        data: {
            college: college
        }
    });
}

export const updateUserRole = async (userId: string, role: Role) => {
    await db.users.update({
        where: {
            id: userId
        },
        data: {
            role: role
        }
    });
}