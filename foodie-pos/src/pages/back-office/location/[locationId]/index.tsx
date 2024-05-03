import BackOfficeLayout from "@/components/BackOfficeLayout";
import DeleteDiloag from "@/components/DeleteDiloag";
import { useAppDispatch, useAppSelector } from "@/store/app/hook";
import { setSelectedLocation } from "@/store/slice/AppSlice";
import { deleteLocation, updateLocation } from "@/store/slice/LocationSlice";
import { updateMenuCategory } from "@/store/slice/MenuCategorySlice";
import { showSnackBar } from "@/store/slice/SnackBarSlice";
import { updateLocationParam } from "@/types/Location";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();
  const id = Number(router.query.locationId);

  const dispatch = useAppDispatch();
  const locations = useAppSelector((state) => state.location.locations);
  const location = locations.find((c) => c.id == id);

  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<updateLocationParam>({
    id,
    name: location?.name as string,
    street: location?.street as string,
    township: location?.township as string,
    city: location?.city as string,
  });

  const handleUpdate = () => {
    if (
      data.name === location?.name &&
      data.street === location.street &&
      data.township === location.township &&
      data.city === location.city
    ) {
      router.push("/back-office/location");
    } else {
      dispatch(
        updateLocation({
          ...data,
          onSuccess: () => {
            dispatch(
              showSnackBar({
                open: true,
                type: "success",
                message: "Update Location successfully",
              })
            );
          },
        })
      );
      router.push("/back-office/location");
    }
  };

  const handleDelete = () => {
    dispatch(
      deleteLocation({
        id,
        onSuccess: () => {
          dispatch(
            showSnackBar({
              open: true,
              type: "success",
              message: "Delete Location successfully",
            })
          );
        },
      })
    );
    router.push("/back-office/location");
  };

  const checkSelected =
    useAppSelector((state) => state.app.selectedLocation?.id) === id;

  const handleLocation = () => {
    const selectedLocation: any = locations.find(
      (location) => location.id === id
    );
    dispatch(setSelectedLocation(selectedLocation));
    localStorage.setItem(
      "selectedLocationId",
      String(JSON.stringify(selectedLocation))
    );
  };

  return (
    <>
      <>
        <DeleteDiloag
          open={open}
          content="location"
          setOpen={setOpen}
          handleDelete={() => handleDelete()}
        />
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
            value={data.street}
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
          <Switch checked={checkSelected} onChange={() => handleLocation()} />
        </Box>
      </>
    </>
  );
};

export default index;
