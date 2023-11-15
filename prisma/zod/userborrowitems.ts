import * as z from "zod"
import { CompleteUsers, relatedUsersSchema } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const userBorrowItemsSchema = z.object({
  id: z.string(),
  equipments: jsonSchema.array(),
  purpose: z.string(),
  borrow_date: z.date(),
  return_date: z.date(),
  user_id: z.string(),
})

export interface CompleteUserBorrowItems extends z.infer<typeof userBorrowItemsSchema> {
  user: CompleteUsers
}

/**
 * relatedUserBorrowItemsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserBorrowItemsSchema: z.ZodSchema<CompleteUserBorrowItems> = z.lazy(() => userBorrowItemsSchema.extend({
  user: relatedUsersSchema,
}))
