import { api } from "./client"


export const getAllProducts=async()=>{
  const response=await api.get('/products')
  return response.data?.data;

}
export const createProduct=async(data:FormData)=>{
  // console.log("From api function :",data);
  
  const response=await api.post('/products',data,{
    headers:{
      'Content-Type':'multipart/form-data'
    }
  });
  return response.data
}


// Warehouses

export const getAllWarehouses=async()=>{
  const response=await api.get('/warehouses')
  return response.data?.data;

}
export const createWarehouse=async(data:FormData)=>{
  // console.log("From api function :",data);
  
  const response=await api.post('/warehouses',data,{
    headers:{
      'Content-Type':'json'
    }
  });
  return response.data
}


/////////// Delivery Persons /////////


export const getAllDeliveryPersons=async()=>{
  const response=await api.get('/delivery-person')
  return response.data?.data;

}
export const createDeliveryPerson=async(data:FormData)=>{
  // console.log("From api function :",data);
  
  const response=await api.post('/delivery-person',data,{
    headers:{
      'Content-Type':'json'
    }
  });
  return response.data
}


