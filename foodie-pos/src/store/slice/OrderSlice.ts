import { cartItem } from "@/types/cartItem";
import { config } from "@/config";
import { OrderSlice, orderParam, updateOrderParam } from "@/types/order";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order } from "@prisma/client";
import { stat } from "fs";
import { addOrderCartItemMenu } from "./OrderCartItemMenuSlice";
import { addOrderCartItemMenuAddon } from "./OrderCartItemMenuAddonSlice";
import { addOrderCartItem, updateOrderCartIem } from "./OrderCartItemSlice";
import { act } from "react-dom/test-utils";

const initialState: OrderSlice = {
  order: [],
  isloading: false,
  error: null,
};

export const updateOrder = createAsyncThunk(
  "order/createOrder",
  async (updateOrder: updateOrderParam, thunkApi) => {
    const { onSuccess, ...payload } = updateOrder;
    const response = await fetch(`${config.orderApiUrl}/order`, {
      method: "PUT",
      headers: {
        "content-type": "appliction/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { cartItem, order } = dataFromServer;

    thunkApi.dispatch(updateOrderCartIem(cartItem));
    thunkApi.dispatch(updataOrder(order));
    return order;
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (newOrder: orderParam, thunkApi) => {
    const { onSuccess, ...payload } = newOrder;
    const response = await fetch(`${config.orderApiUrl}/order`, {
      method: "POST",
      headers: {
        "content-type": "appliction/json",
      },
      body: JSON.stringify(payload),
    });

    const dataFromServer = await response.json();
    const { order, orderCartItem, orderCartItemMenu, orderCartItemMenuAddon } =
      dataFromServer;

    thunkApi.dispatch(setOrder(order));
    thunkApi.dispatch(addOrderCartItem(orderCartItem));
    thunkApi.dispatch(addOrderCartItemMenu(orderCartItemMenu));
    thunkApi.dispatch(addOrderCartItemMenuAddon(orderCartItemMenuAddon));

    onSuccess && onSuccess();

    return order;
  }
);

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order[]>) => {
      state.order = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.order.push(action.payload);
    },
    updataOrder: (state, action: PayloadAction<Order>) => {
      state.order = state.order.map((order) =>
        order.id === action.payload.id ? action.payload : order
      );
    },
  },
});

export const { setOrder, addOrder, updataOrder } = orderSlice.actions;

export default orderSlice.reducer;
