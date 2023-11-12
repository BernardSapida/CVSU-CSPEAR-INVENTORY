import { PrismaClient } from '@prisma/client'
import { populateUsers } from './seeder/users';
import { populateUserBorrowItems } from './seeder/UserBorrowItems';
import { populateEquipments } from './seeder/Equipments';
import { populateAdminBorrowRequest } from './seeder/AdminBorrowRequests';
import { populateHistory } from './seeder/UserHistory';
import { populateUserNotification } from './seeder/UserNotification';
import { populateAdminNotification } from './seeder/AdminNotification';

const prisma = new PrismaClient();

async function main() {
    await populateUsers();
    await populateEquipments();
    await populateUserBorrowItems();
    await populateAdminBorrowRequest();
    await populateHistory();
    await populateUserNotification();
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