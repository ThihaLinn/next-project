import { useAppSelector } from "@/store/app/hook";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const TopBar = () => {
  const { data } = useSession();

  const selectLocation = useAppSelector((state) => state.app.selectedLocation);

  let token;
  useEffect(() => {
    token = localStorage.getItem("token");
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: "6.5vh" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            REACTIVE
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {selectLocation && selectLocation.name}
          </Typography>
          {data && (
            <Button color="inherit" onClick={() => signOut()}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
