import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

const notifications: UserNotification[] = [
    {
        id: new ObjectId().toString(),
        request_id: new ObjectId('654f1963a49bdbe05b2f576b').toString(),
        title: 'Borrow Request #654f1963a49bdbe05b2f576b',
        borrow_status: 'Pending',
        is_viewed: false,
        created_at: new Date(),
    },
];

export const populateUserNotification = async () => {
    for (let notification of notifications) {
        const createdHistory = await prisma.userNotifications.upsert({
            where: { id: notification.id },
            update: {},
            create: {
                id: notification.id,
                request_id: notification.request_id,
                title: notification.title,
                borrow_status: notification.borrow_status,
                is_viewed: notification.is_viewed,
                created_at: notification.created_at
            },
        });

        console.log(createdHistory);
    }
}
