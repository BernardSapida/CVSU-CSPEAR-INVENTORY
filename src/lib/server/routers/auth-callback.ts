import { publicProcedure, router } from "@/lib/server/trpc";
import { getUserByClerkUserId } from "@/lib/api/users/queries"
import { registerUser } from "@/lib/api/users/mutations"
import { currentUser } from '@clerk/nextjs';
import { capitalize } from '@/utils/text';

export const authCallbackRouter = router({
  handleAuth: publicProcedure.mutation(async ({ ctx }) => {
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0].emailAddress!;
    const clerkUserId = ctx.session?.user.id!;

    console.log("clerkUserId");
    console.log(clerkUserId);

    const user = await getUserByClerkUserId(clerkUserId);

    if (!user) {
      const firstname = capitalize(clerkUser?.firstName!);
      const lastname = capitalize(clerkUser?.lastName!);

      return await registerUser(clerkUserId, firstname, lastname, email);
    }

    return user;
  }),
});
