import React from "react";
import CropFreeIcon from "@mui/icons-material/CropFree";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

type ConnectionDialogProps = {
  callback: (address: string) => void;
};

const ConnectionDialog: React.VFC<ConnectionDialogProps> = (props) => {
  const [address, setAddress] = React.useState("");
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
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => props.callback(address)}
          >
            Connect
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ConnectionDialog;
