import { db } from "@/lib/db/index";

export const getUserNotification = async (userId: string) => {
    const notification = await db.userNotifications.findMany({
        where: {
            borrowRequest: {
                userId: userId
            }
        },
        include: {
            borrowRequest: true
        },
        orderBy: [
            { createdAt: 'desc' }
        ]
    });

    return notification;
};

export const getUserUnseenNotificationCount = async (userId: string) => {
    const notificationCount = await db.userNotifications.findMany({
        where: {
            borrowRequest: {
                userId: userId
            },
            isViewed: false
        },
        select: {
            id: true,
        }
    });

    return notificationCount.length;
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