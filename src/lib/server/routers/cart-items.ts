import { publicProcedure, router } from "@/lib/server/trpc";
import { addCartItem, removeCartItem } from "@/lib/api/cart-items/mutations"
import { getCartItems } from "@/lib/api/cart-items/queries"
import { z } from 'zod';

export const cartItemsRouter = router({
  getCartItems: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.id!;

    return getCartItems(userId);
  }),
  addCartItem: publicProcedure.input(
    z.object({
      id: z.string(),
      name: z.string(),
      quantity: z.number().nonnegative(),
      stock: z.number().nonnegative(),
      isAvailable: z.boolean(),
    })
  ).mutation(async ({ input, ctx }) => {
    const userId = ctx.user?.id!;

    return addCartItem(userId, input);
  }),
  removeCartItem: publicProcedure.input(
    z.object({
      itemId: z.string(),
    })
  ).mutation(async ({ input, ctx }) => {
    const userId = ctx.user?.id!;

    return removeCartItem(userId, input.itemId);
  }),
});
