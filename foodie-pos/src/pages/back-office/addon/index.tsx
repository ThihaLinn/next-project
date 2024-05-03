import BackofficeLayout from "@/components/BackOfficeLayout";
import Card from "@/components/Card";
import NewAddonDialoag from "@/components/NewAddonDialoag";
import EggIcon from "@mui/icons-material/Egg";

import { useAppSelector } from "@/store/app/hook";
import { Box } from "@mui/material";
import React, { useState } from "react";

const Menu = () => {
  let [open, setOpen] = useState(false);

  const addons = useAppSelector((state) => state.addon.addons);

  return (
    <>
      <NewAddonDialoag />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {addons.map((addon) => {
          const isDisable = false;

          return (
            <Card
              key={addon.id}
              id={addon.id}
              icon={<EggIcon />}
              name={addon.name}
              path="addon"
              disable={isDisable}
            ></Card>
          );
        })}
      </Box>
    </>
  );
};

export default Menu;
