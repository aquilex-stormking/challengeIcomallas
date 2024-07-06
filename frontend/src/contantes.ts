export const API = 'http://localhost:3000'

export interface ICliente{
  nit:string
  business_name: string,
  email:string,
  phone:string,
  created_by:number,
  client_id:number,
  status:string
}
export interface IUsuario{
  username:string
  password: string,
  email:string,
  
}