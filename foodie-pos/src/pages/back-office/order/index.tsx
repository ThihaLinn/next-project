import CardOrder from "@/components/CardOrder";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { updateOrder } from "@/store/slice/OrderSlice";
import { showSnackBar } from "@/store/slice/SnackBarSlice";
import { OrderItem } from "@/types/order";
import { formatCartItem } from "@/util/formatCartItem";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Menu, orderItemStatus } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const index = () => {
  const router = useRouter();

  const [value, setValue] = useState<orderItemStatus>(orderItemStatus.PENDING);

  //const orderItems: OrderItem[] = [];

  const orderCartItems = useAppSelector(
    (state) => state.orderCartItem.orderCartItem
  );

  const orderCartItemMenus = useAppSelector(
    (state) => state.odreCartItemMenu.orderCartItemMenu
  );

  const menus = useAppSelector((state) => state.menu.menus);

  const orderCartItemMenuAddon = useAppSelector(
    (state) => state.orderCartItemMenuAddon.orderCartItemMenuAddon
  );

  const addon = useAppSelector((state) => state.addon.addons);

  let orderItems = formatCartItem(
    orderCartItems,
    orderCartItemMenus,
    orderCartItemMenuAddon,
    menus,
    addon
  );

  const dispatch = useAppDispatch();

  const handdleOrderItemUpdate = (itemId: string, status: orderItemStatus) => {
    dispatch(
      updateOrder({
        itemId,
        status,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "success",
              message: "Update orderCartItem status successfully",
            })
          );
        },
      })
    );
  };

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ToggleButtonGroup
            color="primary"
            value={value}
            exclusive
            onChange={(evt, value) => {
              setValue(value);
            }}
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
            if (orderItem.status !== value) {
              return null;
            }
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
