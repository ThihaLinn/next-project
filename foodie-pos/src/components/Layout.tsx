import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import BackOfficeLayout from "./BackOfficeLayout";
import { Box } from "@mui/material";
import OrderLayout from "./OrderLayout";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { fetchData } from "@/store/slice/AppSlice";
import Order from "@/pages/order";

interface prop {
  children?: ReactNode;
}

const Layout = ({ children }: prop) => {
  const router = useRouter();
  const isBackoffice = router.pathname.includes("back-office");
  const isOrder = router.query.tableId;

  const { data } = useSession();

  const dispatch = useAppDispatch();
  const { init } = useAppSelector((state) => state.app);

  const table = useAppSelector((state) => state.table.tables);

  useEffect(() => {
    if (!init) {
      dispatch(fetchData({}));
    }
  }, [init]);

  if (isBackoffice) {
    return (
      <>
        <BackOfficeLayout>{children}</BackOfficeLayout>
        {console.log("BackOffice")}
      </>
    );
  } else if (isOrder) {
    return (
      <>
        <OrderLayout>{children}</OrderLayout>
        {console.log("Order")}
      </>
    );
  } else
    return (
      <Box>
        <Box>shit</Box>
        {children}
      </Box>
    );
};

export default Layout;
