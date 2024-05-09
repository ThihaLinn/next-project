import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { fetchData } from "@/store/slice/AppSlice";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";

interface prop {
  children?: ReactNode;
}

const OrderLayout = ({ children }: prop) => {
  const { data } = useSession();

  const dispatch = useAppDispatch();
  const { init } = useAppSelector((state) => state.app);

  const router = useRouter();
  const tableId = router.query.tableId as string;

  useEffect(() => {
    if (!init && tableId) {
      dispatch(fetchData({ tableId }));
    }
  }, [init, tableId]);
  return <Box>{children}</Box>;
};

export default OrderLayout;
