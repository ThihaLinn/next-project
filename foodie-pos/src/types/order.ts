import { cartItem } from "@/types/cartItem";
import { Order, orderItemStatus } from "@prisma/client";
import { baseOption } from "./menu";

export interface OrderSlice {
  order: Order[];
  isloading: boolean;
  error: null | Error;
}

export interface orderParam extends baseOption {
  tableId: number;
  cartItems: cartItem[];
  totalPrice: number;
}

export interface OrderItem extends cartItem {
  status: orderItemStatus;
}

export interface updateOrderParam extends baseOption {
  itemId: string;
  status: orderItemStatus;
}
