import * as z from "zod"
import { BorrowStatus } from "@prisma/client"

export const userNotificationsSchema = z.object({
  id: z.string(),
  request_id: z.string(),
  title: z.string(),
  borrow_status: z.nativeEnum(BorrowStatus),
  is_viewed: z.boolean(),
  created_at: z.date(),
})
