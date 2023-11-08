import { usersRouter } from "./users";
import { router } from "@/lib/server/trpc";

export const appRouter = router({
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
