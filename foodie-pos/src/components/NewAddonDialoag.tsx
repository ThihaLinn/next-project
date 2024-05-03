import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { createAddonCategory } from "@/store/slice/AddonCategorySlice";
import { createAddon, setAddon } from "@/store/slice/AddonSlice";
import { hideSnackbar, showSnackBar } from "@/store/slice/SnackBarSlice";
import { newAddonParams } from "@/types/addon";
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

  const [select, setSelect] = useState<number>(0);
  const [newAddon, setNewAddon] = useState<newAddonParams>({
    name: "",
    price: 0,
    addonCategoryId: 0,
  });

  const addonCategorries = useAppSelector(
    (state) => state.addonCategory.addonCategories
  );
  const { isLoading } = useAppSelector((state) => state.addonCategory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 5000);
  }, [open]);

  const handleCreate = () => {
    setOpen(false);
    dispatch(
      createAddon({
        ...newAddon,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "success",
              message: "Create addon successfully",
            })
          );
        },
      })
    );
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Addon
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Addon"}</DialogTitle>
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
                setNewAddon({ ...newAddon, name: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              onChange={(e) =>
                setNewAddon({ ...newAddon, price: Number(e.target.value) })
              }
            />

            <FormControl sx={{}}>
              <InputLabel id="demo-multiple-checkbox-label">Menus</InputLabel>
              <Select
                value={newAddon?.addonCategoryId}
                onChange={(event) => {
                  setNewAddon({
                    ...newAddon,
                    addonCategoryId: Number(event.target.value),
                  });
                  setSelect(Number(event.target.value));
                }}
                input={<OutlinedInput label="Menus" />}
                renderValue={() =>
                  addonCategorries.find((mc) => mc.id === select)?.name
                }
              >
                {addonCategorries.map((m) => (
                  <MenuItem key={m.id} value={m.id}>
                    <Checkbox checked={select === m.id} />
                    <ListItemText primary={m.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleCreate();
            }}
            variant="contained"
          >
            {isLoading ? <CircularProgress /> : "create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewAddonCategoryDialoag;
