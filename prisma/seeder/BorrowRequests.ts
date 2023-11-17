import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';
import prisma from '@/utils/prisma';

const borrowRequests: BorrowRequests[] = [
    {
        id: new ObjectId('6555b6c2eee780981dc57da1').toString(),
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
