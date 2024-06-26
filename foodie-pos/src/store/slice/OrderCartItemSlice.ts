import { config } from "@/config";
import { cartItem } from "../../types/cartItem";
import { OrderSlice, orderParam } from "@/types/order";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderCartItemSlice } from "@/types/orderCartItem";
import { Order, OrderCartItem } from "@prisma/client";

const initialState: OrderCartItemSlice = {
  orderCartItem: [],
  isloading: false,
  error: null,
};

export const orderCartItemSlice = createSlice({
  name: "orderCartItemSlice",
  initialState,
  reducers: {
    setOrderCartItem: (state, action: PayloadAction<OrderCartItem[]>) => {
      state.orderCartItem = action.payload;
    },
    addOrderCartItem: (state, action: PayloadAction<OrderCartItem[]>) => {
      action.payload.map((orderCartItem) =>
        state.orderCartItem.push(orderCartItem)
      );
    },
    updateOrderCartIem: (state, action: PayloadAction<OrderCartItem>) => {
      state.orderCartItem = state.orderCartItem.map((orderCartItem) =>
        orderCartItem.id === action.payload.id ? action.payload : orderCartItem
      );
    },
  },
});

export const { addOrderCartItem, setOrderCartItem, updateOrderCartIem } =
  orderCartItemSlice.actions;

export default orderCartItemSlice.reducer;
