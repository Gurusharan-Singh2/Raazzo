

export interface Product{
  id:number;
  name:string;
  image:string;
  price:number;
}

export interface Warehouses {
    id: number,
    name:string;
    pincode: number,
}

export interface DeliveryPersons{
  id:number,
  name: string,
  phone: number,
  warehouse: string
}