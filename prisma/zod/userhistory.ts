import * as z from "zod"
import { BorrowStatus, Condition } from "@prisma/client"

export const userHistorySchema = z.object({
  id: z.string(),
  request_id: z.string(),
  title: z.string(),
  borrow_status: z.nativeEnum(BorrowStatus),
  condition: z.nativeEnum(Condition),
  is_viewed: z.boolean(),
  user_id: z.string(),
  created_at: z.date(),
})
