import { DisableMenuCategory } from "@prisma/client"

export interface disableMenuCategory{
    disableMenuCategories: DisableMenuCategory[]
    isLoading:Boolean
    Error:null 
}
