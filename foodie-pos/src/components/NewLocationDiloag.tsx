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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMenu, createMenu } from "../store/slice/MenuSlice";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { Menu, NewMenuParams } from "@/types/menu";
import { hideSnackbar, showSnackBar } from "@/store/slice/SnackBarSlice";
import { newLocationParam } from "@/types/Location";
import { createLocation } from "@/store/slice/LocationSlice";

interface prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewLocationDiloag = ({ open, setOpen }: prop) => {
  let id = useAppSelector((state) => state.company.company?.id);

  const [location, setLocation] = useState<newLocationParam>({
    name: "",
    street: "",
    township: "",
    city: "",
    companyId: id as number,
  });

  console.log(location);

  const isLoading = useAppSelector((state) => state.location.isLoading);

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 5000);
  }, [open]);

  const dispatch = useAppDispatch();
  const handleMenu = () => {
    setOpen(false);
    dispatch(
      createLocation({
        ...location,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "success",
              message: "Locat created successfully",
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
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Location
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
              width: "280px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={(e) =>
                setLocation({ ...location, name: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Street"
              variant="outlined"
              onChange={(e) =>
                setLocation({ ...location, street: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Township"
              variant="outlined"
              onChange={(e) =>
                setLocation({ ...location, township: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
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

export default NewLocationDiloag;
