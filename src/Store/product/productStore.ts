import {create} from 'zustand';

type ProductTypes = {
isOpen:boolean,
onOpen:()=>void,
onClose:()=>void
}

export const useProductStore=create<ProductTypes>((set)=>{
  return {
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
  }
})
