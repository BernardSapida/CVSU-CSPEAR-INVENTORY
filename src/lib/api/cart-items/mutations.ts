import { db } from "@/lib/db/index";

export const addCartItem = async (userId: string, cartItem: CartItem) => {
    const users = await db.users.findFirst({
        where: {
            id: userId
        },
        select: {
            cart: {
                select: {
                    id: true,
                    cartItems: {
                        distinct: ['name'],
                        where: {
                            name: cartItem.name
                        },
                        select: {
                            id: true,
                            cartId: true
                        }
                    }
                },
                where: {
                    submitted: false,
                }
            }
        }
    });

    const cartId = users?.cart[0].id;
    const cartItemId = users?.cart[0].cartItems[0]?.id;

    if (!cartId) return;

    if (cartItemId) {
        await db.cartItems.update({
            where: {
                id: cartItemId,
                name: cartItem.name,
            },
            data: {
                quantity: {
                    increment: 1
                },
            }
        })
    } else {
        await db.cartItems.create({
            data: {
                name: cartItem.name,
                quantity: cartItem.quantity,
                stock: cartItem.stock,
                isAvailable: cartItem.isAvailable,
                cartId: cartId
            }
        })
    }
};

export const updateCartItemQuantity = async (itemId: string, quantity: number) => {
    await db.cartItems.update({
        where: {
            id: itemId
        },
        data: {
            quantity: quantity
        }
    });
};

export const updateBorrowRequestById = async (borrowRequestId: string, borrowStatus: BorrowStatus, condition: Condition, note: string) => {
    await db.borrowRequests.update({
        where: {
            id: borrowRequestId
        },
        data: {
            borrowStatus: borrowStatus,
            condition: condition,
            note: note,
        }
    });
};

export const submitCart = async (userId: string, cartId: string) => {
    await db.cart.update({
        where: {
            id: cartId,
        },
        data: {
            submitted: true,
        }
    });

    await db.cart.create({
        data: {
            submitted: false,
            userId: userId,
        }
    });
};



export const removeCartItem = async (userId: string, itemId: string) => {
    const users = await db.users.findFirst({
        where: {
            id: userId
        },
        select: {
            cart: {
                where: {
                    submitted: false
                }
            }
        }
    });

    const cartId = users?.cart[0].id;

    if (!cartId) return;

    const cartItem = await db.cartItems.delete({
        where: {
            id: itemId,
            cartId: cartId,
        },
    })
};
