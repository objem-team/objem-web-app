import { NextPage } from "next";
import * as React from "react";
import AlartSnackbar from "../components/AlertSnackBar";
import Application from "../components/Application";
import ConnectionDialog from "../components/ConnectionDialog";
import { websocket as ws } from "../src/websocket";
import { AlertColor, Dialog } from "@mui/material";

const Home: NextPage = () => {
  const [open, setOpen] = React.useState(true);
  const [connecting, setConnecting] = React.useState(false);
  const [key, setKey] = React.useState(0);
  const [alartType, setArartType] = React.useState<AlertColor>("success");
  const [alartOpen, setAlartOpen] = React.useState(false);
  const [alartMessage, setAlartMessage] = React.useState("");
  const handleClose = (e: Event, reason: string) => {
    if (reason === "backdropClick") return;
    setOpen(false);
  };
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleClick = (address: string) => {
    setConnecting(true);
    if (address.length > 0) {
      const arr = address.split(":");
      if (arr.length === 2) {
        ws.address = arr[0];
        ws.port = parseInt(arr[1]);
      } else {
        ws.address = address;
      }
    }
    tryConnect();
  };

  const tryConnect = async () => {
    const reconectTimes = 5;
    let flag = false;
    for (let i = 1; i <= reconectTimes; ++i) {
      if (flag) break;
      console.log(
        "Attempting to connect " + (reconectTimes - i) + " times remaining"
      );
      connect()
        .then(() => {
          console.log("connected");
          setConnecting(false);
          setKey(Math.random());
          setOpen(false);
          flag = true;
        })
        .catch((_) => {
          console.log("connect failed");
        });
      await sleep(1000 * 2 ** i);
    }
    if (flag) return;
    setConnecting(false);
    setArartType("error");
    setAlartMessage("Cannot connect to server");
    setAlartOpen(true);
    setOpen(true);
  };

  const connect = () => {
    return new Promise((resolve, reject) => {
      ws.reconect();
      const connection = ws.getInstance().connection;
      connection.onopen = (e) => {
        resolve(e);
      };
      connection.onerror = (e) => {
        reject(e);
      };
    });
  };

  // eslint-disable-next-line unused-imports/no-unused-vars
  const onError = (_e: Event) => {
    console.log("call error");
    for (let i = 0; i < 5; i++) {
      const connection = ws.getInstance().connection;
      ws.reconect();
      sleep(1000 * 2 ** i).then(() => {
        handleClick(connection.url);
      });
    }
    setOpen(true);
  };

  const handleAlartClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlartOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown
      >
        <AlartSnackbar
          severity={alartType}
          open={alartOpen}
          message={alartMessage}
          onClose={handleAlartClose}
        />
        <ConnectionDialog callback={handleClick} connecting={connecting} />
      </Dialog>
      {!open && <Application key={key} />}
    </div>
  );
};

export default Home;
