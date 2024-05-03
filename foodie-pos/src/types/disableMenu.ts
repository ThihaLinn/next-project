import { DisableMenu } from "@prisma/client"

export interface disableMenu{
    disableMenus : DisableMenu[]
    isLoading:Boolean
    Error:null 
}
