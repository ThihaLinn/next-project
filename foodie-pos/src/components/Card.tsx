import { Box, Paper, Stack, Typography } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import React, { ReactNode } from "react";
import Link from "next/link";

interface prop {
  id: number;
  icon: ReactNode;
  name: string;
  path: string;
  disable?: boolean;
  imgUrl?: string;
  price?: number;
}

const Card = ({ id, icon, name, path, disable, imgUrl, price }: prop) => {
  return (
    <>
      <Link
        href={`/back-office/${path}/${id}`}
        style={{ textDecoration: "none" }}
      >
        
        <Box
          sx={{
            display: "flex",
            opacity: disable ? 0.5 : 1,
            flexWrap: "wrap",
            width: "100%",
            "& > :not(style)": {
              m: 1,
              width: 200,
              height: 200,
            },
          }}
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>{icon}</Box>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              {name}
            </Typography>
          </Paper>
        </Box>
      </Link>
    </>
  );
};

export default Card;
