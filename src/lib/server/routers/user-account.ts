import { publicProcedure, router } from "@/lib/server/trpc";
import { getUserAccount, updateUserCollege, updateUserRole } from "@/lib/api/computers/queries"
import { z } from 'zod';

export const userAccountRouter = router({
  getUserAccount:
    publicProcedure.query(async () => {
      return getUserAccount();
    }),
  updateUserRole:
    publicProcedure.input(z.object({
      role: z.string()
    })).mutation(async ({ input: { role } }) => {
      return updateUserRole(role as Role);
    }),
  updateUserCollege:
    publicProcedure.input(z.object({
      college: z.string()
    })).mutation(async ({ input: { college } }) => {
      return updateUserCollege(college as College);
    })
});
