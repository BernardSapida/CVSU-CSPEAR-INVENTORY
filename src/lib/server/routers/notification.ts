import { publicProcedure, router } from "@/lib/server/trpc";
import { getAdminNotification, getUserBorrowRequest, getUserNotification } from "@/lib/api/notification/queries"
import { z } from 'zod';
import { viewAdminNotification, viewUserNotification } from '@/lib/api/notification/mutations';

export const notificationRouter = router({
    getUserNotification: publicProcedure.query(async ({ ctx }) => {
        const userId = ctx.user?.id!;
        return getUserNotification(userId);
    }),
    getAdminNotification: publicProcedure.query(async ({ ctx }) => {
        const userId = ctx.user?.id!;
        return getAdminNotification(userId);
    }),
    getUserBorrowRequest: publicProcedure.query(async ({ ctx }) => {
        const userId = ctx.user?.id!;
        return getUserBorrowRequest(userId);
    }),
    viewUserNotification: publicProcedure.input(z.object({
        notificationId: z.string()
    })).mutation(async ({ input }) => {
        return viewUserNotification(input.notificationId);
    }),
    viewAdminNotification: publicProcedure.input(z.object({
        borrowRequestId: z.string()
    })).mutation(async ({ input }) => {
        return viewAdminNotification(input.borrowRequestId);
    }),
    // getUserHistory: publicProcedure.query(async () => {
    //     return getUserHistory();
    // }),
});
