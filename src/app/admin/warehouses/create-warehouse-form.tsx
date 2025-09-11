'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

import { warehouseSchema } from '@/lib/validators/warehouseSchema'


export type FormValue=z.input<typeof warehouseSchema>

const CreateWarehouseForm = ({onSubmit,createWarehouseMutaion}:{onSubmit:(formValues:FormValue)=>void,createWarehouseMutaion:any}) => {

  const form=useForm<z.infer<typeof warehouseSchema>>({
    resolver:zodResolver(warehouseSchema),
    defaultValues:{
      name:"",
      pincode:""
    }
  })


  const handleSubmit=(values :FormValue)=>{
onSubmit(values)


  }
  return (

<div className='px-4'>  <Form {...form} >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. ChocoBar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
              <Input placeholder="e.g. 262728" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
       
        <Button type="submit" disabled={createWarehouseMutaion.isPending} className='w-full disabled:opacity-65'>{createWarehouseMutaion.isPending?<Loader2 className='size-5 animate-spin'/>:"Create"}</Button>
      </form>
    </Form></div>
  )
}

export default CreateWarehouseForm