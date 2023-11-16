import * as z from "zod"
import { College, Role, BorrowStatus, Condition } from "@prisma/client"
import { CompleteCart, relatedCartSchema, CompleteUserNotifications, relatedUserNotificationsSchema, CompleteAdminNotifications, relatedAdminNotificationsSchema } from "./index"

export const borrowRequestsSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  college: z.nativeEnum(College),
  role: z.nativeEnum(Role),
  title: z.string(),
  purpose: z.string(),
  borrowDate: z.date(),
  returnDate: z.date(),
  borrowStatus: z.nativeEnum(BorrowStatus),
  condition: z.nativeEnum(Condition),
  note: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  cartId: z.string(),
})

export interface CompleteBorrowRequests extends z.infer<typeof borrowRequestsSchema> {
  cart: CompleteCart
  UserNotifications: CompleteUserNotifications[]
  AdminNotifications?: CompleteAdminNotifications | null
}

/**
 * relatedBorrowRequestsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedBorrowRequestsSchema: z.ZodSchema<CompleteBorrowRequests> = z.lazy(() => borrowRequestsSchema.extend({
  cart: relatedCartSchema,
  UserNotifications: relatedUserNotificationsSchema.array(),
  AdminNotifications: relatedAdminNotificationsSchema.nullish(),
}))
