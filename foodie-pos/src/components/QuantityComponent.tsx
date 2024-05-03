import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

interface props {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityComponent = ({ quantity, setQuantity }: props) => {
  const decrease = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };
  const increase = () => {
    setQuantity(quantity + 1);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: "20px" }}>
      <IconButton color="primary" onClick={() => decrease()}>
        <RemoveCircle />
      </IconButton>
      <Typography variant="h6">{quantity}</Typography>
      <IconButton color="primary" onClick={() => increase()}>
        <AddCircle />
      </IconButton>
    </Box>
  );
};

export default QuantityComponent;
