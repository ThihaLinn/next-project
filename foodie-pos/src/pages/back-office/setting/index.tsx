import Layout from "@/components/BackOfficeLayout";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { setCompany, updateCompany } from "@/store/slice/CompanySlice";
import { showSnackBar } from "@/store/slice/SnackBarSlice";
import { Box, Button, Switch, TextField, Typography } from "@mui/material";
import { Company } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const company = useAppSelector((state) => state.company.company) as Company;

  const [data, setData] = useState<Company>(company);

  useEffect(() => {
    console.log(company);
    setData(company);
  }, [company]);

  const handleUpdate = () => {
    if (
      data.name === company.name &&
      data.street === company.street &&
      data.township === company.township &&
      data.city === company.city
    ) {
      router.push("/back-office/setting");
    } else {
      dispatch(
        updateCompany({
          ...data,
          onSuccess: () => {
            dispatch(
              showSnackBar({
                open: true,
                type: "success",
                message: "Update Company successfully",
              })
            );
          },
        })
      );
      router.push("/back-office/setting");
    }
  };
  if (!data) {
    return <Box></Box>;
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", width: "350px" }}>
        <TextField
          sx={{ mb: "10px" }}
          label="Name"
          value={data.name}
          variant="outlined"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <TextField
          sx={{ mb: "10px" }}
          value={data && data.street}
          label="Street"
          variant="outlined"
          onChange={(e) => setData({ ...data, street: e.target.value })}
        />
        <TextField
          sx={{ mb: "10px" }}
          value={data.township}
          label="Township"
          variant="outlined"
          onChange={(e) => setData({ ...data, township: e.target.value })}
        />
        <TextField
          sx={{ mb: "10px" }}
          value={data.city}
          label="City"
          variant="outlined"
          onChange={(e) => setData({ ...data, city: e.target.value })}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "350px",
        }}
      >
        <Button variant="contained" onClick={() => handleUpdate()}>
          Update
        </Button>
      </Box>
    </>
  );
};

export default index;
