import { db } from "@/lib/db/index";

export const getCartItems = async (userId: string) => {
    const cartItems = await db.cart.findFirst({
        where: {
            AND: [
                { userId: userId },
                { submitted: false }
            ]
        },
        include: {
            cartItems: true
        }
    });

    return cartItems;
};