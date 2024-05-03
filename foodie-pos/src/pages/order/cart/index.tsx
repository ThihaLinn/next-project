import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { cartItem } from "@/types/cartItem";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useRouter } from "next/router";
import { removeCartItem } from "@/store/slice/cartItemSlice";
import OrderLayout from "@/components/OrderLayout";
import { createOrder } from "@/store/slice/OrderSlice";
import { showSnackBar } from "@/store/slice/SnackBarSlice";

const index = () => {
  const cartItems = useAppSelector((state) => state.cartItem.cartItems);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const tableId = Number(router.query.tableId);

  const handleEdit = (menuId: number, cartItemId: string) => {
    router.push({
      pathname: `/order/menu`,
      query: {
        ...router.query,
        cartItemId: cartItemId,
        tableId: tableId,
        menuId: menuId,
      },
    });
  };

  const total = () => {
    const totalPrice = cartItems.reduce((acc, item) => {
      const totalMenuPrice = item.menu.price;
      const totalAddonPrice = item.addons.reduce((acc, addon) => {
        acc += addon.price;
        return acc;
      }, 0);
      acc += (totalMenuPrice + totalAddonPrice) * item.quantity;
      return acc;
    }, 0);
    return totalPrice;
  };

  const totalPrice = total();

  const handleDelete = (cartItem: cartItem) => {
    dispatch(removeCartItem(cartItem));
  };

  const handleOrder = () => {
    dispatch(
      createOrder({
        cartItems,
        tableId,
        totalPrice,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "success",
              message: "Add Order successfully",
            })
          );
        },
      })
    );
    router.push({
      pathname: `/order/active-order`,
      query: {
        ...router.query,
        tableId: tableId,
      },
    });
  };

  return (
    <OrderLayout>
      <Box sx={{ width: "80%", mx: "auto", mt: "50px" }}>
        {cartItems.map((cartItem: cartItem) => {
          const { menu, addons, quantity } = cartItem;

          return (
            <Box sx={{ display: "flex", mb: "10px", width: "100%" }}>
              <Box sx={{ width: "3%" }}>
                <Avatar
                  sx={{
                    width: 25,
                    height: 25,
                    mr: 1,
                    backgroundColor: "#1B9C85",
                  }}
                >
                  {quantity}
                </Avatar>
              </Box>
              <Box sx={{ width: "97%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography variant="h5">{menu.name}</Typography>
                  <Typography variant="h5">{menu.price}</Typography>
                </Box>
                <Box>
                  {addons.map((adddon) => {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Typography variant="h6">{adddon.name}</Typography>
                        <Typography variant="h6">{adddon.price}</Typography>
                      </Box>
                    );
                  })}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    color: "blue",
                  }}
                >
                  <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleEdit(cartItem.menu.id, cartItem.id)}
                  >
                    <EditIcon />
                  </Box>
                  <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleDelete(cartItem)}
                  >
                    <DeleteIcon />
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="h5">Total :</Typography>
          <Typography variant="h5">{totalPrice}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: "10px",
        }}
        onClick={() => handleOrder()}
      >
        <Button variant="contained">Confirm Order</Button>
      </Box>
    </OrderLayout>
  );
};

export default index;
