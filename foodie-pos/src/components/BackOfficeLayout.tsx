import { Box, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";
import AppSnackBar from "./AppSnackBar";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { fetchData } from "@/store/slice/AppSlice";
import { hideSnackbar } from "@/store/slice/SnackBarSlice";

interface prop {
  children?: ReactNode;
}

const BackOfficeLayout = ({ children }: prop) => {
  const { data } = useSession();

  const dispatch = useAppDispatch();
  const { init } = useAppSelector((state) => state.app);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(hideSnackbar());
  //   }, 5000);
  // }, [open]);

  useEffect(() => {
    if (!init) {
      dispatch(fetchData({}));
    }
  }, [init]);
  return (
    <Box sx={{ width: "100%" }}>
      <TopBar></TopBar>
      <Box sx={{ display: "flex", width: "100%" }}>
        {data && <SideBar></SideBar>}

        <Box
          sx={{
            width: data ? "85%" : "100%",
            margin: "10px",
            bgcolor: "#F4F9F9",
          }}
        >
          {children}
        </Box>
      </Box>
      <AppSnackBar></AppSnackBar>
    </Box>
  );
};

export default BackOfficeLayout;
