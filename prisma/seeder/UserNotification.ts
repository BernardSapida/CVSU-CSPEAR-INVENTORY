import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';
import prisma from '@/utils/prisma';

const notifications: UserNotification[] = [
    {
        id: new ObjectId().toString(),
        borrowStatus: 'Pending',
        isViewed: false,
        borrowRequestId: new ObjectId('6555b6c2eee780981dc57da1').toString(),
    },
];

export const populateUserNotification = async () => {
    for (let notification of notifications) {
        const createdHistory = await prisma.userNotifications.create({
            data: {
                id: notification.id,
                borrowStatus: notification.borrowStatus,
                isViewed: notification.isViewed,
                borrowRequestId: notification.borrowRequestId,
            },
        });

        console.log(createdHistory);
    }
}
