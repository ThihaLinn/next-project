import { useAppSelector } from "@/store/app/hook";
import { addAddonCategory } from "@/store/slice/AddonCategorySlice";
import { setAddon } from "@/store/slice/AddonSlice";
import { cartItem } from "@/types/cartItem";
import { OrderItem } from "@/types/order";
import {
  Box,
  Card,
  Divider,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { AddOnCategory, Menu, orderItemStatus } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Props {
  tableId?: number;
  orderItem: OrderItem;
  isAdmin: boolean;
  handleOrderStatuUpdate?: (itemId: string, status: orderItemStatus) => void;
}

const CardOrder = ({
  isAdmin,
  orderItem,
  tableId,
  handleOrderStatuUpdate,
}: Props) => {
  let addonCategories = useAppSelector(
    (state) => state.addonCategory.addonCategories
  );

  const addonCategoryIds = orderItem.addons.map(
    (addon) => addon.addOnCategoryId
  );
  addonCategories = addonCategories.filter((addAddonCategory) =>
    addonCategoryIds.includes(addAddonCategory.id)
  );

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 280,
          height: 280,
          mt: 2,
          mr: 2,
        }}
      >
        <Box
          sx={{
            height: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#4C4C6D",
            color: "white",
            px: 1,
          }}
        >
          <Typography>{orderItem.menu.name}</Typography>
          <Typography>{tableId}</Typography>
        </Box>
        <Box sx={{ px: 2 }}>
          <Box
            sx={{
              height: 250 * 0.15,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid lightgray",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>Item Id: </Typography>
            <Typography>{orderItem.id}</Typography>
          </Box>
          <Box sx={{ height: 250 * 0.6, overflow: "scroll" }}>
            {orderItem.addons.length > 0 ? (
              <Box sx={{ mb: 2 }}>
                {addonCategories.map((addonCategory) => {
                  return (
                    <Box key={addonCategory.id}>
                      <Typography>{addonCategory.name}</Typography>
                      {orderItem.addons
                        .filter(
                          (addon) => addon.addOnCategoryId === addonCategory.id
                        )
                        .map((addon) => {
                          return (
                            <Typography
                              key={addon.id}
                              sx={{
                                fontSize: 14,
                                ml: 2,
                                fontStyle: "italic",
                                fontWeight: "bold",
                              }}
                            >
                              {addon.name}
                            </Typography>
                          );
                        })}
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography>No addon</Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              height: 250 * 0.23,
              borderTop: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>Status: </Typography>
            {isAdmin ? (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Select
                  value={orderItem.status}
                  onChange={(evt) =>
                    handleOrderStatuUpdate &&
                    handleOrderStatuUpdate(
                      orderItem.id,
                      evt.target.value as orderItemStatus
                    )
                  }
                  sx={{ maxHeight: 30 }}
                >
                  <MenuItem value={orderItemStatus.PENDING}>
                    {orderItemStatus.PENDING}
                  </MenuItem>
                  <MenuItem value={orderItemStatus.COOKING}>
                    {orderItemStatus.COOKING}
                  </MenuItem>
                  <MenuItem value={orderItemStatus.READY}>
                    {orderItemStatus.READY}
                  </MenuItem>
                  <MenuItem value={orderItemStatus.PAID}>
                    {orderItemStatus.PAID}
                  </MenuItem>
                </Select>
              </Box>
            ) : (
              <Typography>{orderItem.status}</Typography>
            )}
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default CardOrder;
