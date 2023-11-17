import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getUserAuth } from "@/lib/auth/utils";
import prisma from '@/utils/prisma';

export async function createContext(opts?: FetchCreateContextFnOptions) {
  const { session } = await getUserAuth();
  const user = await prisma.users.findFirst({
    where: {
      clerkUserId: session?.user.id
    }
  });

  return {
    user: user,
    session: session,
    headers: opts && Object.fromEntries(opts.req.headers),
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
