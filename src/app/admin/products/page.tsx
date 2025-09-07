"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {DataTable} from './data-table'
import { columns } from './column'
import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '@/http/api'
import { Product } from '@/types'
import ProductSheet from './product-sheet'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { useProductStore } from '@/Store/product/productStore'

const ProductsPage = () => {
const {onOpen}=useProductStore()
  const {data:products,isFetching,isError,error}=useQuery<Product[]>({
    queryKey:["products"],
    queryFn:getAllProducts
  })
  return (
   <>
    <div className='flex items-center justify-between my-2'>
      <h3 className='text-2xl font-bold tracking-tight'>Products</h3>
      <Button size={'sm'} onClick={onOpen}>Add Product</Button>
    </div>
    {isError && <span className='text-red-500 '>Something Went Wrong !! {error.message}</span>}
    {isFetching ? <div className='h-[30vh] w-full flex justify-center items-center'><Spinner key={'infinite'} variant={'infinite'} size={50}/></div> :    <DataTable data={products || []} columns={columns}/>
 }
    <ProductSheet  />
   </>
  )
}

export default ProductsPage