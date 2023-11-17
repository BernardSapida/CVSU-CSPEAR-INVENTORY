import { db } from "@/lib/db/index";

export const getBorrowRequestById = async (
    borrowRequestId: string
) => {
    const borrowRequest = await db.borrowRequests.findFirst({
        where: {
            id: borrowRequestId,
        },
        include: {
            user: true,
            cart: {
                include: {
                    cartItems: true
                }
            }
        }
    });

    return borrowRequest;
}

export const getBorrowRequests = async () => {
    const borrowRequests = await db.borrowRequests.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return borrowRequests;
}