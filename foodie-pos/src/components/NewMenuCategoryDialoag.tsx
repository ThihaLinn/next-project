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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NewMenuCategoryParam } from "@/types/menuCategory";
import { createMenuCategory } from "@/store/slice/MenuCategorySlice";
import { hideSnackbar, showSnackBar } from "@/store/slice/SnackBarSlice";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { stat } from "fs";
import MenuCategory from "@/pages/back-office/menu-category";

interface prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewMenuCategoryDialoag = ({ open, setOpen }: prop) => {
  const { company } = useAppSelector((state) => state.company);
  const locationId: any = useAppSelector(
    (state) => state.app.selectedLocation?.id
  );

  let [menuCategory, setMenuCategory] = useState<NewMenuCategoryParam>({
    companyId: company?.id as number,
    name: "",
    disable: false,
    locationId,
  });

  console.log(menuCategory);

  useEffect(() => {
    setMenuCategory({
      companyId: company?.id as number,
      name: "",
      disable: false,
      locationId,
    });
  }, [company]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 5000);
  }, [open]);

  let dispatch = useAppDispatch();

  const handleMenuCategory = () => {
    setOpen(false);
    dispatch(
      createMenuCategory({
        ...menuCategory,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "success",
              message: "MenuCategory Created successfully",
            })
          );
        },
        onError: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "error",
              message: "Error occuring when creating menu category",
            })
          );
        },
      })
    );
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "end" }}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          ADD MENUCATEGORY
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Menu Category"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
                  setMenuCategory({ ...menuCategory, name: e.target.value })
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={menuCategory.disable}
                    onChange={(event, value) => {
                      setMenuCategory({ ...menuCategory, disable: value });
                      console.log(value);
                    }}
                  />
                }
                label="Disable"
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleMenuCategory()} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewMenuCategoryDialoag;
