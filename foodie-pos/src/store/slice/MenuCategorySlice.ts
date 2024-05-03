import { disableMenuCategory } from './../../types/disableMenuCategory';
import { config } from "@/config"
import { deleteLocationParam } from "@/types/Location"
import { NewMenuCategoryParam, UpdateMenCategoryParam, deleteMenuCategoryParam } from "@/types/menuCategory"
import { MenuCategory } from "@prisma/client"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDisableMenuCategory, setDisableMenuCategory } from './DisableMenuCategorySlice';



export interface MenuSlice{
    menusCategory:MenuCategory[],
    isloading:false,
    error:Error | null
}

const initialState:MenuSlice ={
    menusCategory:[], 
    isloading:false,
    error:null
}

export const createMenuCategory = createAsyncThunk(
    "menuCategory/createMenuCategory",
    async (newMenuCategory:NewMenuCategoryParam,thunkApi) => {
        console.log(newMenuCategory)
        const {onSuccess,...payload} = newMenuCategory
        const response = await fetch(`${config.backofficeUrl}/menu-category`,{
            method:"POST",
            headers:{
                "content-type":"appliction/json"
            },
            body:JSON.stringify(payload)
        })

        const dataFromServer = await response.json()
        const {menuCategory,disableMenuCategory} = dataFromServer
        thunkApi.dispatch(addMenuCategory(menuCategory))
        thunkApi.dispatch(addDisableMenuCategory(disableMenuCategory))
        onSuccess && onSuccess()
        return menuCategory;
    }
)

export const updateMenuCategory = createAsyncThunk(
    "menuCategory/updateMenuCategory",
    async (updateMenu:UpdateMenCategoryParam,thunkApi) => {        
        const {onSuccess,...payload} = updateMenu
        const response = await fetch(`${config.backofficeUrl}/menu-category`,{
            method:"PUT",
            headers:{
                "content-type":"appliction/json"
            },
            body:JSON.stringify(payload)
        })

        const dataFromServer = await response.json()
        const {menuCategory,disableMenuCategories} = dataFromServer
        thunkApi.dispatch(replaceCategry(menuCategory))
        disableMenuCategories && thunkApi.dispatch(setDisableMenuCategory(disableMenuCategories))
        onSuccess && onSuccess()
        return menuCategory;
    }
)


export const deleteMenuCategory = createAsyncThunk(
    "locaion/deleteMenuCategory",
    async (deleteMenuCategory:deleteMenuCategoryParam,thunkApi) => {        
        const {onSuccess,...payload} = deleteMenuCategory
        const response = await fetch(`${config.backofficeUrl}/menu-category?id=${payload.id}`,{
            method:"DELETE",
        })

        thunkApi.dispatch(removeMenuCategory(payload.id))
        onSuccess && onSuccess()
        return location;
    }
)

export const menuCategorySlice = createSlice({
    name:"menu",
    initialState,
    reducers:{
        setMenuCategory:(state,action:PayloadAction<MenuCategory[]>) => {
            state.menusCategory=action.payload
        },
        addMenuCategory:(state,action:PayloadAction<MenuCategory>) => {
            state.menusCategory=[...state.menusCategory,action.payload]
        },
        replaceCategry(state,action:PayloadAction<MenuCategory>){
            state.menusCategory =  state.menusCategory.map(c => c.id === action.payload.id ? action.payload : c)
        }
        ,
        removeMenuCategory:(state,action:PayloadAction<number>) =>{
           state.menusCategory = state.menusCategory.filter(menusCategory => menusCategory.id != action.payload)
        }
    },
    extraReducers:(builder) => {
    
    }
})

export const {setMenuCategory,addMenuCategory,removeMenuCategory,replaceCategry} = menuCategorySlice.actions

export default menuCategorySlice.reducer

