import { db } from "@/lib/db/index";

export const addEquipment = async (name: string, isAvailable: boolean, stock: number) => {
    const addedEquipment = await db.equipments.create({
        data: {
            name: name,
            isAvailable: isAvailable,
            stock: stock
        }
    });

    return addedEquipment;
};

export const updateEquipment = async (equipmentId: string, name: string, isAvailable: boolean, stock: number) => {
    const updatedEquipment = await db.equipments.update({
        where: {
            id: equipmentId,
        },
        data: {
            name: name,
            isAvailable: isAvailable,
            stock: stock
        }
    });
    return updatedEquipment;
};

export const deleteEquipment = async (equipmentId: string) => {
    const updatedEquipment = await db.equipments.delete({
        where: {
            id: equipmentId,
        }
    });
    return updatedEquipment;
};