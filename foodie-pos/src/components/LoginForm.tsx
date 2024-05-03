import { Box, Button, TextField } from "@mui/material";

const Login = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <TextField id="outlined-basic" label="Password" variant="outlined" />
        <Button variant="contained">Submit</Button>
      </Box>
    </div>
  );
};

export default Login;
