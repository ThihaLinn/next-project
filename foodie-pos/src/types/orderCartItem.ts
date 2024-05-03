import { OrderCartItem } from "@prisma/client";

export interface OrderCartItemSlice {
    orderCartItem :OrderCartItem[]
    isloading:boolean
    error:Error | null
}