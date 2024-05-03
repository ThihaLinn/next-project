import { Company } from '@prisma/client';
import { baseOption } from "./menu";

export  interface BaseMenuCategory {
    name:string,
}

export interface NewMenuCategoryParam extends BaseMenuCategory,baseOption{
    disable:boolean
    companyId:number
    locationId:number

}

export interface UpdateMenCategoryParam extends BaseMenuCategory,baseOption{
    id:number
    locationId:number
    disable:boolean
}

export interface deleteMenuCategoryParam extends baseOption{
    id:number
}