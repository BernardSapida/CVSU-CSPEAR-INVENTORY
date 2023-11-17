import { publicProcedure, router } from "@/lib/server/trpc";
import { getUsers, getUserByClerkUserId } from "@/lib/api/users/queries"
import { updateUserCollege, updateUserRole } from "@/lib/api/users/mutations"
import { z } from 'zod';

export const usersRouter = router({
    getUsers: publicProcedure.query(async ({ ctx }) => {
        return getUsers();
    }),
    getLoggedUser: publicProcedure.query(async ({ ctx }) => {
        const clerkUserId = ctx.session?.user.id!;
        return getUserByClerkUserId(clerkUserId);
    }),

    updateUserCollege: publicProcedure.input(z.object({
        college: z.string()
    })).mutation(async ({ input, ctx }) => {
        const userId = ctx.user?.id!;
        return updateUserCollege(userId, input.college as College);
    }),
    updateUserRole: publicProcedure.input(z.object({
        role: z.string()
    })).mutation(async ({ input, ctx }) => {
        const userId = ctx.user?.id!;
        return updateUserRole(userId, input.role as Role);
    }),
});
