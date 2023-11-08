import { publicProcedure, router } from "@/lib/server/trpc";
import { getUsers, getUserById } from "@/lib/api/computers/queries"
import { z } from 'zod';

export const usersRouter = router({
  getUsers: publicProcedure.query(async () => {
    return getUsers();
  }),
  getUserById: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return getUserById(input.userId);
    }),
});
