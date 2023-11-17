import { AdminNotifications, PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';
import prisma from '@/utils/prisma';

const notifications: AdminNotification[] = [
    {
        id: new ObjectId().toString(),
        isViewed: false,
        createdAt: new Date(),
        borrowRequestId: new ObjectId('6555b6c2eee780981dc57da1').toString(),
    },
];

export const populateAdminNotification = async () => {
    for (let notification of notifications) {
        const createdAdminNotification = await prisma.adminNotifications.create({
            data: {
                id: notification.id,
                isViewed: notification.isViewed,
                createdAt: notification.createdAt,
                borrowRequestId: notification.borrowRequestId,
            },
        });

        console.log(createdAdminNotification);
    }
}
