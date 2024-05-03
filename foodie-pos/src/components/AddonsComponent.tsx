import { useAppSelector } from "@/store/app/hook";
import { CheckBox } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  Typography,
} from "@mui/material";
import { Addon } from "@prisma/client";
import { log } from "console";
import React, { useState } from "react";

interface props {
  addonCategoryId: number;
  addons: Addon[];
  isRequired: boolean;
  selectAddon: Addon[];
  setSelectAddon: React.Dispatch<React.SetStateAction<Addon[]>>;
}

const AddonsComponent = ({
  addons,
  addonCategoryId,
  isRequired,
  selectAddon,
  setSelectAddon,
}: props) => {
  addons = addons.filter((a) => a.addOnCategoryId === addonCategoryId);
  const addonIds = addons.map((a) => a.id);

  return (
    <Box>
      <Box>
        {addons.map((addon) => {
          return (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    isRequired ? (
                      <Radio
                        color="success"
                        checked={selectAddon.includes(addon)}
                        onChange={(env, value) => {
                          const others = selectAddon.filter(
                            (item) => !addonIds.includes(item.id)
                          );
                          setSelectAddon([...others, addon]);
                        }}
                      />
                    ) : (
                      <Checkbox
                        color="success"
                        checked={selectAddon.includes(addon)}
                        onChange={(env, value) => {
                          if (value) {
                            setSelectAddon([...selectAddon, addon]);
                          } else {
                            const selected = selectAddon.filter(
                              (sa) => sa.id !== addon.id
                            );
                            setSelectAddon(selected);
                          }
                        }}
                      />
                    )
                  }
                  label={addon.name}
                />
              </FormGroup>
              <Box>{addon.price}</Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default AddonsComponent;
