import { publicProcedure, router } from "@/lib/server/trpc";
import { getEquipments } from "@/lib/api/equipments/queries";
import { addEquipment, deleteEquipment, updateEquipment } from "@/lib/api/equipments/mutations";
import { z } from 'zod';

export const equipmentsRouter = router({
  getEquipments: publicProcedure.query(async () => {
    return getEquipments();
  }),
  addEquipment: publicProcedure.input(z.object({
    name: z.string(),
    isAvailable: z.boolean(),
    stock: z.number().nonnegative(),
  })).mutation(async ({ input }) => {
    return addEquipment(input.name, input.isAvailable, input.stock);
  }),
  updateEquipment: publicProcedure.input(z.object({
    equipmentId: z.string(),
    name: z.string(),
    isAvailable: z.boolean(),
    stock: z.number().nonnegative(),
  })).mutation(async ({ input }) => {
    return updateEquipment(input.equipmentId, input.name, input.isAvailable, input.stock);
  }),
  deleteEquipment: publicProcedure.input(z.object({
    equipmentId: z.string(),
  })).mutation(async ({ input }) => {
    return deleteEquipment(input.equipmentId);
  })
});
