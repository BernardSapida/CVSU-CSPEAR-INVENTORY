import { publicProcedure, router } from "@/lib/server/trpc";
import { getUserByEmail, registerUser } from "@/lib/api/computers/queries"
import { z } from 'zod';
import { currentUser } from '@clerk/nextjs';
import { capitalize } from '@/utils/text';

export const authCallbackRouter = router({
  handleAuth: publicProcedure.mutation(async () => {
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0].emailAddress!;

    const user = await getUserByEmail(email);

    console.log(user);

    if (!user) {
      const firstname = capitalize(clerkUser?.firstName!);
      const lastname = capitalize(clerkUser?.lastName!);

      return await registerUser(firstname, lastname, email);
    }

    return user;
  }),
});
