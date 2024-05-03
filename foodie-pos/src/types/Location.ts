import { Location } from "@prisma/client"
import { baseOption } from "./menu"

export interface LocationSlice{
    locations: Location[] 
    isLoading:Boolean
    Error:null 
}

export interface baseLocation {
    name:string
    street:string
    township:string
    city:string
    companyId:number
}

export interface newLocationParam extends baseLocation, baseOption{

}

export interface updateLocationParam extends baseOption{
    id:number
    name:string
    street:string
    township:string
    city:string
}

export interface deleteLocationParam extends baseOption{
    id:number
}