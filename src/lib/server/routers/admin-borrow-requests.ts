import { publicProcedure, router } from "@/lib/server/trpc";
import { getAdminBorrowRequest, getAdminBorrowRequestById, updateAdminBorrowRequestById } from "@/lib/api/computers/queries"
import { z } from 'zod';

export const adminBorrowRequestRouter = router({
  getAdminBorrowRequest:
    publicProcedure.query(async () => {
      return getAdminBorrowRequest();
    }),
  getAdminBorrowRequestById:
    publicProcedure.input(
      z.object({
        request_id: z.string()
      })
    ).query(async ({ input: { request_id } }) => {
      return getAdminBorrowRequestById(request_id);
    }),
  updateAdminBorrowRequestById:
    publicProcedure.input(
      z.object({
        id: z.string(),
        borrow_status: z.string(),
        condition: z.string(),
        note: z.string()
      })
    ).mutation(async ({ input }) => {
      return updateAdminBorrowRequestById(input as any);
    })
});
