import { authCallbackRouter } from './auth-callback';
import { equipmentsRouter } from './equipments';
import { cartItemsRouter } from './cart-items';
import { borrowRequestRouter } from './borrow-request';
import { notificationRouter } from './notification';
import { usersRouter } from "./users";
import { router } from "@/lib/server/trpc";

export const appRouter = router({
  users: usersRouter,
  equipments: equipmentsRouter,
  cartItems: cartItemsRouter,
  borrowRequest: borrowRequestRouter,
  notification: notificationRouter,
  authCallback: authCallbackRouter
});

export type AppRouter = typeof appRouter;
