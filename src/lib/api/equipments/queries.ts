import { db } from "@/lib/db/index";

export const getEquipments = async () => {
    const equipments = await db.equipments.findMany();
    return equipments;
};