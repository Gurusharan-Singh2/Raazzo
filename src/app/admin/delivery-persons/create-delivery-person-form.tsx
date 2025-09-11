'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { deliveryPersonSchema } from '@/lib/validators/deliveryPersonSchema'
import { getAllWarehouses } from '@/http/api'
import { Warehouses } from '@/types'
import { useQuery } from '@tanstack/react-query'

export type FormValue = z.input<typeof deliveryPersonSchema>

const CreateWarehouseForm = ({
  onSubmit,
  createDeliveryPersonMutation,
}: {
  onSubmit: (formValues: FormValue) => void
  createDeliveryPersonMutation: any
}) => {
  const { data: warehouses, isFetching } = useQuery<Warehouses[]>({
    queryKey: ["warehouses"],
    queryFn: getAllWarehouses,
  })

  const form = useForm<z.infer<typeof deliveryPersonSchema>>({
    resolver: zodResolver(deliveryPersonSchema),
    defaultValues: {
      name: "",
      phone: "",
      warehouseId: warehouses && warehouses.length > 0 ? Number(warehouses[0].id) : 0, 
    },
  })

 const handleSubmit = (values: FormValue) => {
  onSubmit({
    ...values,
    phone: `+91${values.phone}`, 
    warehouseId: Number(values.warehouseId), 
  })
}


  return (
    <div className='px-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Name */}
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

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="9532054756" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Warehouse */}
          <FormField
            control={form.control}
            name="warehouseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Warehouse</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
  value={field.value ? String(field.value) : ""}
                    disabled={isFetching}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses?.map((a) => (
                        <SelectItem key={a.id} value={String(a.id)}>
                          {a.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          
          <Button
            type="submit"
            disabled={createDeliveryPersonMutation.isPending}
            className='w-full disabled:opacity-65'
          >
            {createDeliveryPersonMutation.isPending ? (
              <Loader2 className='size-5 animate-spin' />
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateWarehouseForm
