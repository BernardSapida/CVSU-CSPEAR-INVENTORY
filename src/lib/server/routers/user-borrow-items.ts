import { publicProcedure, router } from "@/lib/server/trpc";
import { addEquipmentToBorrow, getAdminBorrowRequest, getBorrowItems, removeEquipmentToBorrow, sendBorrowRequest } from "@/lib/api/computers/queries"
import { z } from 'zod';

export const borrowItemsRouter = router({
  getBorrowItems: publicProcedure.query(async () => {
    return getBorrowItems();
  }),
  sendBorrowRequest: publicProcedure
    .input(
      z.object({
        id: z.string(),
        purpose: z.string(),
        borrow_date: z.date(),
        return_date: z.date(),
        equipments: z.object({
          id: z.string(),
          name: z.string(),
          quantity: z.number().nonnegative(),
          stock: z.number().nonnegative(),
          is_available: z.boolean()
        }).array().nonempty(),
        user_id: z.string(),
        name: z.string(),
        email: z.string(),
        college: z.string(),
        role: z.string(),
        borrow_status: z.string(),
        condition: z.string(),
        note: z.string(),
        created_at: z.date(),
      })
    )
    .mutation(async ({ input }) => {
      await sendBorrowRequest(input as AdminBorrowRequest);
    }),
  addBorrowItem: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        quantity: z.number().nonnegative(),
        stock: z.number().nonnegative(),
        is_available: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      await addEquipmentToBorrow(input);
    }),
  removeBorrowItem: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await removeEquipmentToBorrow(input.id);
    }),
});
