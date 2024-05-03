import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Typography,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormControlLabel,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMenu, createMenu } from "../store/slice/MenuSlice";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { Menu, NewMenuParams } from "@/types/menu";
import { hideSnackbar, showSnackBar } from "@/store/slice/SnackBarSlice";
import { stat } from "fs";
import DropZone from "./DropZone";
import { createImageUrl } from "@/store/slice/AppSlice";

interface prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewMenuDialoag = ({ open, setOpen }: prop) => {
  let { selectedLocation } = useAppSelector((state) => state.app);
  const [select, setSelected] = useState<number[]>([]);
  const [image, setImage] = useState<File>();
  let [menu, setMenu] = useState<NewMenuParams>({
    name: "",
    price: 0,
    menuCategoryIds: [] as [],
    locationId: selectedLocation?.id as number,
    disable: false,
    imgUrl: "",
  });

  useEffect(() => {
    setMenu({
      name: "",
      price: 0,
      menuCategoryIds: [] as [],
      locationId: selectedLocation?.id as number,
      disable: false,
      imgUrl: "",
    });
  }, [selectedLocation]);
  console.log(menu);
  const menuCategories = useAppSelector(
    (state) => state.menuCategory.menusCategory
  );

  const isLoading = useAppSelector((state) => state.menu.isloading);

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 5000);
  }, [open]);

  const dispatch = useAppDispatch();
  const handleMenu = () => {
    setOpen(false);
    if (image) {
      dispatch(
        createImageUrl({
          file: image,
          onSuccess: (imgUrl) => {
            menu.imgUrl = imgUrl;
            dispatch(
              createMenu({
                ...menu,
                onSuccess: () => {
                  dispatch(
                    showSnackBar({
                      open: true,
                      type: "success",
                      message: "Menus created successfully",
                    })
                  );
                },
                onError: () => {
                  dispatch(
                    showSnackBar({
                      open: true,
                      type: "error",
                      message: "Can't create Menu",
                    })
                  );
                },
              })
            );
          },
        })
      );
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Menu
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Menu"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <Box
            sx={{
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "360px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={(e) => setMenu({ ...menu, name: e.target.value })}
            />
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              onChange={(e) =>
                setMenu({ ...menu, price: parseInt(e.target.value) })
              }
            />
            <FormControl sx={{ mb: "2px" }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Menu Categories
              </InputLabel>
              <Select
                multiple
                value={select}
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
                    .map((id) => menuCategories.find((mc) => mc.id === id))
                    .map((c) => c?.name)
                    .join(", ")
                }
              >
                {menuCategories.map((mc) => (
                  <MenuItem key={mc.id} value={mc.id}>
                    <Checkbox checked={select.includes(mc.id)} />
                    <ListItemText primary={mc.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box>
              <DropZone onDrop={(file) => setImage(file[0])}></DropZone>
              {image && (
                <Chip
                  sx={{ mt: "3px" }}
                  label={image.name}
                  onDelete={() => {}}
                />
              )}
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={menu.disable}
                  onChange={(event, value) => {
                    setMenu({ ...menu, disable: value });
                    console.log(value);
                  }}
                />
              }
              label="Disable"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleMenu()} variant="contained">
            {isLoading ? <CircularProgress /> : "create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewMenuDialoag;
