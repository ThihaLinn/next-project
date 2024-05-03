import BackofficeLayout from "@/components/BackOfficeLayout";
import Card from "@/components/Card";
import NewMenuDialoag from "@/components/NewMenuDialoag";
import NewTableDialoag from "@/components/NewTableDialoag";
import { useAppSelector } from "@/store/app/hook";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import TableBarIcon from "@mui/icons-material/TableBar";
import { WineBar } from "@mui/icons-material";

const Menu = () => {
  let [open, setOpen] = useState(false);

  const locationId: number = useAppSelector(
    (state) => state.app.selectedLocation?.id
  ) as number;
  let tables = useAppSelector((state) => state.table.tables);
  tables = tables.filter((table) => table.locationId === locationId);

  const handleQR = (assetUrl: string) => {
    const imageWindow = window.open("_blank");
    imageWindow?.document.write(
      `<html><head><title>Print Image</title></head><body style="text-align: center;"><img src="${assetUrl}" onload="window.print();window.close()" /></body></html>`
    );
  };

  return (
    <>
      <NewTableDialoag></NewTableDialoag>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {tables.map((table) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card
              key={table.id}
              id={table.id}
              icon={<TableBarIcon />}
              name={table.name}
              path="table"
            ></Card>
            <Button
              variant="contained"
              onClick={() => handleQR(table.assetUrl)}
            >
              Open Qr
            </Button>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Menu;
