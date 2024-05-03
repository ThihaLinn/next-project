import BackOfficeLayout from "@/components/BackOfficeLayout";
import DeleteDiloag from "@/components/DeleteDiloag";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { deleteMenu, updateMenu } from "@/store/slice/MenuSlice";
import { showSnackBar } from "@/store/slice/SnackBarSlice";
import { UpdateMenuParms } from "@/types/menu";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { log } from "console";
import { stat } from "fs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  const locationId = useAppSelector((state) => state.app.selectedLocation?.id);
  const disableMenu = useAppSelector((state) => state.disableMenu.disableMenus);
  const menuCateogries = useAppSelector(
    (state) => state.menuCategory.menusCategory
  );
  const originalMenu = useAppSelector((state) => state.menu.menus).find(
    (item) => item.id === id
  );

  let disable: any = disableMenu.find(
    (dmc) => dmc.locationId === locationId && dmc.menuId === id
  )
    ? true
    : false;

  const menuCategoryMenu = useAppSelector(
    (state) => state.menuCategoryMenu.menuCategoryMenus
  );

  const menuCategory = menuCategoryMenu.filter((row) => row.menuId === id);
  const menuCategoryIds = menuCategory.map(
    (row) => row.menuCategoryId
  ) as number[];

  const [select, setSelected] = useState<number[]>(menuCategoryIds);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<UpdateMenuParms>({
    id,
    name: originalMenu?.name as string,
    price: originalMenu?.price as number,
    locationId: locationId as number,
    disable,
    menuCategoryIds: menuCategoryIds as [],
  });

  useEffect(() => {
    if (originalMenu) {
      setMenu({
        id,
        name: originalMenu?.name as string,
        price: originalMenu?.price as number,
        locationId: locationId as number,
        disable,
        menuCategoryIds: menuCategoryIds as [],
      });
      setSelected(menuCategoryIds);
    }
  }, [originalMenu]);

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(
      deleteMenu({
        id,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "success",
              message: "Delete menu successfully",
            })
          );
        },
      })
    );
    router.push("/back-office/menu");
  };

  const handleUpdate = () => {
    dispatch(
      updateMenu({
        ...menu,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              message: "Update Menu Successfully",
              open: true,
              type: "success",
            })
          );
        },
      })
    );
    router.push("/back-office/menu");
  };

  return (
    <>
      <>
        <DeleteDiloag
          open={open}
          content="menu"
          setOpen={setOpen}
          handleDelete={() => handleDelete()}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ width: "400px", mb: "10px" }}
            value={menu.name}
            onChange={(e) => setMenu({ ...menu, name: e.target.value })}
          ></TextField>
          <TextField
            sx={{ width: "400px", mb: "10px" }}
            value={menu.price}
            onChange={(e) =>
              setMenu({ ...menu, price: Number(e.target.value) })
            }
          ></TextField>
          <Select
            sx={{ width: "400px", mb: "10px" }}
            multiple
            value={menu.menuCategoryIds}
            onChange={(event) => {
              setMenu({
                ...menu,
                menuCategoryIds: event.target.value as [],
              });
              setSelected(event.target.value as []);
            }}
            input={<OutlinedInput label="Menu Categories" />}
            renderValue={() =>
              select
                .map((id) => menuCateogries.find((mc) => mc.id === id))
                .map((c) => c?.name)
                .join(", ")
            }
          >
            {menuCateogries.map((mc) => (
              <MenuItem key={mc.id} value={mc.id}>
                <Checkbox checked={select.includes(mc.id)} />
                <ListItemText primary={mc.name} />
              </MenuItem>
            ))}
          </Select>
          <FormControlLabel
            control={<Checkbox checked={menu.disable} />}
            label="Disable"
            onChange={(e, value) => {
              setMenu({ ...menu, disable: value });
            }}
          />
          <Button
            variant="contained"
            sx={{ width: "100px" }}
            onClick={() => handleUpdate()}
          >
            Update
          </Button>
        </Box>
      </>
    </>
  );
};

export default index;
