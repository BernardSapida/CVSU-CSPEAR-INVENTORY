import * as z from "zod"
import { CompleteCartItems, relatedCartItemsSchema, CompleteUsers, relatedUsersSchema, CompleteBorrowRequests, relatedBorrowRequestsSchema } from "./index"

export const cartSchema = z.object({
  id: z.string(),
  userId: z.string(),
})

export interface CompleteCart extends z.infer<typeof cartSchema> {
  cartItems: CompleteCartItems[]
  user: CompleteUsers
  BorrowRequests?: CompleteBorrowRequests | null
}

/**
 * relatedCartSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCartSchema: z.ZodSchema<CompleteCart> = z.lazy(() => cartSchema.extend({
  cartItems: relatedCartItemsSchema.array(),
  user: relatedUsersSchema,
  BorrowRequests: relatedBorrowRequestsSchema.nullish(),
}))
