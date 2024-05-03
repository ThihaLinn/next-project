import SnackBar from "@/components/AppSnackBar";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface SnackBar {
    open:boolean
    message:string
    type:"success" | "error"
}

export const initialState:SnackBar = {
    open: false,
    message: "",
    type:"success"
    
}


export const appSnackBar = createSlice( {
    name:"snackbar",
    initialState,
    reducers:{
        showSnackBar:(state,action:PayloadAction<SnackBar>) =>{
            const {open,message,type} = action.payload
            state.open=open
            state.message=message
            state.type=type
        },
        hideSnackbar:(state) =>{
            state.open=false
            state.message=""
            state.type="success"
        }
    }
})

export const {hideSnackbar,showSnackBar} = appSnackBar.actions

export default appSnackBar.reducer