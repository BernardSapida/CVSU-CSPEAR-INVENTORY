import { publicProcedure, router } from "@/lib/server/trpc";
import { getUserNotification, getAdminNotification, getUserHistory, viewAdminNotification } from "@/lib/api/computers/queries"
import { z } from 'zod';

export const notificationRouter = router({
  getUserNotification: publicProcedure.query(async () => {
    return getUserNotification();
  }),
  getAdminNotification: publicProcedure.query(async () => {
    return getAdminNotification();
  }),
  viewAdminNotification:
    publicProcedure.input(z.object({
      request_id: z.string()
    })).mutation(async ({ input }) => {
      return viewAdminNotification(input.request_id);
    }),
  getUserHistory: publicProcedure.query(async () => {
    return getUserHistory();
  }),
});
