import { db } from "@/lib/db/index";

export const addBorrowRequest = async (
    cartId: string,
    borrowDate: string,
    returnDate: string,
    purpose: string,
    userId: string
) => {
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
            borrowStatus: 'Pending',
            borrowRequestId: borrowRequest.id
        }
    });

    await db.adminNotifications.create({
        data: {
            isViewed: false,
            borrowRequestId: borrowRequest.id
        }
    });
}

export const getReturnedEquipments = async (startMonth: string, endMonth: string) => {
    const getReturnedEquipments = await db.borrowRequests.findMany({
        where: {
            AND: [
                {
                    borrowStatus: 'Returned',
                },
                {
                    updatedAt: {
                        gte: new Date(startMonth),
                        lte: new Date(endMonth),
                    }
                }
            ]
        },
        include: {
            user: true
        },
    })

    return getReturnedEquipments;
}

export const getGoodEquipments = async (startMonth: string, endMonth: string) => {
    const goodEquipments = await db.borrowRequests.findMany({
        where: {
            AND: [
                {
                    borrowStatus: 'Returned',
                },
                {
                    condition: 'Good'
                },
                {
                    updatedAt: {
                        gte: new Date(startMonth),
                        lte: new Date(endMonth),
                    }
                }
            ]
        }
    })

    return goodEquipments;
}

export const getMisplacedEquipments = async (startMonth: string, endMonth: string) => {
    const misplacedEquipments = await db.borrowRequests.findMany({
        where: {
            AND: [
                {
                    borrowStatus: 'Returned',
                },
                {
                    condition: 'Misplaced'
                },
                {
                    updatedAt: {
                        gte: new Date(startMonth),
                        lte: new Date(endMonth),
                    }
                }
            ]
        }
    })

    return misplacedEquipments;
}

export const getDamagedEquipments = async (startMonth: string, endMonth: string) => {
    const damagedEquipments = await db.borrowRequests.findMany({
        where: {
            AND: [
                {
                    borrowStatus: 'Returned',
                },
                {
                    condition: 'Damaged'
                },
                {
                    updatedAt: {
                        gte: new Date(startMonth),
                        lte: new Date(endMonth),
                    }
                }
            ]
        }
    })

    return damagedEquipments;
}