import {z} from 'zod'

export const invenorySchema=z.object({
  sku:z.string({message:"sku should be string"}).length(8,"sku length 8 required"),
  productId:z.number({message:" productId should be number"}),
  warehouseId:z.number({message:"warehouseId should be a number"}),
})