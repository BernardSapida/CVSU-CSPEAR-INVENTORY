import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

const histories: NotificationHistory[] = [
    {
        id: new ObjectId().toString(),
        request_id: new ObjectId('654f1963a49bdbe05b2f576b').toString(),
        title: 'Borrow Request #654f1963a49bdbe05b2f576b',
        borrow_status: 'Pending',
        condition: 'Good',
        is_viewed: false,
        created_at: new Date(),
    },
];

export const populateHistory = async () => {
    for (let history of histories) {
        const createdHistory = await prisma.userHistory.upsert({
            where: { id: history.id },
            update: {},
            create: {
                id: history.id,
                request_id: history.request_id,
                title: history.title,
                borrow_status: history.borrow_status,
                condition: history.condition,
                is_viewed: history.is_viewed,
                created_at: history.created_at
            },
        });

        console.log(createdHistory);
    }
}
