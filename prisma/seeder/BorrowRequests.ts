import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

const borrowRequests: BorrowRequests[] = [
    {
        id: new ObjectId().toString(),
        name: 'Bernard Sapida',
        email: 'bernardsapida1706@gmail.com',
        college: 'CEIT',
        role: 'Student',
        title: 'Borrow Request #6555b09ac0a091bded884c98',
        purpose: '',
        borrowDate: new Date(),
        returnDate: new Date(),
        borrowStatus: 'Pending',
        condition: 'Good',
        note: '',
        userId: new ObjectId('6555a86c47783f96117a0325').toString(),
        createdAt: new Date(),
        cartId: '6555b6c2eee780981dc57d2e',
    },
];

export const populateBorrowRequests = async () => {
    for (let borrowRequest of borrowRequests) {
        const createdBorrowRequest = await prisma.borrowRequests.create({
            data: {
                ...borrowRequest
            },
        });

        console.log(createdBorrowRequest);
    }
}
