import { db } from "@/lib/db/index";
import { ObjectId } from 'mongodb';

export const getUsers = async () => {
    const users = await db.users.findMany();
    return { users: users };
};

export const registerUser = async (firstname: string, lastname: string, email: string) => {
    const user = await db.users.upsert({
        where: { email: email },
        update: {},
        create: {
            id: new ObjectId().toString(),
            firstname: firstname,
            lastname: lastname,
            email: email,
            role: 'Student',
            college: 'UNKNOWN',
        },
    });

    const userBorrowItems = await db.userBorrowItems.create({
        data: {
            id: new ObjectId().toString(),
            purpose: '',
            borrow_date: new Date(),
            return_date: new Date(),
            user_id: new ObjectId(user.id).toString()
        },
    });

    return user;
};

export const getUserByEmail = async (email: string) => {
    const user = await db.users.findFirst({ where: { email: email } });
    return user;
};

export const getEquipments = async () => {
    const equipments = await db.equipments.findMany();
    return equipments;
}

export const addEquipment = async (equipment: Equipment) => {
    const insertedId = new ObjectId().toString();
    const equipments = await db.equipments.create({
        data: {
            id: insertedId,
            name: equipment.name,
            stock: equipment.stock,
            is_available: equipment.is_available,
        }
    });

    return insertedId;
}

export const updateEquipment = async (equipment: Equipment) => {
    const equipments = await db.equipments.update({
        where: { id: new ObjectId(equipment.id).toString() },
        data: {
            name: equipment.name,
            stock: equipment.stock,
            is_available: equipment.is_available,
        }
    });
    return equipments;
}

export const deleteEquipment = async (id: string) => {
    const equipment = await db.equipments.delete({
        where: { id: new ObjectId(id).toString() },
    });
    return equipment;
}

export const getBorrowItems = async (user_id: string) => {
    const borrowItems = await db.userBorrowItems.findFirst({
        where: {
            user_id: user_id
        },
        select: {
            equipments: true,
        }
    });
    return borrowItems;
}

export const addEquipmentToBorrow = async (equipment: BorrowEquipment, user_id: string) => {
    const borrowItems = await db.userBorrowItems.update({
        where: {
            user_id: user_id,
            equipments: {
                none: equipment
            }
        },
        data: {
            equipments: {
                create: equipment
            }
        }
    });

    return borrowItems;
}

export const removeEquipmentToBorrow = async (user_id: string, equipmentId: string) => {
    const borrowItems = await db.userBorrowItems.update({
        where: {
            user_id: user_id
        },
        data: {
            equipments: {
                deleteMany: {
                    id: equipmentId
                }
            }
        }
    });

    return borrowItems;
}

export const sendBorrowRequest = async (borrowRequest: AdminBorrowRequest) => {
    const pushBorrowRequest = await db.equipments.create({
        data: {
            id: borrowRequest.equipments[0].id,
            name: borrowRequest.name,
            is_available: true,
            stock: 5,
        }
    });
    const borrowItems = await db.adminBorrowRequests.create({
        data: {
            id: borrowRequest.id,
            name: borrowRequest.name,
            email: borrowRequest.email,
            college: borrowRequest.college,
            role: borrowRequest.role,
            equipments: {
                create: borrowRequest.equipments
            },
            purpose: borrowRequest.college,
            borrow_date: borrowRequest.borrow_date,
            return_date: borrowRequest.return_date,
            user_id: borrowRequest.college,
            borrow_status: borrowRequest.borrow_status,
            condition: borrowRequest.condition,
            note: borrowRequest.college,
            created_at: borrowRequest.college,

        }
    });

    const deletedBorrowItems = await db.userBorrowItems.delete({
        where: {
            user_id: borrowRequest.user_id
        }
    });

    const newBorrowItem = await db.userBorrowItems.create({
        data: {
            id: new ObjectId().toString(),
            borrow_date: new Date(),
            return_date: new Date(),
            purpose: '',
            user_id: borrowRequest.user_id,
        }
    });

    const pushUserNotification = await db.userNotifications.create({
        data: {
            id: new ObjectId().toString(),
            request_id: borrowRequest.id,
            title: `Borrow Request #${borrowRequest.id}`,
            borrow_status: 'Pending',
            is_viewed: false,
            user_id: borrowRequest.user_id,
            created_at: new Date(),
        }
    });

    const pushAdminNotification = await db.adminNotifications.create({
        data: {
            id: new ObjectId().toString(),
            request_id: borrowRequest.id,
            title: `Borrow Request #${borrowRequest.id}`,
            description: `${borrowRequest.name} has sent a borrow request.`,
            is_viewed: false,
            user_id: borrowRequest.user_id,
            created_at: new Date(),
        }
    });

    const pushHistoryNotification = await db.userHistory.create({
        data: {
            id: new ObjectId().toString(),
            request_id: borrowRequest.id,
            title: `Borrow Request #${borrowRequest.id}`,
            borrow_status: 'Pending',
            condition: 'Good',
            is_viewed: false,
            user_id: borrowRequest.user_id,
            created_at: new Date(),
        }
    });

    return borrowItems;
}

export const getUserNotification = async (user_id: string) => {
    const notification = await db.userNotifications.findMany({
        where: {
            user_id: user_id
        },
        orderBy: {
            created_at: 'desc'
        }
    });
    return notification;
}

export const getAdminNotification = async () => {
    const notification = await db.adminNotifications.findMany();
    return notification;
}

export const viewAdminNotification = async (request_id: string) => {
    const notification = await db.adminNotifications.update({
        where: {
            request_id: new ObjectId(request_id).toString()
        },
        data: {
            is_viewed: true
        }
    });
    return notification;
}

export const getUserHistory = async (user_id: string) => {
    const notification = await db.userHistory.findMany({
        where: {
            user_id: user_id
        },
        orderBy: {
            created_at: 'desc'
        }
    });
    return notification;
}

export const getAdminBorrowRequest = async () => {
    const borrowRequest = await db.adminBorrowRequests.findMany();
    return borrowRequest;
};

export const getAdminBorrowRequestById = async (requestId: string) => {
    const borrowRequest = await db.adminBorrowRequests.findFirst({ where: { id: requestId } });
    return borrowRequest;
};

export const updateAdminBorrowRequestById = async (input: AdminBorrowRequest) => {
    const borrowRequest = await db.adminBorrowRequests.update({
        where: { id: new ObjectId(input.id).toString() },
        data: {
            borrow_status: input.borrow_status,
            condition: input.condition,
            note: input.note
        }
    });
    return borrowRequest;
};

export const updateUserCollege = async (user_id: string, college: College) => {
    const userAccount = await db.users.update({
        where: {
            id: user_id,
        },
        data: {
            college: college
        }
    });
    return userAccount;
}

export const updateUserRole = async (user_id: string, role: Role) => {
    const userAccount = await db.users.update({
        where: {
            id: user_id,
        },
        data: {
            role: role
        }
    });
    return userAccount;
}

export const getUserAccount = async () => {
    const userAccount = await db.users.findFirst({
        where: {
            id: '655090d119e6860ab68d0e0c',
        }
    });
    return userAccount;
}