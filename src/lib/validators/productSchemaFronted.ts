import { z } from "zod";

export const productSchemaFronted= z.object({
  name: z.string({ message: "Product name should be string" }).min(4),
  image: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Product image should be an image",
    }),
  description: z
    .string({ message: "Product description should be a string" })
    .min(8),
  price: z.number({ message: "Product price should be a number" }).optional(),
});
