import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { hideSnackbar, showSnackBar } from "@/store/slice/SnackBarSlice";
import { createTable } from "@/store/slice/TableSlice";
import { newTableParams } from "@/types/table";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const NewTableDialoag = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const locationId: any = useAppSelector(
    (state) => state.app.selectedLocation?.id
  );

  const [newTable, setNewTable] = useState<newTableParams>({
    name: "",
    locationId,
  });

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 5000);
  }, [open]);

  const handleCreate = () => {
    setOpen(false);
    dispatch(
      createTable({
        ...newTable,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "success",
              message: "Table created successfully",
            })
          );
        },
        onError: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "error",
              message: "Can't create Table",
            })
          );
        },
      })
    );
  };

  const isloading = useAppSelector((state) => state.table.isloading);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Table
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Table"}</DialogTitle>
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
              onChange={(e) =>
                setNewTable({ ...newTable, name: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleCreate()} variant="contained">
            {isloading ? <CircularProgress /> : "create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewTableDialoag;
