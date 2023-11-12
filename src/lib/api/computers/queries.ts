import { ComputerId, computerIdSchema } from "@/lib/db/schema/computers";
import { db } from "@/lib/db/index";
import { ObjectId } from 'mongodb';

export const getUsers = async () => {
    const users = await db.users.findMany();
    return { users: users };
};

export const getUserById = async (id: string) => {
    //   const { id: userId } = computerIdSchema.parse({ id });
    const user = await db.users.findFirst({ where: { id: id } });
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
    console.log(`deleteEquipment`);
    const equipment = await db.equipments.delete({
        where: { id: new ObjectId(id).toString() },
    });
    return equipment;
}

export const getBorrowItems = async () => {
    const borrowItems = await db.userBorrowItems.findFirst({
        where: {
            user_id: '654edcfa26c9a4e1b58f1e54'
        }
    });
    return borrowItems;
}

export const addEquipmentToBorrow = async (equipment: BorrowEquipment) => {
    const borrowItems = await db.userBorrowItems.update({
        where: {
            user_id: '654edcfa26c9a4e1b58f1e54',
            equipments: {
                none: equipment
            }
        },
        data: {
            equipments: {
                push: equipment
            }
        }
    });
    return borrowItems;
}

export const removeEquipmentToBorrow = async (equipmentId: string) => {
    const borrowItems = await db.userBorrowItems.update({
        where: {
            user_id: '654edcfa26c9a4e1b58f1e54'
        },
        data: {
            equipments: {
                deleteMany: {
                    where: {
                        id: equipmentId
                    }
                }
            }
        }
    });

    return borrowItems;
}

export const sendBorrowRequest = async (borrowRequest: AdminBorrowRequest) => {
    const borrowItems = await db.adminBorrowRequests.create({
        data: { ...borrowRequest }
    });

    const deletedBorrowItems = await db.userBorrowItems.delete({
        where: {
            user_id: '654edcfa26c9a4e1b58f1e54'
        }
    });

    const newBorrowItem = await db.userBorrowItems.create({
        data: {
            id: new ObjectId().toString(),
            equipments: [],
            borrow_date: new Date(),
            return_date: new Date(),
            purpose: '',
            user_id: '654edcfa26c9a4e1b58f1e54',
        }
    });

    const pushUserNotification = await db.userNotifications.create({
        data: {
            id: new ObjectId().toString(),
            request_id: borrowRequest.id,
            title: `Borrow Request #${borrowRequest.id}`,
            borrow_status: 'Pending',
            is_viewed: false,
            user_id: '654edcfa26c9a4e1b58f1e54',
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
            user_id: '654edcfa26c9a4e1b58f1e54',
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
            user_id: '654edcfa26c9a4e1b58f1e54',
            created_at: new Date(),
        }
    });

    return borrowItems;
}

export const getUserNotification = async () => {
    const notification = await db.userNotifications.findMany({
        where: {
            user_id: '654edcfa26c9a4e1b58f1e54'
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

export const getUserHistory = async () => {
    const notification = await db.userHistory.findMany({
        where: {
            user_id: '654edcfa26c9a4e1b58f1e54'
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

export const updateUserCollege = async (college: College) => {
    const userAccount = await db.users.update({
        where: {
            id: new ObjectId('654f213981157e4f72f98de9').toString(),
        },
        data: {
            college: college
        }
    });
    return userAccount;
}

export const updateUserRole = async (role: Role) => {
    const userAccount = await db.users.update({
        where: {
            id: new ObjectId('654f213981157e4f72f98de9').toString(),
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