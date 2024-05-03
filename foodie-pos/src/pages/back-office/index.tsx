import Layout from "@/components/BackOfficeLayout";
import LoginForm from "@/components/LoginForm";
import { config } from "@/config";
import { useAppDispatch } from "@/store/app/hook";
import { setCompany } from "@/store/slice/CompanySlice";
import { setMenuCategory } from "@/store/slice/MenuCategorySlice";
import { setMenu } from "@/store/slice/MenuSlice";
import { Button, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";

const index = () => {
  const { data } = useSession();

  const dispath = useAppDispatch();

  return (
    <>
      <Typography variant="h6">
        {data?.user?.name} {data?.user?.email}
      </Typography>
    </>
  );
};

export default index;
