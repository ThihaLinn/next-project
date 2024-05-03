import { disableMenu } from "@/types/disableMenu";
import { DisableMenu, DisableMenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";


export const initialState:disableMenu = {
    disableMenus: [],
    isLoading:false,
    Error:null
}


export const disableMenuSlice = createSlice({
    name:"disableMenu",
    initialState,
    reducers:{
        setDisableMenu:(state,action:PayloadAction<DisableMenu[]>) => {
            state.disableMenus = action.payload
        },
        addDisableMenu:(state,action:PayloadAction<DisableMenu>) => {
            state.disableMenus = [...state.disableMenus,action.payload]
        }
    }
})

export const {setDisableMenu,addDisableMenu} = disableMenuSlice.actions

export default disableMenuSlice.reducer