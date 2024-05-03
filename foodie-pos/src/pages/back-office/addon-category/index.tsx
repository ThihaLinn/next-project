import BackofficeLayout from "@/components/BackOfficeLayout";
import Card from "@/components/Card";
import NewAddonCategoryDialoag from "@/components/NewAddonCategoryDialoag";
import { useAppSelector } from "@/store/app/hook";
import { newAddonCategoryParams } from "@/types/addonCategory";
import ClassIcon from "@mui/icons-material/Class";
import { Box } from "@mui/material";
import React, { useState } from "react";

const Menu = () => {
  let [open, setOpen] = useState(false);
  let [select, setSelect] = useState<number[]>([]);
  let [addonCategory, setAddonCategory] = useState<newAddonCategoryParams>({
    name: "",
    isRequired: true,
    menuIds: [],
  });

  const addonCategories = useAppSelector(
    (state) => state.addonCategory.addonCategories
  );

  console.log(addonCategories);

  return (
    <>
      <NewAddonCategoryDialoag />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {addonCategories.map((addonCategory) => {
          const isDisable = false;

          return (
            <Card
              key={addonCategory.id}
              id={addonCategory.id}
              icon={<ClassIcon />}
              name={addonCategory.name}
              path="addon-category"
              disable={isDisable}
            ></Card>
          );
        })}
      </Box>
    </>
  );
};

export default Menu;
