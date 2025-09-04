import React from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { productSchema } from '@/lib/validators/productSchema'
import z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'


export type FormValue=z.input<typeof productSchema>

const CreateProductForm = ({onSubmit,createProductMutation}:{onSubmit:(formValues:FormValue)=>void,createProductMutation:any}) => {

  const form=useForm<z.infer<typeof productSchema>>({
    resolver:zodResolver(productSchema),
    defaultValues:{
      name:"",
      description:"",
      price:undefined
    }
  })

  const fileRef=form.register('image')

  const handleSubmit=(values :FormValue)=>{
onSubmit(values)

  }
  return (

<div className='px-4'>  <Form {...form} >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
               <Textarea placeholder='Enter Description' {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
              <Input type='file' {...fileRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
               <Input
  type="number"
  value={field.value ?? ""}
  onChange={(e) => {
    const value = e.target.value;
    field.onChange(value === "" ? undefined : parseFloat(value));
  }}
/>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full'>{createProductMutation.isPending?"Creating Product ...":"Create"}</Button>
      </form>
    </Form></div>
  )
}

export default CreateProductForm