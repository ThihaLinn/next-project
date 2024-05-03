import {  cartItem, cartItemSlice } from "@/types/cartItem";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";




export const initialState:cartItemSlice = {
    cartItems:[],
    isloading:false,
    error:null
}   


export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addCartItem:(state,action:PayloadAction<cartItem>) => {
            state.cartItems.push(action.payload)
        },
        removeCartItem:(state,action:PayloadAction<cartItem>) => {
            state.cartItems = state.cartItems.filter(ct => ct.id !== action.payload.id)
        },
        updateCartItem:(state,action:PayloadAction<cartItem>) => {
            
            
            state.cartItems = state.cartItems.map(ct => ct.id === action.payload.id ? action.payload : ct)
        }
    }
})

export const {addCartItem,removeCartItem,updateCartItem} = cartSlice.actions

export default cartSlice.reducer