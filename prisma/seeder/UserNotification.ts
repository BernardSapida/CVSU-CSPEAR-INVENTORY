import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

const notifications: UserNotification[] = [
    {
        id: new ObjectId().toString(),
        isViewed: false,
        createdAt: new Date(),
        borrowRequestId: new ObjectId('6555b766ad3f904a4d844ce0').toString(),
    },
];

export const populateUserNotification = async () => {
    for (let notification of notifications) {
        const createdHistory = await prisma.userNotifications.create({
            data: {
                id: notification.id,
                isViewed: notification.isViewed,
                createdAt: notification.createdAt,
                borrowRequestId: notification.borrowRequestId,
            },
        });

        console.log(createdHistory);
    }
}
