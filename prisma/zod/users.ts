import * as z from "zod"
import { Role, College } from "@prisma/client"
import { CompleteUserBorrowRequests, relatedUserBorrowRequestsSchema } from "./index"

export const usersSchema = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  role: z.nativeEnum(Role),
  college: z.nativeEnum(College),
})

export interface CompleteUsers extends z.infer<typeof usersSchema> {
  userBorrowRequests?: CompleteUserBorrowRequests | null
}

/**
 * relatedUsersSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUsersSchema: z.ZodSchema<CompleteUsers> = z.lazy(() => usersSchema.extend({
  userBorrowRequests: relatedUserBorrowRequestsSchema.nullish(),
}))
