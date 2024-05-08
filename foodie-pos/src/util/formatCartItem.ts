import { OrderItem } from "@/types/order";
import {
  Addon,
  Menu,
  OrderCartItem,
  OrderCartItemMEnu,
  OrderCartItemMenuAddon,
} from "@prisma/client";

export const formatCartItem = (
  orderCartItem: OrderCartItem[],
  orderCartItemMenus: OrderCartItemMEnu[],
  orderCartItemMenuAddon: OrderCartItemMenuAddon[],
  menus: Menu[],
  addon: Addon[]
) => {
  const orderItems: OrderItem[] = [];

  for (let orderItem of orderCartItem) {
    const orderCartItemMenu = orderCartItemMenus.find(
      (orderCartItemMenu) =>
        orderCartItemMenu.orderCartItemItemId === orderItem.id
    );

    const menu = menus.find((menu) => menu.id === orderCartItemMenu?.menuId);

    const orderCartItemMenuAddons = orderCartItemMenuAddon.filter(
      (orderCartItemMenuAddon) =>
        orderCartItemMenuAddon.orderCartItemMEnuId === orderCartItemMenu?.id
    );

    const addons = addon.filter((addon) =>
      orderCartItemMenuAddons.map((addon) => addon.addonId).includes(addon.id)
    );

    orderItems.push({
        
      id: orderItem.itemId,
      menu: menu as Menu,
      addons,
      quantity: orderItem.quantity,
      status: orderItem.status,
    });
  }
  return orderItems;
};
