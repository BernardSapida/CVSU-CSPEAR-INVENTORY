import * as z from "zod"
import { CompleteBorrowRequests, relatedBorrowRequestsSchema } from "./index"

export const adminNotificationsSchema = z.object({
  id: z.string(),
  isViewed: z.boolean(),
  createdAt: z.date(),
  borrowRequestId: z.string(),
})

export interface CompleteAdminNotifications extends z.infer<typeof adminNotificationsSchema> {
  borrowRequest: CompleteBorrowRequests
}

/**
 * relatedAdminNotificationsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAdminNotificationsSchema: z.ZodSchema<CompleteAdminNotifications> = z.lazy(() => adminNotificationsSchema.extend({
  borrowRequest: relatedBorrowRequestsSchema,
}))
