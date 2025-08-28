import {z} from 'zod'

export const deliveryPersonSchema=z.object({
  name:z.string({message:"Delivery name should be string"}),
  phone:z.string({message:" phone should be string"}).length(13,"Length should be string"),
  warehouseId:z.number({message:"warehouseId should be a number"}),
})