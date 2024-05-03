import Layout from "@/components/BackOfficeLayout";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import React from "react";

const SignIn = () => {
  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => signIn("google", { callbackUrl: "/back-office" })}
          sx={{ mx: "auto" }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Layout>
  );
};

export default SignIn;
