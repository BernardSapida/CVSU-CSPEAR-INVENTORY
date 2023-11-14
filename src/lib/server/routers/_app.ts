import { adminBorrowRequestRouter } from './admin-borrow-requests';
import { authCallbackRouter } from './auth-callback';
import { equipmentsRouter } from './equipments';
import { notificationRouter } from './notification';
import { userAccountRouter } from './user-account';
import { borrowItemsRouter } from './user-borrow-items';
import { usersRouter } from "./users";
import { router } from "@/lib/server/trpc";

export const appRouter = router({
  users: usersRouter,
  equipments: equipmentsRouter,
  borrowItems: borrowItemsRouter,
  notification: notificationRouter,
  adminBorrowRequest: adminBorrowRequestRouter,
  userAccount: userAccountRouter,
  authCallback: authCallbackRouter
});

export type AppRouter = typeof appRouter;
