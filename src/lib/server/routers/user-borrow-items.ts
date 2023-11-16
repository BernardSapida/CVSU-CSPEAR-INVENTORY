import { publicProcedure, router } from "@/lib/server/trpc";
import { addEquipmentToBorrow, getAdminBorrowRequest, getBorrowItems, removeEquipmentToBorrow, sendBorrowRequest } from "@/lib/api/computers/queries"
import { z } from 'zod';

export const borrowItemsRouter = router({
  getBorrowItems: publicProcedure.input(
    z.object({
      user_id: z.string(),
    })
  ).query(async ({ input }) => {
    return getBorrowItems(input.user_id);
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
        user_id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const user_id = input.user_id;
      const equipment = {
        id: input.id,
        name: input.name,
        quantity: input.quantity,
        stock: input.stock,
        is_available: input.is_available,
      };

      await addEquipmentToBorrow(equipment, user_id);
    }),
  removeBorrowItem: publicProcedure
    .input(
      z.object({
        id: z.string(),
        user_id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await removeEquipmentToBorrow(input.user_id, input.id);
    }),
});
