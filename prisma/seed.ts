import { PrismaClient } from '@prisma/client'
import { populateUsers } from './seeder/users';
import { populateCart } from './seeder/Cart';
import { populateEquipments } from './seeder/Equipments';
import { populateBorrowRequests } from './seeder/BorrowRequests';
import { populateUserNotification } from './seeder/UserNotification';
import { populateAdminNotification } from './seeder/AdminNotification';
import { ObjectId } from 'mongodb';
import prisma from '@/utils/prisma';

async function main() {
    // await prisma.userNotifications.deleteMany();
    // await prisma.adminNotifications.deleteMany();
    // await prisma.borrowRequests.deleteMany();
    // await prisma.equipments.deleteMany();
    // await prisma.cartItems.deleteMany();
    // await prisma.cart.deleteMany();
    // await prisma.users.deleteMany();

    // await populateUsers();
    // await populateEquipments();
    // await populateCart();
    // await populateBorrowRequests();
    // await populateUserNotification();
    // await populateAdminNotification();

    const res = await prisma.adminNotifications.findMany({
        include: {
            borrowRequests: {
                select: {
                    user: true
                },
            },
        },
        orderBy: [
            { createdAt: 'desc' }
        ]
    });

    console.log(res)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })