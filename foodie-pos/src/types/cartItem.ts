import { Addon, Menu } from "@prisma/client"
import { baseOption } from "./menu"

export interface cartItem extends baseOption {
    id:string 
    menu:Menu ,
    addons:Addon[],
    quantity:number
}

export interface cartItemSlice {
    cartItems :cartItem[]
    isloading:boolean
    error : null | Error
}