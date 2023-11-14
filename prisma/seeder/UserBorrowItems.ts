import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

const userBorrowItems: UserBorrowItems[] = [
    {
        id: new ObjectId().toString(),
        equipments: [
            {
                id: new ObjectId('655090d219e6860ab68d0e12').toString(),
                name: 'Basketball',
                quantity: 1,
                stock: 30,
                is_available: true,
            },
            {
                id: new ObjectId('655090d319e6860ab68d0e13').toString(),
                name: 'Volleyball',
                quantity: 1,
                stock: 25,
                is_available: false,
            },
            {
                id: new ObjectId('655090d419e6860ab68d0e14').toString(),
                name: 'Shuttlecock',
                quantity: 1,
                stock: 40,
                is_available: true,
            },
        ],
        purpose: 'For FITT3',
        borrow_date: new Date(),
        return_date: new Date(),
        user_id: new ObjectId('6550c9105cd1d74047683485').toString()
    },
];

export const populateUserBorrowItems = async () => {
    for (let req of userBorrowItems) {
        const createdBorrowRequest = await prisma.userBorrowItems.upsert({
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
