import { PrismaClient } from '@prisma/client'
import { populateUsers } from './seeder/users';
import { populateCart } from './seeder/Cart';
import { populateEquipments } from './seeder/Equipments';
import { populateBorrowRequests } from './seeder/BorrowRequests';
import { populateUserNotification } from './seeder/UserNotification';
import { populateAdminNotification } from './seeder/AdminNotification';

const prisma = new PrismaClient();

async function main() {
    // await prisma.borrowRequests.deleteMany();
    // await prisma.cartItems.deleteMany();
    // await prisma.cart.deleteMany();
    // await prisma.userNotifications.deleteMany();

    // await populateUsers();
    // await populateEquipments();
    // await populateCart();
    // await populateBorrowRequests();
    // await populateUserNotification();
    await populateAdminNotification();
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