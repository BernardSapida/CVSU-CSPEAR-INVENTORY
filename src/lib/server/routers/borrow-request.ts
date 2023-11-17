import { publicProcedure, router } from "@/lib/server/trpc";
import { addBorrowRequest } from "@/lib/api/borrow-request/mutations"
import { z } from 'zod';
import { submitCart, updateCartItemQuantity, updateBorrowRequestById } from '@/lib/api/cart-items/mutations';
import { getBorrowRequestById, getBorrowRequests } from '@/lib/api/borrow-request/queries';

export const borrowRequestRouter = router({
  getBorrowRequests: publicProcedure.query(async () => {
    const borrowRequests = await getBorrowRequests();
    return borrowRequests;
  }),
  getBorrowRequestById: publicProcedure.input(
    z.object({
      borrowRequestId: z.string(),
    })
  ).query(async ({ input }) => {
    const borrowRequest = await getBorrowRequestById(input.borrowRequestId);

    return borrowRequest;
  }),
  addBorrowRequest: publicProcedure.input(
    z.object({
      cartId: z.string(),
      cartItems: z.object({
        id: z.string(),
        name: z.string(),
        quantity: z.number().nonnegative(),
        cartId: z.string(),
      }).array(),
      borrowDate: z.string(),
      returnDate: z.string(),
      purpose: z.string(),
    })
  ).mutation(async ({ input, ctx }) => {
    const userId = ctx.user?.id!;

    for (let cartItem of input.cartItems) {
      await updateCartItemQuantity(cartItem.id, cartItem.quantity);
    }

    await addBorrowRequest(input.cartId, input.borrowDate, input.returnDate, input.purpose, userId);
    await submitCart(userId, input.cartId);
  }),
  updateBorrowRequestById: publicProcedure.input(
    z.object({
      id: z.string(),
      borrowStatus: z.string(),
      condition: z.string(),
      note: z.string(),
    })
  ).mutation(async ({ input }) => {
    await updateBorrowRequestById(input.id, input.borrowStatus as BorrowStatus, input.condition as Condition, input.note);
  }),
});
