import CardOrder from "@/components/CardOrder";
import { useAppSelector } from "@/store/app/hook";
import { cartItem } from "@/types/cartItem";
import { OrderItem } from "@/types/order";
import { Box } from "@mui/material";
import { Menu } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();
  const tableId = Number(router.query.tableId);

  let [condition, setCondition] = useState<boolean>(true);

  //const orderItems: OrderItem[] = [];
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const orderCartItem = useAppSelector(
    (state) => state.orderCartItem.orderCartItem
  );

  console.log(orderCartItem);

  const orderCartItemMenus = useAppSelector(
    (state) => state.odreCartItemMenu.orderCartItemMenu
  );

  const menus = useAppSelector((state) => state.menu.menus);

  const orderCartItemMenuAddon = useAppSelector(
    (state) => state.orderCartItemMenuAddon.orderCartItemMenuAddon
  );

  const addon = useAppSelector((state) => state.addon.addons);

  useEffect(() => {
    for (let orderItem of orderCartItem) {
      console.log(orderItems.length);
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
  }, [orderCartItem]);

  console.log(orderItems);

  return (
    <Box sx={{ m: "10px", display: "flex", flexWrap: "wrap" }}>
      {orderItems.map((orderItem) => {
        return (
          <>
            <CardOrder
              key={orderItem.id}
              isAdmin={false}
              orderItem={orderItem}
              tableId={tableId}
            ></CardOrder>
          </>
        );
      })}
    </Box>
  );
};

export default index;
