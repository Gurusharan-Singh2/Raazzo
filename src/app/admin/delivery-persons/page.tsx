'use client'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { useProductStore } from '@/Store/product/productStore'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { DeliveryPersons } from '@/types'
import { getAllDeliveryPersons } from '@/http/api'
import { columns } from './column'
import { DataTable } from './data-table'
import DeliveryPersonSheet from './deliveryPerson-sheet'

 const DeliveryPersonPage = () => {
  const {onOpen}=useProductStore();
   const {data:deliveryPersons,isFetching,isError,error}=useQuery<DeliveryPersons[]>({
    queryKey:["deliveryPersons"],
    queryFn:getAllDeliveryPersons
  })
  
  return (
    <>
    <div className='flex items-center justify-between my-2'>
      <h3 className='text-2xl font-bold tracking-tight'>Delivery Persons</h3>
      <Button size={'sm'} onClick={onOpen}>Create Delivery-Person</Button>
    </div>
    {isError && <span className='text-red-500 '>Something Went Wrong !! {error.message}</span>}
    {isFetching ? <div className='h-[30vh] w-full flex justify-center items-center'><Spinner key={'infinite'} variant={'infinite'} size={50}/></div> :    <DataTable data={deliveryPersons || []} columns={columns}/>
 }
    <DeliveryPersonSheet/>
   </>
  )
}

export default DeliveryPersonPage
