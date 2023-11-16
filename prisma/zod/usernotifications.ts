import * as z from "zod"
import { CompleteBorrowRequests, relatedBorrowRequestsSchema } from "./index"

export const userNotificationsSchema = z.object({
  id: z.string(),
  isViewed: z.boolean(),
  createdAt: z.date(),
  borrowRequestId: z.string(),
})

export interface CompleteUserNotifications extends z.infer<typeof userNotificationsSchema> {
  borrowRequest: CompleteBorrowRequests
}

/**
 * relatedUserNotificationsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserNotificationsSchema: z.ZodSchema<CompleteUserNotifications> = z.lazy(() => userNotificationsSchema.extend({
  borrowRequest: relatedBorrowRequestsSchema,
}))
