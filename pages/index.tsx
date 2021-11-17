import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NextPage } from "next";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import CropFreeIcon from "@mui/icons-material/CropFree";

const Home: NextPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          justifySelf: "center",
          width: "50vw",
          maxWidth: "600px",
          minWidth: "300px",
          padding: 4,
        }}
        elevation={4}
      >
        <Typography component="h1" variant="h5">
          Connect
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel>ip address</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <CropFreeIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="ip address"
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Connect
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
