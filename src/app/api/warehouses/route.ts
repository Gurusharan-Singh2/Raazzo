import { db } from "@/lib/db/db"
import { warehouses } from "@/lib/db/schema"
import { warehouseSchema } from "@/lib/validators/warehouseSchema"
import { desc } from "drizzle-orm";


export async function POST(req:Request) {
  try {
    
    const requestData=await req.json()
      const validated = warehouseSchema.safeParse(requestData);

    if (!validated.success) {
      return Response.json(
        { message: "Validation failed", errors: validated.error.flatten() },
        { status: 400 }
      );
    }

    const {name,pincode}=validated.data
   let t=await db.insert(warehouses).values({
    name:name,
    pincode:pincode
   })

  
   
   return Response.json({message:"ok"},{status:201})

  } catch (error) {
    console.log(error);
    
    return Response.json({message:error},{status:500})
  }



}

export async function GET() {
  try {
    
    const data=await db.select().from(warehouses);
    return Response.json({message:"ok",data},{status:200})

  } catch (error) {
    return Response.json({message:error},{status:500})
  }
  
}


