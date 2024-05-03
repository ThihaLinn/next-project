import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderCartItemMenuAddonSlice } from "@/types/orderCartItemMenuAddon";
import { OrderCartItemMenuAddon } from "@prisma/client";

const initialState: OrderCartItemMenuAddonSlice = {
  orderCartItemMenuAddon: [],
  isloading: false,
  error: null,
};

export const orderCartItemMenuAddonSlice = createSlice({
  name: "orderCartItemMenuAddonSlice",
  initialState,
  reducers: {
    setOrderCartItemMenuAddon: (
      state,
      action: PayloadAction<OrderCartItemMenuAddon[]>
    ) => {
      state.orderCartItemMenuAddon = action.payload;
    },
    addOrderCartItemMenuAddon: (
      state,
      action: PayloadAction<OrderCartItemMenuAddon>
    ) => {
      state.orderCartItemMenuAddon.push(action.payload);
    },
  },
});

export const {addOrderCartItemMenuAddon,setOrderCartItemMenuAddon} = orderCartItemMenuAddonSlice.actions;

export default orderCartItemMenuAddonSlice.reducer;
