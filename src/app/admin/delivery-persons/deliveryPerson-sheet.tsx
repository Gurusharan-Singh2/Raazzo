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
import CreateWarehouseForm from './create-delivery-person-form'
import { useProductStore } from '@/Store/product/productStore'
import { createDeliveryPerson } from '@/http/api'






const deliveryPersonSheet = () => {
  const {onClose,isOpen}=useProductStore()
  const queryClient=useQueryClient()

  const createDeliveryPersonMutation=useMutation({
    mutationKey:["create-delivery-person"],
    mutationFn:(data:FormData)=>createDeliveryPerson(data),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['deliveryPersons']})
      toast.success("Delivery-Person Created !!!",{duration:2000})
      onClose();
    },
    onError:(error)=>{
      toast.error(error?.message || "Something went wrong !!!!!")
    }
    
  })

  const onSubmit=(values:any)=>{
  
   
   
    createDeliveryPersonMutation.mutate(values);

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
   <CreateWarehouseForm onSubmit={onSubmit} createDeliveryPersonMutation={createDeliveryPersonMutation}/>
  </SheetContent>
</Sheet>
  )
}

export default deliveryPersonSheet