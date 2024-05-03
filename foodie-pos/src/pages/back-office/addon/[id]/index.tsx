import BackOfficeLayout from "@/components/BackOfficeLayout";
import DeleteDiloag from "@/components/DeleteDiloag";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import {
  deleteAddonCategory,
  updateAddonCategory,
} from "@/store/slice/AddonCategorySlice";
import { deleteAddon, setAddon, updateAddOn } from "@/store/slice/AddonSlice";
import { showSnackBar } from "@/store/slice/SnackBarSlice";
import { updateAddonParams } from "@/types/addon";
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
import { Addon } from "@prisma/client";
import { stat } from "fs";
import { useRouter } from "next/router";
import React, { useState } from "react";

const index = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const id = Number(router.query.id);

  const dispatch = useAppDispatch();

  const addonCategories = useAppSelector(
    (state) => state.addonCategory.addonCategories
  );
  const addons = useAppSelector((state) => state.addon.addons);
  const addon: any = addons.find((addon) => addon.id === id);

  console.log(addon);
  const [select, setSelect] = useState<number>(addon?.addOnCategoryId);
  const [updateAddon, setUpdateAddon] = useState<updateAddonParams>({
    id,
    name: addon?.name,
    price: addon?.price,
    addonCategoryId: addon?.addOnCategoryId,
  });

  console.log(updateAddon);

  const handleDelete = () => {
    dispatch(
      deleteAddon({
        id,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "success",
              message: "Delete addon successfully",
            })
          );
        },
      })
    );
    router.push("/back-office/addon");
  };

  const handleUpdate = () => {
    dispatch(
      updateAddOn({
        ...updateAddon,
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
    router.push("/back-office/addon");
  };

  return (
    <div>
      <>
        <DeleteDiloag
          open={open}
          content="addon"
          setOpen={setOpen}
          handleDelete={() => handleDelete()}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ width: "400px", mb: "10px" }}
            value={updateAddon.name}
            onChange={(e) =>
              setUpdateAddon({ ...updateAddon, name: e.target.value })
            }
          ></TextField>
          <TextField
            sx={{ width: "400px", mb: "10px" }}
            value={updateAddon.price}
            onChange={(e) =>
              setUpdateAddon({ ...updateAddon, price: Number(e.target.value) })
            }
          ></TextField>

          <Select
            sx={{ width: "400px", mb: "10px" }}
            value={select}
            onChange={(event) => {
              setUpdateAddon({
                ...updateAddon,
                addonCategoryId: Number(event.target.value),
              });
              setSelect(Number(event.target.value));
            }}
            input={<OutlinedInput label="Addon Categories" />}
            renderValue={() =>
              addonCategories.find((mc) => mc.id === select)?.name
            }
          >
            {addonCategories.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                <Checkbox checked={select === m.id} />
                <ListItemText primary={m.name} />
              </MenuItem>
            ))}
          </Select>
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
