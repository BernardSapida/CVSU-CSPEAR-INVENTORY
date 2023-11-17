import * as z from "zod"

export const equipmentsSchema = z.object({
  id: z.string(),
  name: z.string(),
  stock: z.number().int(),
  isAvailable: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
