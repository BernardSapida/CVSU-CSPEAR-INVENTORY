import * as z from "zod"

export const usersSchema = z.object({
  id: z.string(),
  given_name: z.string(),
  family_name: z.string(),
  email: z.string(),
})
