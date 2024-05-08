import CardOrder from "@/components/CardOrder";
import { useAppSelector } from "@/store/app/hook";
import { cartItem } from "@/types/cartItem";
import { OrderItem } from "@/types/order";
import { formatCartItem } from "@/util/formatCartItem";
import { Box } from "@mui/material";
import { Menu } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();
  const tableId = Number(router.query.tableId);

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

  const orderItems = formatCartItem(
    orderCartItem,
    orderCartItemMenus,
    orderCartItemMenuAddon,
    menus,
    addon
  );

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
