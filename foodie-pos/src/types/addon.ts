import { Addon } from "@prisma/client";
import { baseOption } from "./menu";

export interface AddonSlice{
    addons:Addon[],
    loading:boolean,
    error:Error | null
}

interface baseAddon{
    name:string,
    price:number,
    addonCategoryId:number
}

export interface newAddonParams extends baseAddon, baseOption{
    
}

export interface updateAddonParams extends baseAddon, baseOption{
    id:number
}

export interface deleteAddonParams extends baseOption{
    id:number
}