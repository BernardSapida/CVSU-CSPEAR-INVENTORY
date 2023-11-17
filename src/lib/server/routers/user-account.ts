// import { publicProcedure, router } from "@/lib/server/trpc";
// import { getUserAccount, updateUserCollege, updateUserRole } from "@/lib/api/computers/queries"
// import { z } from 'zod';

// export const userAccountRouter = router({
//   getUserAccount:
//     publicProcedure.query(async () => {
//       return getUserAccount();
//     }),
//   updateUserRole:
//     publicProcedure.input(z.object({
//       user_id: z.string(),
//       role: z.string()
//     })).mutation(async ({ input: { user_id, role } }) => {
//       return updateUserRole(user_id, role as Role);
//     }),
//   updateUserCollege:
//     publicProcedure.input(z.object({
//       user_id: z.string(),
//       college: z.string()
//     })).mutation(async ({ input: { user_id, college } }) => {
//       return updateUserCollege(user_id, college as College);
//     })
// });
