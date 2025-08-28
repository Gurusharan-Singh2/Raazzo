import { db } from "@/lib/db/db";
import { deliveryPerson, warehouses } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPersonSchema";
import { desc, eq } from "drizzle-orm";

export  async function POST(req:Request) {
try {
    const requestData=await req.json();
  
  let validated=deliveryPersonSchema.safeParse(requestData);
  if(!validated.success){
     return Response.json(
        { message: "Validation failed", errors: validated.error.flatten() },
        { status: 400 }
      );
  }
  await db.insert(deliveryPerson).values(validated.data);
  
  return Response.json({
    message:"created"
  },{status:201})

} catch (error) {
  return Response.json({
    message:"Something went wrong",
    error
  },{
    status:500
  })
}
  
}
export  async function GET() {
try {
 
const data=  await db.select({id:deliveryPerson.id,
  name:deliveryPerson.name,
  phone:deliveryPerson.phone,
  warehouse:warehouses.name
}).from(deliveryPerson).leftJoin(warehouses,eq(deliveryPerson.id,warehouses.id)).orderBy(desc(deliveryPerson.id));
  
  return Response.json({
    message:"ok",
    data
  },{status:201})

} catch (error) {
  return Response.json({
    message:"Something went wrong",
    error
  },{
    status:500
  })
}
  
}