import {  OrderCartItemMEnu } from "@prisma/client";

export interface OrderCartItemMenuSlice {
    orderCartItemMenu :OrderCartItemMEnu[]
    isloading:boolean
    error:Error | null
}