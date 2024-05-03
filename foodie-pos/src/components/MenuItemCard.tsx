import { useAppSelector } from "@/store/app/hook";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

interface prop {
  id: number;
  icon?: ReactNode;
  name: string;
  path: string;
  disable?: boolean;
  imgUrl: string;
  price?: number;
}

const MenuItemCard = ({
  id,
  icon,
  name,
  path,
  disable,
  imgUrl,
  price,
}: prop) => {
  const router = useRouter();
  const isBackoffice = router.pathname.includes("back-office");
  return (
    <>
      <Link
        href={isBackoffice ? `/back-office/${path}/${id}` : `/order/${path}`}
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
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={imgUrl || "/default-menu.png"}
                alt="green iguana"
              />
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography gutterBottom component="div">
                    {name}
                  </Typography>
                  <Typography>${price}</Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Link>
    </>
  );
};

export default MenuItemCard;
