import { db } from "@/lib/db/index";

export const getUserNotification = async (userId: string) => {
    const notification = await db.users.findFirst({
        where: {
            id: userId,
        },
        select: {
            borrowRequests: {
                select: {
                    createdAt: true,
                    userNotifications: {
                        select: {
                            id: true,
                            isViewed: true,
                            createdAt: true,
                            borrowRequest: true
                        }
                    }
                },
                orderBy: [
                    { createdAt: 'desc' }
                ],
            },
        }
    });

    return notification;
};

export const getAdminNotification = async (userId: string) => {
    const notification = await db.adminNotifications.findMany({
        include: {
            borrowRequests: {
                select: {
                    user: true
                },
            },
        },
        orderBy: [
            { createdAt: 'desc' }
        ]
    });

    return notification;
};

export const getUserBorrowRequest = async (userId: string) => {
    const notification = await db.users.findFirst({
        where: {
            id: userId,
        },
        select: {
            borrowRequests: {
                orderBy: [
                    { createdAt: 'desc' }
                ],
            },
        }
    });

    return notification;
};