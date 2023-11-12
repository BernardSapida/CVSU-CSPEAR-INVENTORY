import { publicProcedure, router } from "@/lib/server/trpc";
import { addEquipment, deleteEquipment, getEquipments, updateEquipment } from "@/lib/api/computers/queries"
import { z } from 'zod';

export const equipmentsRouter = router({
  getEquipments: publicProcedure.query(async () => {
    return getEquipments();
  }),
  addEquipment:
    publicProcedure.input(z.object({
      name: z.string(),
      stock: z.number(),
      is_available: z.boolean()
    })).mutation(async ({ input }) => {
      return addEquipment(input as Equipment);
    }),
  updateEquipment:
    publicProcedure.input(z.object({
      id: z.string(),
      name: z.string(),
      stock: z.number(),
      is_available: z.boolean()
    })).mutation(async ({ input }) => {
      return updateEquipment(input);
    }),
  deleteEquipment:
    publicProcedure.input(z.object({
      id: z.string(),
    })).mutation(async ({ input }) => {
      return deleteEquipment(input.id);
    })
});
