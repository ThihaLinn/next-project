import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import "../styles/Home.module.css"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Typography variant="h3">Landing site</Typography>
      <Link href={"/back-office"}>
        <Typography variant="h6">Backoffice</Typography>
      </Link>
      <Link href={"/order"}>
        <Typography variant="h6">Order</Typography>
      </Link>
    </>
  );
}
