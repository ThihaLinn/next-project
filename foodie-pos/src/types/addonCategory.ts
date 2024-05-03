import { AddOnCategory } from "@prisma/client";
import { baseOption } from "./menu";

export interface AddonCategorySlice {
    addonCategories:AddOnCategory[]
    isLoading:boolean
    error:Error | null
}

export interface baseAddonCategory {
    name:string,
    isRequired:boolean
    menuIds:number[]
}

export interface newAddonCategoryParams extends baseAddonCategory,baseOption{

}

export interface updateAddonCateogryParms extends baseAddonCategory,baseOption{
    id:number
}

export interface deleteAddonCategoryParam extends baseOption{
    id:number
}