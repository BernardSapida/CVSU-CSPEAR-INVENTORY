import { publicProcedure, router } from "@/lib/server/trpc";
import { getUsers, getUserByEmail } from "@/lib/api/computers/queries"
import { z } from 'zod';

export const usersRouter = router({
  getUsers: publicProcedure.query(async () => {
    return getUsers();
  }),
  getUserByEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ input }) => {
      return getUserByEmail(input.email);
    }),
});
