import { db } from "@/lib/db/db";
import { deliveryPerson } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPersonSchema";

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