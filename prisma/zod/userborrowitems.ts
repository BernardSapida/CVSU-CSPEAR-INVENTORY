import * as z from "zod"
import { CompleteBorrowEquipments, relatedBorrowEquipmentsSchema, CompleteUsers, relatedUsersSchema } from "./index"

export const userBorrowItemsSchema = z.object({
  id: z.string(),
  purpose: z.string(),
  borrow_date: z.date(),
  return_date: z.date(),
  user_id: z.string(),
})

export interface CompleteUserBorrowItems extends z.infer<typeof userBorrowItemsSchema> {
  equipments: CompleteBorrowEquipments[]
  user: CompleteUsers
}

/**
 * relatedUserBorrowItemsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserBorrowItemsSchema: z.ZodSchema<CompleteUserBorrowItems> = z.lazy(() => userBorrowItemsSchema.extend({
  equipments: relatedBorrowEquipmentsSchema.array(),
  user: relatedUsersSchema,
}))
