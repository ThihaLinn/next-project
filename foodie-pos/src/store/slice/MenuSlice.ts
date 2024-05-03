import { disableMenu } from './../../types/disableMenu';
import { config } from "@/config"
import { NewMenuParams, UpdateMenuParms, deleteMenuParams } from "@/types/menu"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addMenuCategoryMenu, setMenuCategoryMenu } from './MenuCategoryMenu';
import { Menu } from "@prisma/client";
import { addDisableMenu, setDisableMenu } from './DisableMenuSlice';


export interface MenuSlice{
    menus:Menu[],
    isloading:boolean,
    error:Error | null
}

const initialState:MenuSlice ={
    menus:[], 
    isloading:false,
    error:null
}

export const createMenu = createAsyncThunk(
    "menu/createMenu",
    async (newMenu:NewMenuParams,thunkApi) => {
        const {onSuccess,...payload} = newMenu
        const response = await fetch(`${config.backofficeUrl}/menu`,{
            method:"POST",
            headers:{
                "content-type":"appliction/json"
            },
            body:JSON.stringify(payload)
        })

        const dataFromServer = await response.json()
        const {menu,menuCategoryMenu,disableMenu} = dataFromServer
        thunkApi.dispatch(addMenu(menu))
        thunkApi.dispatch(addMenuCategoryMenu(menuCategoryMenu))
        disableMenu && thunkApi.dispatch(addDisableMenu(disableMenu))
        onSuccess && onSuccess()
        return menu;
    }
)

export const updateMenu = createAsyncThunk(
    "menuCategory/updateMenu",
    async (updateMenu:UpdateMenuParms,thunkApi) => {        
        const {onSuccess,...payload} = updateMenu
        const response = await fetch(`${config.backofficeUrl}/menu`,{
            method:"PUT",
            headers:{
                "content-type":"appliction/json"
            },
            body:JSON.stringify(payload)
        })

        const dataFromServer = await response.json()
        const {menu,disableMenus,menuCategoryMenu} = dataFromServer
        thunkApi.dispatch(replaceMenu(menu))
        menuCategoryMenu && thunkApi.dispatch(setMenuCategoryMenu(menuCategoryMenu))
        disableMenus && thunkApi.dispatch(setDisableMenu(disableMenus))
        onSuccess && onSuccess()
        return menu;
    }
)

export const deleteMenu = createAsyncThunk(
    "locaion/deleteMenu",
    async (deleteMenu:deleteMenuParams,thunkApi) => {        
        const {onSuccess,...payload} = deleteMenu
        const response = await fetch(`${config.backofficeUrl}/menu?id=${payload.id}`,{
            method:"DELETE",
        })

        thunkApi.dispatch(removeMenu(payload.id))
        onSuccess && onSuccess()
    }
)


export const menuSlice = createSlice({
    name:"menu",
    initialState,
    reducers:{
        setMenu:(state,action:PayloadAction<Menu[]>) => {
            state.menus=action.payload
        },
        addMenu:(state,action:PayloadAction<Menu>) => {
            state.menus=[...state.menus,action.payload]
        },
        removeMenu:(state,action:PayloadAction<number>) =>{
           state.menus = state.menus.filter(menu => menu.id != action.payload)
        },
        replaceMenu(state,action:PayloadAction<Menu>){
            state.menus =  state.menus.map(c => c.id === action.payload.id ? action.payload : c)
        }
    },
    extraReducers:(builder) => {
        builder.addCase(createMenu.pending,(state,action) => {
            state.isloading = true
        })
        .addCase(createMenu.fulfilled,(state,atcion) => {
            state.isloading = false
        })
         .addCase(createMenu.rejected,(state,atcion) => {
            state.isloading = false
        })
    }
})

export const {setMenu,addMenu,removeMenu,replaceMenu} = menuSlice.actions

export default menuSlice.reducer