import { OrderCartItemMenuAddon } from "@prisma/client"

export interface OrderCartItemMenuAddonSlice {
    orderCartItemMenuAddon :OrderCartItemMenuAddon[]
    isloading:boolean
    error:Error | null
}