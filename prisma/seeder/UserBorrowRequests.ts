import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

const userBorrowRequests: UserBorrowRequest[] = [
    {
        id: new ObjectId().toString(),
        equipments: [
            {
                id: new ObjectId('654f007be2196d9155a13991').toString(),
                quantity: 0,
            },
            {
                id: new ObjectId('654f007ce2196d9155a13992').toString(),
                quantity: 0,
            },
            {
                id: new ObjectId('654f007ce2196d9155a13993').toString(),
                quantity: 0,
            },
        ],
        purpose: 'For FITT3',
        borrow_date: new Date(),
        return_date: new Date(),
        user_id: new ObjectId('654edcfa26c9a4e1b58f1e54').toString()
    },
];

export const populateUserBorrowRequest = async () => {
    for (let req of userBorrowRequests) {
        const createdBorrowRequest = await prisma.userBorrowRequests.upsert({
            where: { user_id: req.user_id },
            update: {},
            create: {
                id: new ObjectId().toString(),
                equipments: req.equipments,
                purpose: req.purpose,
                borrow_date: req.borrow_date,
                return_date: req.return_date,
                user_id: req.user_id
            },
        });

        console.log(createdBorrowRequest);
    }
}
