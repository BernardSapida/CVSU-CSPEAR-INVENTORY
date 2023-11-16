import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

const cart: Cart[] = [
    {
        id: new ObjectId('6555b6c2eee780981dc57d2e').toString(),
        cartItems: [
            {
                id: new ObjectId('6555b06258bdc40af181d5c4').toString(),
                name: 'Basketball',
                quantity: 1,
                stock: 30,
                isAvailable: true,
            },
            {
                id: new ObjectId('6555b06258bdc40af181d5c5').toString(),
                name: 'Volleyball',
                quantity: 1,
                stock: 25,
                isAvailable: true,
            },
            {
                id: new ObjectId('6555b06258bdc40af181d5c6').toString(),
                name: 'Shuttlecock',
                quantity: 1,
                stock: 40,
                isAvailable: false,
            },
        ],
        userId: new ObjectId('6555a86c47783f96117a0325').toString()
    },
];

export const populateCart = async () => {
    for (let item of cart) {
        const createdCart = await prisma.cart.create({
            data: {
                id: item.id,
                cartItems: {
                    createMany: {
                        data: [
                            ...item.cartItems
                        ]
                    }
                },
                userId: item.userId
            },
        });

        console.log(createdCart);
    }

    // const res = await prisma.cart.findFirst({
    //     where: {
    //         id: '6555ad114a6761a6e6e51c34'
    //     },
    //     include: {
    //         cartItems: true
    //     }
    // })
}
