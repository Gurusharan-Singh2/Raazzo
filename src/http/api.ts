import { api } from "./client"


export const getAllProducts=async()=>{
  const response=await api.get('/products')
  return response.data?.data;

}
export const createProduct=async(data:FormData)=>{
  console.log("From api function :",data);
  
  const response=await api.post('/products',data,{
    headers:{
      'Content-Type':'multipart/form-data'
    }
  });
  return response.data
}