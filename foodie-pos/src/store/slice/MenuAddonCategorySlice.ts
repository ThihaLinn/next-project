import { MenuAddOnCategory } from '@prisma/client';
import { MenuAddonCategorySlice } from "@/types/menuAddonCategory";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { act } from 'react-dom/test-utils';

 const initialState : MenuAddonCategorySlice = {
   menuAddonCategories: [],
   isloading:false,
   error:null
}


export const menuAddonCategorySlice = createSlice({
    name:"disableMenuCategory",
    initialState,
    reducers:{
       setMenuAddonCategory:(state,action:PayloadAction<MenuAddOnCategory[]>) => {
            state.menuAddonCategories = action.payload
       },
       addMenuAddonCategory:(state,action:PayloadAction<MenuAddOnCategory>) => {
            state.menuAddonCategories = [...state.menuAddonCategories,action.payload]
       }
    }
})

export const {setMenuAddonCategory,addMenuAddonCategory} = menuAddonCategorySlice.actions

export default menuAddonCategorySlice.reducer