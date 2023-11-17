import { publicProcedure, router } from "@/lib/server/trpc";
import { getEquipments } from "@/lib/api/equipments/queries";
import { addEquipment, deleteEquipment, updateEquipment } from "@/lib/api/equipments/mutations";
import { z } from 'zod';
import { getReturnedEquipments, getDamagedEquipments, getMisplacedEquipments, getGoodEquipments } from '@/lib/api/borrow-request/mutations';

export const equipmentsRouter = router({
  getEquipments: publicProcedure.query(async () => {
    return getEquipments();
  }),
  getReport: publicProcedure.input(z.object({
    startMonth: z.string(),
    endMonth: z.string(),
  })).mutation(async ({ input }) => {
    const equipments = await getEquipments();
    const returnedEquipments = await getReturnedEquipments(input.startMonth, input.endMonth);
    const goodEquipments = await getGoodEquipments(input.startMonth, input.endMonth);
    const misplacedEquipments = await getMisplacedEquipments(input.startMonth, input.endMonth);
    const damagedEquipments = await getDamagedEquipments(input.startMonth, input.endMonth);

    return [equipments, returnedEquipments, goodEquipments, misplacedEquipments, damagedEquipments];
  }),
  addEquipment: publicProcedure.input(z.object({
    name: z.string(),
    isAvailable: z.boolean(),
    stock: z.number().nonnegative(),
  })).mutation(async ({ input }) => {
    return await addEquipment(input.name, input.isAvailable, input.stock);
  }),
  updateEquipment: publicProcedure.input(z.object({
    equipmentId: z.string(),
    name: z.string(),
    isAvailable: z.boolean(),
    stock: z.number().nonnegative(),
  })).mutation(async ({ input }) => {
    return await updateEquipment(input.equipmentId, input.name, input.isAvailable, input.stock);
  }),
  deleteEquipment: publicProcedure.input(z.object({
    equipmentId: z.string(),
  })).mutation(async ({ input }) => {
    return await deleteEquipment(input.equipmentId);
  })
});
