import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schema";
import { invenorySchema } from "@/lib/validators/inventorySchema";
import { desc, eq } from "drizzle-orm";


export async function POST(req:Request) {

 try {

  const requestedData = await req.json();
  const validated=invenorySchema.safeParse(requestedData);
   if(!validated.success){
     return Response.json(
        { message: "Validation failed", errors: validated.error.flatten() },
        { status: 400 }
      );
  }
  
  await db.insert(inventories).values(validated.data)
 
    return Response.json({message:"ok"},{status:200})
  } catch (error) {
    console.log(error);
    
    return Response.json({message:"something went wrong",error: String(error)},{status:500})
  }
  
}

export  async function GET() {
try {
 
const data=  await db.select({
  id:inventories.id,
  sku:inventories.sku,
  warehouses:warehouses.name,
  products:products.name
}).from(inventories).leftJoin(warehouses,eq(inventories.warehouseId,warehouses.id)).leftJoin(products,eq(inventories.productId,products.id)).orderBy(desc(inventories.id));
  
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