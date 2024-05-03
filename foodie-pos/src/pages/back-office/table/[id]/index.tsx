import BackOfficeLayout from "@/components/BackOfficeLayout";
import DeleteDiloag from "@/components/DeleteDiloag";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { setSelectedLocation } from "@/store/slice/AppSlice";
import { deleteLocation, updateLocation } from "@/store/slice/LocationSlice";
import { updateMenuCategory } from "@/store/slice/MenuCategorySlice";
import { showSnackBar } from "@/store/slice/SnackBarSlice";
import { deleteTable, updateTable2 } from "@/store/slice/TableSlice";
import { updateLocationParam } from "@/types/Location";
import { updateTableParams } from "@/types/table";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  const dispatch = useAppDispatch();

  const tables = useAppSelector((state) => state.table.tables);
  const table = tables.find((table) => table.id === id);

  const [open, setOpen] = useState(false);
  const [updateTable, setUpdateTable] = useState<updateTableParams>();

  useEffect(() => {
    if (table) {
      setUpdateTable(table);
    }
  }, [table]);

  if (!updateTable) {
    return (
      <>
        <Typography>Table not found</Typography>
      </>
    );
  }

  const handleUpdate = () => {
    dispatch(
      updateTable2({
        ...updateTable,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "success",
              message: "Update Table successfully",
            })
          );
        },
      })
    );
    router.push("/back-office/table");
  };

  const handleDelete = () => {
    dispatch(
      deleteTable({
        id,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "success",
              message: "Delete table successfully",
            })
          );
        },
      })
    );
    router.push("/back-office/table");
  };

  return (
    <>
      <>
        <DeleteDiloag
          open={open}
          content="table"
          setOpen={setOpen}
          handleDelete={() => handleDelete()}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "350px",
            mb: "10px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={updateTable?.name}
            onChange={(e) =>
              setUpdateTable({ ...updateTable, name: e.target.value })
            }
          />
        </Box>
        <Box>
          <Button variant="contained" onClick={() => handleUpdate()}>
            Update
          </Button>
        </Box>
      </>
    </>
  );
};

export default index;
