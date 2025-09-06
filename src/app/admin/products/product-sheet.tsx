import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import  CreateProductForm, { FormValue } from './create-product-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '@/http/api'

interface Props{
  opensheet :boolean,
  setOpenSheet:any
}



const ProductSheet = ({opensheet,setOpenSheet}:Props) => {
  const queryClient=useQueryClient()

  const createProductMutation=useMutation({
    mutationKey:["create-product"],
    mutationFn:(data:FormData)=>createProduct(data),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['products']})
      alert('Product Created !');
      setOpenSheet(false)
    }
    
  })

  const onSubmit=(values:FormValue)=>{
   const formdata=new FormData();
   formdata.append("name",values.name)
   formdata.append("description",values.description)
   formdata.append("price",String(values.price))
    formdata.append("image", (values.image as FileList)[0]);

   
   
    createProductMutation.mutate(formdata);

  }
  return (
    <Sheet open={opensheet} onOpenChange={()=>setOpenSheet((p:boolean)=>!p)}>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Create Product </SheetTitle>
      <SheetDescription>
        Create a new Product
      </SheetDescription>
    </SheetHeader>
   <CreateProductForm onSubmit={onSubmit} createProductMutation={createProductMutation}/>
  </SheetContent>
</Sheet>
  )
}

export default ProductSheet