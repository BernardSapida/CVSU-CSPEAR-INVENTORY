import * as z from "zod"
import { College, Role, BorrowStatus, Condition } from "@prisma/client"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const adminBorrowRequestsSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  college: z.nativeEnum(College),
  role: z.nativeEnum(Role),
  equipments: jsonSchema.array(),
  purpose: z.string(),
  borrow_date: z.date(),
  return_date: z.date(),
  user_id: z.string(),
  borrow_status: z.nativeEnum(BorrowStatus),
  condition: z.nativeEnum(Condition),
  note: z.string(),
  created_at: z.date(),
})
