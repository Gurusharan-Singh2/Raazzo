// import { db } from "@/lib/db/db";
// import { products } from "@/lib/db/schema";
// import { productSchema } from "@/lib/validators/productSchema";
// import { desc } from "drizzle-orm";
// import { uploadToS3, deleteFromS3 } from "@/lib/s3/s3";

// export async function POST(req: Request) {
//   const data = await req.formData();
//   let validatedData;

//   try {
//     validatedData = productSchema.parse({
//       name: data.get("name"),
//       description: data.get("description"),
//       price: Number(data.get("price")),
//       image: data.get("image"),
//     });
//   } catch (error) {
//     return Response.json({ message: error }, { status: 400 });
//   }


//   const filename = `razzo/products/${Date.now()}-${validatedData.image.name}`;
// const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;


//   try {
//     const buffer = Buffer.from(await validatedData.image.arrayBuffer());

   
//     await uploadToS3({
//       key: filename,
//       body: buffer,
//       contentType: validatedData.image.type,
//     });
//   } catch (error) {
//     return Response.json({ message: "Failed to upload image to S3" }, { status: 500 });
//   }

//   let p;
//   try {
   
//     p = await db.insert(products).values({
//       name: validatedData.name,
//       description: validatedData.description,
//       price: Number(validatedData.price),
//       image: fileUrl as string, 
//     });
//   } catch (error) {
   
//     await deleteFromS3(filename).catch((e) => {
//       console.log("S3 delete error:", e);
//     });
//     return Response.json({ message: "Failed to save product" }, { status: 500 });
//   }

//   return Response.json({ message: "Ok", data: p }, { status: 201 });
// }

// export async function GET() {
//   try {
//     const allProducts = await db.select().from(products).orderBy(desc(products.id));

//     return Response.json({ message: "ok", data: allProducts }, { status: 200 });
//   } catch (error) {
//     return Response.json({ message: error }, { status: 500 });
//   }
// }





import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { desc } from "drizzle-orm";
import { uploadToB2, deleteFromB2, getSignedUrlFromB2 } from "@/lib/s3/b2"; // updated import

export async function POST(req: Request) {
  const data = await req.formData();
  let validatedData;

  try {
    validatedData = productSchema.parse({
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      image: data.get("image"),
    });
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }


  const filename = `razzo/products/${Date.now()}-${validatedData.image.name}`;

  try {
    const buffer = Buffer.from(await validatedData.image.arrayBuffer());

    await uploadToB2({
      key: filename,
      body: buffer,
      contentType: validatedData.image.type,
    });
  } catch (error) {
    console.error("B2 Upload Error:", error);
    return Response.json({ message: "Failed to upload image to B2" }, { status: 500 });
  }

  let product;
  try {
    // Store only the B2 key in DB, not a URL
    product = await db.insert(products).values({
      name: validatedData.name,
      description: validatedData.description,
      price: Number(validatedData.price),
      image: filename,
    });
  } catch (error) {
 
    await deleteFromB2(filename).catch((e) => console.log("B2 delete error:", e));
    return Response.json({ message: "Failed to save product" }, { status: 500 });
  }

  return Response.json({ message: "Ok", data: product }, { status: 201 });
}

export async function GET() {
  try {
    const allProducts = await db.select().from(products).orderBy(desc(products.id));

    // Generate signed URLs for private images
    const productsWithUrls = await Promise.all(
      allProducts.map(async (p) => {
        const signedUrl = await getSignedUrlFromB2(p.image); // p.image = B2 file key
        return { ...p, imageUrl: signedUrl };
      })
    );

    return Response.json({ message: "ok", data: productsWithUrls }, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return Response.json({ message: "Failed to fetch products", error }, { status: 500 });
  }
}
