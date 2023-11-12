import { AdminNotifications, PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

const notifications: AdminNotifications[] = [
    {
        id: new ObjectId().toString(),
        request_id: new ObjectId('654f1963a49bdbe05b2f576b').toString(),
        title: 'Borrow Request #654f1963a49bdbe05b2f576b',
        description: 'Bernard sapida sent a borrow request.',
        is_viewed: false,
        user_id: new ObjectId('65508e58800f2899f414c3e5').toString(),
        created_at: new Date(),
    },
];

export const populateAdminNotification = async () => {
    for (let notification of notifications) {
        const createdHistory = await prisma.adminNotifications.upsert({
            where: { id: notification.id },
            update: {},
            create: {
                id: notification.id,
                request_id: notification.request_id,
                title: notification.title,
                description: notification.description,
                is_viewed: notification.is_viewed,
                user_id: notification.user_id,
                created_at: notification.created_at
            },
        });

        console.log(createdHistory);
    }
}
