import BackofficeLayout from "@/components/BackOfficeLayout";
import Card from "@/components/Card";
import NewMenuCategoryDialoag from "@/components/NewMenuCategoryDialoag";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { hideSnackbar } from "@/store/slice/SnackBarSlice";

const MenuCategory = () => {
  let [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const menuCategories = useAppSelector(
    (state) => state.menuCategory.menusCategory
  );

  const disableMenuCategories = useAppSelector(
    (state) => state.disableMenuCategory.disableMenuCategories
  );
  const locationId = useAppSelector((state) => state.app.selectedLocation?.id);

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 5000);
  }, []);

  return (
    <>
      <NewMenuCategoryDialoag
        open={open}
        setOpen={setOpen}
      ></NewMenuCategoryDialoag>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {menuCategories.map((category) => {
          const isDisable = disableMenuCategories.find(
            (disableMenuCategory) =>
              disableMenuCategory.menuCategoryId === category.id &&
              disableMenuCategory.locationId === locationId
          )
            ? true
            : false;

          return (
            <Card
              key={category.id}
              id={category.id}
              icon={<MenuBookIcon />}
              name={category.name}
              path="menu-category"
              disable={isDisable}
            ></Card>
          );
        })}
      </Box>
    </>
  );
};

export default MenuCategory;
