import {z} from 'zod'

export const deliveryPersonSchema=z.object({
  name:z.string({message:"Delivery name should be string"}),
  phone:z.string({message:" phone should be string"}).min(10,"Length should be 10").max(13,"Length should be max 13"),
  warehouseId:z.number({message:"warehouseId should be a number"}),
})