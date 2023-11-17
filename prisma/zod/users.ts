import * as z from "zod"
import { Role, College } from "@prisma/client"
import { CompleteCart, relatedCartSchema, CompleteBorrowRequests, relatedBorrowRequestsSchema } from "./index"

export const usersSchema = z.object({
  id: z.string(),
  clerkUserId: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  role: z.nativeEnum(Role),
  college: z.nativeEnum(College),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUsers extends z.infer<typeof usersSchema> {
  cart: CompleteCart[]
  borrowRequests: CompleteBorrowRequests[]
}

/**
 * relatedUsersSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUsersSchema: z.ZodSchema<CompleteUsers> = z.lazy(() => usersSchema.extend({
  cart: relatedCartSchema.array(),
  borrowRequests: relatedBorrowRequestsSchema.array(),
}))
