import BackofficeLayout from "@/components/BackOfficeLayout";
import NewLocationDiloag from "@/components/NewLocationDiloag";
import NewMenuDialoag from "@/components/NewMenuDialoag";
import { useAppSelector } from "@/store/app/hook";
import { Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useState } from "react";
import Card from "@/components/Card";

const Menu = () => {
  let [open, setOpen] = useState(false);

  const locations = useAppSelector((state) => state.location.locations);

  return (
    <>
      
      <NewLocationDiloag open={open} setOpen={setOpen} />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {locations.map((location) => (
          <Card
            key={location.id}
            id={location.id}
            icon={<LocationOnIcon />}
            name={location.name}
            path="location"
          ></Card>
        ))}
      </Box>
    </>
  );
};

export default Menu;
