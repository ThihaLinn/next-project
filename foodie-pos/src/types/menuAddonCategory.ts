import { MenuAddOnCategory } from "@prisma/client";


export interface MenuAddonCategorySlice  {

    menuAddonCategories:MenuAddOnCategory[],
    isloading:false,
    error:Error | null
    
}