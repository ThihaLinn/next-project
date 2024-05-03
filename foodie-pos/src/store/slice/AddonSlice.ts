
import { config } from "@/config";
import { AddonCategorySlice, deleteAddonCategoryParam, newAddonCategoryParams, updateAddonCateogryParms } from "@/types/addonCategory";
import {  AddOnCategory, Addon } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMenuAddonCategory, setMenuAddonCategory } from "./MenuAddonCategorySlice";
import { AddonSlice, deleteAddonParams, newAddonParams, updateAddonParams } from "@/types/addon";

const initialState:AddonSlice = {
    addons:[],
    loading:false,
    error:null
}

export const createAddon = createAsyncThunk(
    "addon/createAddon",
    async (newAddon:newAddonParams,thunkApi) => {
        const {onSuccess, ...payload} = newAddon
        const response = await fetch(`${config.backofficeUrl}/addon`,{
            method:"POST",
            headers:{
                "content-type":"appliction/json"
            },
            body:JSON.stringify(payload)
        })

        const dataFromServer = await response.json()
        const {addon} = dataFromServer

        thunkApi.dispatch(addAddon(addon))
    } 
)



export const deleteAddon = createAsyncThunk(
    "addon/deleteAddon",
    async (deleteAddon:deleteAddonParams,thunkApi) => {        
        const {onSuccess,...payload} = deleteAddon
        const response = await fetch(`${config.backofficeUrl}/addon?id=${payload.id}`,{
            method:"DELETE",
        })

        thunkApi.dispatch(removeAddon(payload.id))
        onSuccess && onSuccess()
    }
)

export const updateAddOn = createAsyncThunk(
    "addon/updateAddon",
    async (updateAddon:updateAddonParams,thunkApi) => {        
        const {onSuccess,...payload} = updateAddon
        const response = await fetch(`${config.backofficeUrl}/addon`,{
            method:"PUT",
            headers:{
                "content-type":"appliction/json"
            }, 
            body:JSON.stringify(payload)
        })

        const dataFromServer = await response.json()
        const {addon} = dataFromServer

        thunkApi.dispatch(replaceAddon(addon))
        onSuccess && onSuccess()
        return addon;
    }
)

const addonSlice = createSlice({
    name:"addon",
    initialState,
    reducers:{
        setAddon:(state,action:PayloadAction<Addon[]>) => {
            state.addons = action.payload
        },
        addAddon:(state,action:PayloadAction<Addon>) => {
            state.addons = [...state.addons,action.payload]
        },
        replaceAddon:(state,action:PayloadAction<Addon>) => {
            state.addons = state.addons.map(row => row.id===action.payload.id ? action.payload : row)
        },
        removeAddon:(state,action:PayloadAction<number>) => {
            state.addons = state.addons.filter(row => row.id !== action.payload)
        }
    }
})

export const {setAddon,addAddon,removeAddon,replaceAddon} = addonSlice.actions

export default addonSlice.reducer