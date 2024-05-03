import BackofficeLayout from "@/components/BackOfficeLayout";
import Card from "@/components/Card";
import NewMenuDialoag from "@/components/NewMenuDialoag";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { Box } from "@mui/material";
import React, { useState } from "react";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MenuItemCard from "@/components/MenuItemCard";

const Menu = () => {
  let [open, setOpen] = useState(false);

  const menus = useAppSelector((state) => state.menu.menus);
  const disableMenus = useAppSelector(
    (state) => state.disableMenu.disableMenus
  );
  const locationId = useAppSelector(
    (state) => state.app.selectedLocation?.id
  ) as number;

  console.log

  return (
    <>
      <NewMenuDialoag open={open} setOpen={setOpen}></NewMenuDialoag>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mx: "auto",
        }}
      >
        {menus.map((menu) => {
          const isDisable = disableMenus.find(
            (disableMenu) =>
              disableMenu.menuId === menu.id &&
              disableMenu.locationId === locationId
          )
            ? true
            : false;

          return (
            <MenuItemCard
              key={menu.id}
              id={menu.id}
              icon={<RestaurantMenuIcon />}
              name={menu.name}
              path="menu"
              disable={isDisable}
              imgUrl={menu.imgUrl as string}
              price={menu.price}
            ></MenuItemCard>
          );
        })}
      </Box>
    </>
  );
};

export default Menu;
