import { baseOption } from "./menu"

export interface updateCompanyParam extends baseOption{
    id:number
    name:string
    street:string
    township:string
    city:string
}