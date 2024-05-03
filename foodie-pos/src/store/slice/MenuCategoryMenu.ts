import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {  MenuCategoryMenu } from '@prisma/client';
import { act } from 'react-dom/test-utils';
import { addMenuCategory } from './MenuCategorySlice';

export interface MenuCategoryMenuSlice{
    menuCategoryMenus:MenuCategoryMenu[],
    isloading:boolean,
    error:Error | null
}

const initialState:MenuCategoryMenuSlice ={
  menuCategoryMenus:[], 
    isloading:false,
    error:null
}

export const menuCategoryMenuSlice = createSlice({
    name:"menuCategoryMenu",
    initialState,
    reducers:{
      setMenuCategoryMenu:(state,action:PayloadAction<MenuCategoryMenu[]>) => {
        state.menuCategoryMenus = action.payload
      },
      addMenuCategoryMenu: (state,action:PayloadAction<MenuCategoryMenu[]>) => {
        state.menuCategoryMenus = [ ...state.menuCategoryMenus,...action.payload]
      }
    },
    
}) 

export const {setMenuCategoryMenu,addMenuCategoryMenu} = menuCategoryMenuSlice.actions

export default menuCategoryMenuSlice.reducer