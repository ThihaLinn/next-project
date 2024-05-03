import { disableMenuCategory } from "@/types/disableMenuCategory";
import { DisableMenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addDisableMenu } from "./DisableMenuSlice";


export const initialState:disableMenuCategory = {
    disableMenuCategories: [],
    isLoading:false,
    Error:null
}


export const disableMenuCategorySlice = createSlice({
    name:"disableMenuCategory",
    initialState,
    reducers:{
        setDisableMenuCategory:(state,action:PayloadAction<DisableMenuCategory[]>) => {
            state.disableMenuCategories = action.payload
        },
        addDisableMenuCategory:(state,action:PayloadAction<DisableMenuCategory>) => {
            state.disableMenuCategories = [...state.disableMenuCategories,action.payload]
        }
    }
})

export const {setDisableMenuCategory,addDisableMenuCategory} = disableMenuCategorySlice.actions

export default disableMenuCategorySlice.reducer