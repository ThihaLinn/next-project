import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { createAddonCategory } from "@/store/slice/AddonCategorySlice";
import { hideSnackbar, showSnackBar } from "@/store/slice/SnackBarSlice";
import { newAddonCategoryParams } from "@/types/addonCategory";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Menu } from "@prisma/client";
import React, { useEffect, useState } from "react";

const NewAddonCategoryDialoag = () => {
  const [open, setOpen] = useState<boolean>(false);
  let [select, setSelect] = useState<number[]>([]);
  let [addonCategory, setAddonCategory] = useState<newAddonCategoryParams>({
    name: "",
    isRequired: true,
    menuIds: [],
  });
  const menus = useAppSelector((state) => state.menu.menus);
  const isLoading = useAppSelector((state) => state.menu.isloading);
  const dispatch = useAppDispatch();

  console.log(addonCategory);

  const handleAddonCategory = () => {
    setOpen(false);
    dispatch(
      createAddonCategory({
        ...addonCategory,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              message: "Create Addon-Category Successfully.",
              open: true,
              type: "success",
            })
          );
        },
      })
    );
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 5000);
  }, [open]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Addon-Category
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add AddonCategory"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <Box
            sx={{
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "280px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={(e) =>
                setAddonCategory({ ...addonCategory, name: e.target.value })
              }
            />

            <FormControl sx={{}}>
              <InputLabel id="demo-multiple-checkbox-label">Menus</InputLabel>
              <Select
                multiple
                value={select}
                onChange={(event) => {
                  setAddonCategory({
                    ...addonCategory,
                    menuIds: event.target.value as [],
                  });
                  setSelect(event.target.value as []);
                }}
                input={<OutlinedInput label="Menu Categories" />}
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
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={addonCategory.isRequired}
                  onChange={(event, value) => {
                    setAddonCategory({ ...addonCategory, isRequired: value });
                    console.log(value);
                  }}
                />
              }
              label="Required"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleAddonCategory()} variant="contained">
            {isLoading ? <CircularProgress /> : "create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewAddonCategoryDialoag;
