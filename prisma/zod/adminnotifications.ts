import * as z from "zod"

export const adminNotificationsSchema = z.object({
  id: z.string(),
  request_id: z.string(),
  title: z.string(),
  description: z.string(),
  is_viewed: z.boolean(),
  user_id: z.string(),
  created_at: z.date(),
})
