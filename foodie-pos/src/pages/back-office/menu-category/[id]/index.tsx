import BackOfficeLayout from "@/components/BackOfficeLayout";
import DeleteDiloag from "@/components/DeleteDiloag";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import {
  deleteMenuCategory,
  updateMenuCategory,
} from "@/store/slice/MenuCategorySlice";
import { showSnackBar } from "@/store/slice/SnackBarSlice";
import { UpdateMenCategoryParam } from "@/types/menuCategory";
import { prisma } from "@/util/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { log } from "console";
import { stat } from "fs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  const dispatch = useAppDispatch();
  const menucategories = useAppSelector(
    (state) => state.menuCategory.menusCategory
  );
  const category = menucategories.find((c) => c.id == id);

  //LocationId
  const locationId: any = useAppSelector(
    (state) => state.app.selectedLocation?.id
  );

  //Disable
  const disableMenucategories = useAppSelector(
    (state) => state.disableMenuCategory.disableMenuCategories
  );

  let disable: any = disableMenucategories.find(
    (dmc) =>
      dmc.locationId === locationId && dmc.menuCategoryId === category?.id
  )
    ? true
    : false;

  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<UpdateMenCategoryParam>({
    name: category?.name as string,
    id,
    locationId,
    disable,
  });

  useEffect(() => {
    if (category) {
      setData({
        id,
        name: category.name,
        locationId,
        disable,
      });
    }
  }, [category]);

  console.log(data);

  const handleUpdate = () => {
    if (data.name === category?.name && data.disable === disable) {
      router.push("/back-office/menu-category");
    } else {
      dispatch(
        updateMenuCategory({
          ...data,
          onSuccess: () => {
            dispatch(
              showSnackBar({
                open: true,
                type: "success",
                message: "Update menu-category successfully",
              })
            );
          },
        })
      );
      router.push("/back-office/menu-category");
    }
  };

  const handleDelete = () => {
    dispatch(
      deleteMenuCategory({
        id,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "success",
              message: "Delete menu-category successfully",
            })
          );
        },
      })
    );
    router.push("/back-office/menu-category");
  };

  return (
    <>
      <>
        <DeleteDiloag
          open={open}
          content="menu-category"
          setOpen={setOpen}
          handleDelete={() => handleDelete()}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ width: "300px" }}
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          ></TextField>
          <FormControlLabel
            control={<Checkbox checked={data.disable} />}
            label="Disable"
            onChange={(e, value) => {
              setData({ ...data, disable: value });
              console.log("useState", data.disable);
              console.log("checkBox", value);
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
