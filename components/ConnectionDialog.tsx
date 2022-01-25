import React from "react";
import QrReader from "../components/QrReader";
import CropFreeIcon from "@mui/icons-material/CropFree";
import LoadingButton from "@mui/lab/LoadingButton";
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
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/system";
type ConnectionDialogProps = {
  callback: (_address: string) => void;
  connecting: boolean;
};

const ConnectionDialog: React.VFC<ConnectionDialogProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    setAddress(event.target.value);
  };

  const onRead = (result: string) => {
    setOpen(false);
    setAddress(result);
  };
  return (
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
            onChange={onChange}
            value={address}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
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
        <LoadingButton
          fullWidth
          loading={props.connecting}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => props.callback(address)}
        >
          Connect
        </LoadingButton>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Paper
          sx={{ padding: "10px", display: "flex", flexDirection: "column" }}
        >
          <Typography component="h1" variant="h5" sx={{ paddingY: "5px" }}>
            QRCodeReader
          </Typography>
          <QrReader onRead={onRead} />
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
  );
};

export default ConnectionDialog;