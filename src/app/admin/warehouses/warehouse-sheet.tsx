import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import CreateWarehouseForm from './create-warehouse-form'
import { useProductStore } from '@/Store/product/productStore'
import { createWarehouse } from '@/http/api'






const WarehouseSheet = () => {
  const {onClose,isOpen}=useProductStore()
  const queryClient=useQueryClient()

  const createWarehouseMutation=useMutation({
    mutationKey:["create-warehouse"],
    mutationFn:(data:FormData)=>createWarehouse(data),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['warehouses']})
      toast.success("Warehouse Created !!!",{duration:2000})
      onClose();
    },
    onError:(error)=>{
      toast.error(error?.message || "Something went wrong !!!!!")
    }
    
  })

  const onSubmit=(values:any)=>{
  
   
   
    createWarehouseMutation.mutate(values);

  }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Create Product </SheetTitle>
      <SheetDescription>
        Create a new Product
      </SheetDescription>
    </SheetHeader>
   <CreateWarehouseForm onSubmit={onSubmit} createWarehouseMutaion={createWarehouseMutation}/>
  </SheetContent>
</Sheet>
  )
}

export default WarehouseSheet