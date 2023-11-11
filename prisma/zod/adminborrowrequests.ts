import * as z from "zod"
import { College, Role, BorrowStatus, Condition } from "@prisma/client"
import { CompleteQuantityAndID, relatedQuantityAndIDSchema } from "./index"

export const adminBorrowRequestsSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  college: z.nativeEnum(College),
  role: z.nativeEnum(Role),
  purpose: z.string(),
  borrow_date: z.date(),
  return_date: z.date(),
  user_id: z.string(),
  borrow_status: z.nativeEnum(BorrowStatus),
  condition: z.nativeEnum(Condition),
  note: z.string(),
  created_at: z.date(),
})

export interface CompleteAdminBorrowRequests extends z.infer<typeof adminBorrowRequestsSchema> {
  equipments: CompleteQuantityAndID[]
}

/**
 * relatedAdminBorrowRequestsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAdminBorrowRequestsSchema: z.ZodSchema<CompleteAdminBorrowRequests> = z.lazy(() => adminBorrowRequestsSchema.extend({
  equipments: relatedQuantityAndIDSchema.array(),
}))
