import MenuItemCard from "@/components/MenuItemCard";
import OrderLayout from "@/components/OrderLayout";
import { useAppSelector } from "@/store/app/hook";
import { Box, Tab, Tabs } from "@mui/material";
import { Menu, Table } from "@prisma/client";
import React, { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/router";

const Order = () => {
  const router = useRouter();

  const tableId = Number(router.query.tableId);

  const [value, setValue] = useState(0);

  const menuCategories = useAppSelector(
    (state) => state.menuCategory.menusCategory
  );
  const menuCategoryMenus = useAppSelector(
    (state) => state.menuCategoryMenu.menuCategoryMenus
  );

  let menu = useAppSelector((state) => state.menu.menus);

  const [select, setSelect] = useState<Menu[]>([]);

  useEffect(() => {
    if (menuCategories) {
      renderMenus(menuCategories[0]?.id);
    }
  }, [menuCategories]);

  const renderMenus = (id: number) => {
    const menuIds = menuCategoryMenus
      .filter((mcm) => mcm.menuCategoryId === id)
      .map((mcm) => mcm.menuId);
    menu = menu.filter((menu) => menuIds.includes(menu.id));
    setSelect(menu);
  };

  return (
    <OrderLayout>
      <Box sx={{ width: "80%", mx: "auto", mt: "50px" }}>
        <Tabs
          value={value}
          onChange={(_, value) => {
            setValue(value);
          }}
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {menuCategories.map((item) => (
            <Tab
              key={item.id}
              label={item.name}
              sx={{ color: "#4C4C6D" }}
              onClick={() => {
                renderMenus(item.id);
              }}
            />
          ))}
        </Tabs>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {select.map((menu) => {
            return (
              <>
                <MenuItemCard
                  key={menu.id}
                  id={menu.id}
                  name={menu.name}
                  imgUrl={menu.imgUrl as string}
                  path={`menu?tableId=${tableId}&menuId=${menu.id}`}
                  price={menu.price}
                />
              </>
            );
          })}
        </Box>
        <Box
          onClick={() => {
            router.push(`/order/cart?tableId=${tableId}`);
          }}
        >
          <AddShoppingCartIcon
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
    </OrderLayout>
  );
};

export default Order;
