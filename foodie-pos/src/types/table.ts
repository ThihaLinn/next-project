import { baseOption } from './menu';
import { Table } from "@prisma/client";

export interface TableSlice {
    tables:Table[]
    isloading:boolean
    error:Error | null
}

export interface newTableParams extends baseOption{
    name:string
    locationId:number
}

export interface updateTableParams extends baseOption{
    id:number
    name:string
}

export interface deleteTableParams extends baseOption{
    id:number
}
