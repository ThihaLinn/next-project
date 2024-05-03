import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { hideSnackbar, showSnackBar } from "@/store/slice/SnackBarSlice";
import { Button, Snackbar, Alert } from "@mui/material";
import { stat } from "fs";
import React, { useState } from "react";

const SnackBar = () => {
  let { open, message, type } = useAppSelector((state) => state.snackBar);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Snackbar
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
        }}
        open={open}
        onClose={() => {}}
      >
        <Alert
          onClose={() => {
            dispatch(hideSnackbar());
          }}
          severity={type == "success" ? "success" : "error"}
          variant="filled"
          sx={{ marginRight: "40px" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBar;
