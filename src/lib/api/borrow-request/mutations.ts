import { db } from "@/lib/db/index";

export const addBorrowRequest = async (
    cartId: string,
    borrowDate: string,
    returnDate: string,
    purpose: string,
    userId: string
) => {
    console.log("addBorrowRequest: " + purpose);

    const borrowRequest = await db.borrowRequests.create({
        data: {
            borrowDate: new Date(borrowDate),
            returnDate: new Date(returnDate),
            purpose: purpose,
            borrowStatus: 'Pending',
            condition: 'Good',
            note: '',
            userId: userId,
            cartId: cartId,
        },
        select: {
            id: true
        }
    });

    await db.userNotifications.create({
        data: {
            isViewed: false,
            borrowRequestId: borrowRequest.id
        }
    })
}