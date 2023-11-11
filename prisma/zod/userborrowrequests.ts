import * as z from "zod"
import { CompleteQuantityAndID, relatedQuantityAndIDSchema, CompleteUsers, relatedUsersSchema } from "./index"

export const userBorrowRequestsSchema = z.object({
  id: z.string(),
  purpose: z.string(),
  borrow_date: z.date(),
  return_date: z.date(),
  user_id: z.string(),
})

export interface CompleteUserBorrowRequests extends z.infer<typeof userBorrowRequestsSchema> {
  equipments: CompleteQuantityAndID[]
  user: CompleteUsers
}

/**
 * relatedUserBorrowRequestsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserBorrowRequestsSchema: z.ZodSchema<CompleteUserBorrowRequests> = z.lazy(() => userBorrowRequestsSchema.extend({
  equipments: relatedQuantityAndIDSchema.array(),
  user: relatedUsersSchema,
}))
