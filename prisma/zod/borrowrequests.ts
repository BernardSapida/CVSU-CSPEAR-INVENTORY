import * as z from "zod"
import { BorrowStatus, Condition } from "@prisma/client"
import { CompleteUsers, relatedUsersSchema, CompleteCart, relatedCartSchema, CompleteUserNotifications, relatedUserNotificationsSchema, CompleteAdminNotifications, relatedAdminNotificationsSchema } from "./index"

export const borrowRequestsSchema = z.object({
  id: z.string(),
  borrowDate: z.date(),
  returnDate: z.date(),
  purpose: z.string(),
  borrowStatus: z.nativeEnum(BorrowStatus),
  condition: z.nativeEnum(Condition),
  note: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  cartId: z.string(),
})

export interface CompleteBorrowRequests extends z.infer<typeof borrowRequestsSchema> {
  user: CompleteUsers
  cart: CompleteCart
  userNotifications: CompleteUserNotifications[]
  adminNotifications?: CompleteAdminNotifications | null
}

/**
 * relatedBorrowRequestsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedBorrowRequestsSchema: z.ZodSchema<CompleteBorrowRequests> = z.lazy(() => borrowRequestsSchema.extend({
  user: relatedUsersSchema,
  cart: relatedCartSchema,
  userNotifications: relatedUserNotificationsSchema.array(),
  adminNotifications: relatedAdminNotificationsSchema.nullish(),
}))
