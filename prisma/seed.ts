import { PrismaClient } from '@prisma/client'
import { ObjectId } from 'mongodb'

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.users.upsert({
        where: { email: 'bernardsapida1706@gmail.com' },
        update: {},
        create: {
            id: new ObjectId().toString(),
            given_name: 'Bernard',
            family_name: 'Sapida',
            email: 'bernardsapida1706@gmail.com',
        },
    })

    const user2 = await prisma.users.upsert({
        where: { email: 'julliannecabagay@gmail.com' },
        update: {},
        create: {
            id: new ObjectId().toString(),
            given_name: 'Jullianne',
            family_name: 'Cabagay',
            email: 'julliannecabagay@gmail.com',
        },
    })

    console.log({ user1, user2 })
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