import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { desc } from "drizzle-orm";
import { truncate, unlink, writeFile } from "node:fs/promises";
import path from "node:path";


export async function POST(req:Request){
  const data=await req.formData();
  let validatedData;
  try {
    validatedData=productSchema.parse({
      name:data.get('name'),
      description:data.get('description'),
      price:Number(data.get('price')),
      image:data.get('image')
    })
  } catch (error) {
    return Response.json({message:error},{status:400})
  }

  const filename=`${Date.now()}.${validatedData.image.name}`;
  try {
    const buffer=Buffer.from(await validatedData.image.arrayBuffer());
    await writeFile(path.join(process.cwd(),'public/assets',filename),buffer);
  } catch (error) {
    return Response.json({message:"Failed to save the image"},{status:500})
  }
  
let p
  try {
   p= await db.insert(products).values({...validatedData,image:filename})
  } catch (error) {
    await unlink(path.join(process.cwd(),'public/assets',filename)).catch((e)=>{
      console.log("Image unlik error",e);
      
    })
    return Response.json({message:"Failed to message upload"},{status:500})
  }
  return Response.json({message:"Ok",data:p},{status:201})
}

export async function GET() {

  try {
    
    const allProducts=await db.select().from(products).orderBy(desc(products.id))

    return Response.json({message:"ok",data:allProducts},{status:200})
  } catch (error) {
    return Response.json({message:error},{status:500})
  }
  
}