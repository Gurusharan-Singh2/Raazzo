'use client'

import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query"
import React from "react"

let browserQueryClient:QueryClient | undefined=undefined;



function makeQueryClient(){
  return new QueryClient;

}

function getQueryClient(){
  if(typeof window==='undefined'){
 return makeQueryClient();
  }else {
    if(!browserQueryClient){
      browserQueryClient=makeQueryClient();

    }
    return browserQueryClient;
  }
}

const queryClient=getQueryClient();
export const QueryProvider=({children}:{children:React.ReactNode})=>{

return (
    <QueryClientProvider client={queryClient}>
{children}
        </QueryClientProvider>
)     

}