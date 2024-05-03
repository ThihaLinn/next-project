import { Box, Button, Chip, Typography } from "@mui/material";
import { AddOnCategory, Addon } from "@prisma/client";
import React from "react";
import AddonsComponent from "./AddonsComponent";

interface props {
  addonCategories: AddOnCategory[];
  addons: Addon[];
  selectAddon: Addon[];
  setSelectAddon: React.Dispatch<React.SetStateAction<Addon[]>>;
}

const AddonCategoryComponent = ({
  addonCategories,
  addons,
  selectAddon,
  setSelectAddon,
}: props) => {
  return (
    <Box>
      {addonCategories.map((ac) => {
        return (
          <Box key={ac.id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                my: "15px",
              }}
            >
              <Typography variant="h6">{ac.name}</Typography>
              <Chip label={ac.isRequired ? "Required" : "Optional"}></Chip>
            </Box>
            <AddonsComponent
              addons={addons}
              addonCategoryId={ac.id}
              isRequired={ac.isRequired}
              selectAddon={selectAddon}
              setSelectAddon={setSelectAddon}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default AddonCategoryComponent;
