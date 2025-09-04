"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {DataTable} from './data-table'
import { columns } from './column'
import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '@/http/api'
import { Product } from '@/types'
import ProductSheet from './product-sheet'

const ProductsPage = () => {
  const [openSheet,setOpenSheet]=useState(false);

  const {data:products}=useQuery<Product[]>({
    queryKey:["products"],
    queryFn:getAllProducts
  })
  return (
   <>
    <div className='flex items-center justify-between my-2'>
      <h3 className='text-2xl font-bold tracking-tight'>Products</h3>
      <Button size={'sm'} onClick={()=>setOpenSheet(true)}>Add Product</Button>
    </div>
    <DataTable data={products || []} columns={columns}/>
    <ProductSheet opensheet={openSheet} setOpenSheet={setOpenSheet} />
   </>
  )
}

export default ProductsPage