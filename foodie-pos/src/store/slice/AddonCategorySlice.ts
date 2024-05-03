
import { config } from "@/config";
import { AddonCategorySlice, deleteAddonCategoryParam, newAddonCategoryParams, updateAddonCateogryParms } from "@/types/addonCategory";
import { AddOnCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMenuAddonCategory, setMenuAddonCategory } from "./MenuAddonCategorySlice";

const initialState:AddonCategorySlice = {
    addonCategories:[],
    isLoading:false,
    error:null
}


export const createAddonCategory = createAsyncThunk(
    "addonCategory/createAddonCategory",
    async (newAddonCategory:newAddonCategoryParams,thunkApi) => {
        const {onSuccess, ...payload} = newAddonCategory
        const response = await fetch(`${config.backofficeUrl}/addon-category`,{
            method:"POST",
            headers:{
                "content-type":"appliction/json"
            },
            body:JSON.stringify(payload)
        })

        const dataFromServer = await response.json()
        const {addonCategory,menuAddonCategories} = dataFromServer

        thunkApi.dispatch(addAddonCategory(addonCategory))
        thunkApi.dispatch(addMenuAddonCategory(menuAddonCategories))
    } 
)


export const deleteAddonCategory = createAsyncThunk(
    "locaion/deleteMenuAddonCategory",
    async (deleteAddonCategory:deleteAddonCategoryParam,thunkApi) => {        
        const {onSuccess,...payload} = deleteAddonCategory
        const response = await fetch(`${config.backofficeUrl}/addon-category?id=${payload.id}`,{
            method:"DELETE",
        })

        thunkApi.dispatch(removeAddonCategory(payload.id))
        onSuccess && onSuccess()
    }
)

export const updateAddonCategory = createAsyncThunk(
    "addonCategory/updateAddonCategory",
    async (updateAddonCategory:updateAddonCateogryParms,thunkApi) => {        
        const {onSuccess,...payload} = updateAddonCategory
        const response = await fetch(`${config.backofficeUrl}/addon-category`,{
            method:"PUT",
            headers:{
                "content-type":"appliction/json"
            }, 
            body:JSON.stringify(payload)
        })

        const dataFromServer = await response.json()
        const {menuAddonCategories,addonCategory} = dataFromServer
        thunkApi.dispatch(replaceAddonCateogry(addonCategory))
        thunkApi.dispatch(setMenuAddonCategory(menuAddonCategories))
        onSuccess && onSuccess()
        return addonCategory;
    }
)

const addOnCategorySlice = createSlice({
    name:"addonCategory",
    initialState,
    reducers:{
        setAddonCategories:(state,action:PayloadAction<AddOnCategory[]>) => {
            state.addonCategories = action.payload
        },
        addAddonCategory:(state,action:PayloadAction<AddOnCategory>) => {
            state.addonCategories = [...state.addonCategories,action.payload]
        },
        replaceAddonCateogry:(state,action:PayloadAction<AddOnCategory>) => {
            state.addonCategories = state.addonCategories.map(row => row.id===action.payload.id ? action.payload : row)
        },
        removeAddonCategory:(state,action:PayloadAction<number>) => {
            state.addonCategories = state.addonCategories.filter(row => row.id !== action.payload)
        }
    }
})

export const {setAddonCategories,addAddonCategory,removeAddonCategory,replaceAddonCateogry} = addOnCategorySlice.actions

export default addOnCategorySlice.reducer