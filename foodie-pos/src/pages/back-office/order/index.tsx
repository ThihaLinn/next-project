import CardOrder from "@/components/CardOrder";
import { useAppSelector } from "@/store/app/hook";
import { OrderItem } from "@/types/order";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Menu, orderItemStatus } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();

  const [value, setValue] = useState<orderItemStatus>(orderItemStatus.PENDING);

  //const orderItems: OrderItem[] = [];
  let [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  orderItems = orderItems.filter((orderItem) => orderItem.status === value);

  let orders = useAppSelector((state) => state.order.order);
  //orders.

  const order = orders[0];

  console.log(order);

  const orderCartItem = useAppSelector(
    (state) => state.orderCartItem.orderCartItem
  ).filter((orderCartItem) => orderCartItem.orderId === order?.id);

  console.log(orderCartItem);

  const orderCartItemMenus = useAppSelector(
    (state) => state.odreCartItemMenu.orderCartItemMenu
  );

  const menus = useAppSelector((state) => state.menu.menus);

  const orderCartItemMenuAddon = useAppSelector(
    (state) => state.orderCartItemMenuAddon.orderCartItemMenuAddon
  );

  const addon = useAppSelector((state) => state.addon.addons);

  if (order) {
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
  }

  console.log(orderItems);

  const handdleOrderItemUpdate = () => {
    
  }

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ToggleButtonGroup
            color="primary"
            value={value}
            exclusive
            onChange={(evt, value) => setValue(value)}
          >
            <ToggleButton value={orderItemStatus.PENDING}>
              {orderItemStatus.PENDING}
            </ToggleButton>
            <ToggleButton value={orderItemStatus.COOKING}>
              {orderItemStatus.COOKING}
            </ToggleButton>
            <ToggleButton value={orderItemStatus.READY}>
              {orderItemStatus.READY}
            </ToggleButton>
            <ToggleButton value={orderItemStatus.PAID}>
              {orderItemStatus.PAID}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          {orderItems.map((orderItem) => {
            return (
              <CardOrder
                key={orderItem.id}
                orderItem={orderItem}
                isAdmin
                handleOrderStatuUpdate={handdleOrderItemUpdate}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default index;
