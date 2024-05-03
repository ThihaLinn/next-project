import BackOfficeLayout from "@/components/BackOfficeLayout";
import DeleteDiloag from "@/components/DeleteDiloag";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import {
  deleteAddonCategory,
  updateAddonCategory,
} from "@/store/slice/AddonCategorySlice";
import { showSnackBar } from "@/store/slice/SnackBarSlice";
import { updateAddonCateogryParms } from "@/types/addonCategory";
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
import { useRouter } from "next/router";
import React, { useState } from "react";

const index = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const id = Number(router.query.id);

  const dispatch = useAppDispatch();

  const { addonCategories } = useAppSelector((state) => state.addonCategory);

  const originalAddonCategory = addonCategories.find((row) => row.id === id);

  const { menuAddonCategories } = useAppSelector(
    (state) => state.menuAddonCategory
  );

  const menuAddonCategory = menuAddonCategories.filter(
    (row) => row.addOnCategoryId === id
  );

  console.log(menuAddonCategory);

  const menus = useAppSelector((state) => state.menu.menus);

  const menuIds: any = menuAddonCategory.map((row) => row.menuId);

  const [select, setSelect] = useState<number[]>(menuIds);
  const [addonCategory, setAddonCategory] = useState<updateAddonCateogryParms>({
    id,
    name: originalAddonCategory?.name as string,
    isRequired: originalAddonCategory?.isRequired as boolean,
    menuIds: menuIds as [],
  });

  console.log(addonCategory);

  const handleDelete = () => {
    dispatch(
      deleteAddonCategory({
        id,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "success",
              message: "Delete addon-category successfully",
            })
          );
        },
      })
    );
    router.push("/back-office/addon-category");
  };

  const handleUpdate = () => {
    dispatch(
      updateAddonCategory({
        ...addonCategory,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "success",
              message: "Update addon-category successfully",
            })
          );
        },
      })
    );
    router.push("/back-office/addon-category");
  };

  return (
    <div>
      <>
        <DeleteDiloag
          open={open}
          content="addon-category"
          setOpen={setOpen}
          handleDelete={() => handleDelete()}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ width: "400px", mb: "10px" }}
            value={addonCategory.name}
            onChange={(e) =>
              setAddonCategory({ ...addonCategory, name: e.target.value })
            }
          ></TextField>

          <Select
            sx={{ width: "400px", mb: "10px" }}
            multiple
            value={select}
            onChange={(event) => {
              setAddonCategory({
                ...addonCategory,
                menuIds: event.target.value as [],
              });
              setSelect(event.target.value as []);
            }}
            input={<OutlinedInput label="Addon Categories" />}
            renderValue={() =>
              select
                .map((id) => menus.find((m) => m.id === id))
                .map((c) => c?.name)
                .join(", ")
            }
          >
            {menus.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                <Checkbox checked={select.includes(m.id)} />
                <ListItemText primary={m.name} />
              </MenuItem>
            ))}
          </Select>
          <FormControlLabel
            control={<Checkbox checked={addonCategory.isRequired} />}
            label="is Required"
            onChange={(e, value) => {
              setAddonCategory({ ...addonCategory, isRequired: value });
              console.log(addonCategory.isRequired);
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
    </div>
  );
};

export default index;
