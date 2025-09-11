'use client'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { useProductStore } from '@/Store/product/productStore'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Warehouses } from '@/types'
import { getAllWarehouses } from '@/http/api'
import { columns } from './column'
import { DataTable } from './data-table'
import WarehouseSheet from './warehouse-sheet'

 const WareHousePage = () => {
  const {onOpen}=useProductStore();
   const {data:warehouses,isFetching,isError,error}=useQuery<Warehouses[]>({
    queryKey:["warehouses"],
    queryFn:getAllWarehouses
  })
  
  return (
    <>
    <div className='flex items-center justify-between my-2'>
      <h3 className='text-2xl font-bold tracking-tight'>Warehouses</h3>
      <Button size={'sm'} onClick={onOpen}>Add Warehouse</Button>
    </div>
    {isError && <span className='text-red-500 '>Something Went Wrong !! {error.message}</span>}
    {isFetching ? <div className='h-[30vh] w-full flex justify-center items-center'><Spinner key={'infinite'} variant={'infinite'} size={50}/></div> :    <DataTable data={warehouses || []} columns={columns}/>
 }
    <WarehouseSheet  />
   </>
  )
}

export default WareHousePage
