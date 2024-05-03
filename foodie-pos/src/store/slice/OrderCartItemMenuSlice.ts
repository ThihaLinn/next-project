import { config } from "@/config";
import { OrderSlice, orderParam } from "@/types/order";
import { OrderCartItemMenuSlice } from "@/types/orderCartItemMenu";
import { OrderCartItemMEnu } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: OrderCartItemMenuSlice = {
  orderCartItemMenu: [],
  isloading: false,
  error: null,
};

export const orderCartItemMenuSlice = createSlice({
  name: "orderCartItemMenuSlice",
  initialState,
  reducers: {
    setOrderCartItemMenu: (state, action: PayloadAction<OrderCartItemMEnu[]>) => {
      state.orderCartItemMenu = action.payload;
    },
    addOrderCartItemMenu: (state, action: PayloadAction<OrderCartItemMEnu>) => {
      state.orderCartItemMenu.push(action.payload);
    },
  },
});

export const { addOrderCartItemMenu, setOrderCartItemMenu } =
  orderCartItemMenuSlice.actions;

export default orderCartItemMenuSlice.reducer;
