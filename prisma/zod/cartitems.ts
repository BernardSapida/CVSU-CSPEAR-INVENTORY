import * as z from "zod"
import { CompleteCart, relatedCartSchema } from "./index"

export const cartItemsSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number().int(),
  stock: z.number().int(),
  isAvailable: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  cartId: z.string(),
})

export interface CompleteCartItems extends z.infer<typeof cartItemsSchema> {
  cart: CompleteCart
}

/**
 * relatedCartItemsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCartItemsSchema: z.ZodSchema<CompleteCartItems> = z.lazy(() => cartItemsSchema.extend({
  cart: relatedCartSchema,
}))
