import { db } from "@/lib/db/db"
import { products } from "@/lib/db/schema"
import { eq } from "drizzle-orm"


export async function GET(req:Request,{params}:{params:{id:string}}) {

  const id=params.id

  try {
    
    const Product=await db.select().from(products).where(eq(products.id,Number(id))).limit(1);

    if(!Product.length){
      return Response.json({message:'Product not found'},{status:400})
    }

    return Response.json({message:"ok",data:Product[0]},{status:200})
  } catch (error) {
    return Response.json({message:error},{status:500})
  }
  
}