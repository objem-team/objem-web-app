import { NextPage } from "next";
import * as React from "react";
import QrReader from "../components/QrReader";
import CropFreeIcon from "@mui/icons-material/CropFree";
import {
  Paper,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";

const Home: NextPage = () => {
  const [open, setOpen] = React.useState(false);
  const [ipaddress, setIpaddress] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    setIpaddress(event.target.value);
  };

  const onQRread = (result: string) => {
    setOpen(false);
    setIpaddress(result);
  };

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
        elevation={10}
      >
        <Typography component="h1" variant="h5">
          Connect
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel>ip address</InputLabel>
            <OutlinedInput
              value={ipaddress}
              onChange={onChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="ReadQR"
                    edge="end"
                    onClick={handleClickOpen}
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
        <Paper elevation={10} />
        <Dialog open={open} onClose={handleClose} fullWidth>
          <Paper
            sx={{ padding: "10px", display: "flex", flexDirection: "column" }}
          >
            <Typography component="h1" variant="h5" sx={{ paddingY: "5px" }}>
              QRCodeReader
            </Typography>
            <QrReader callback={onQRread} />
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ marginTop: "10px" }}
            >
              cancel
            </Button>
          </Paper>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Home;
