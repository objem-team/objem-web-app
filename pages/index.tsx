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
  const handleClose = (reason: string) => {
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
    for (let i = 0; i < reconectTimes; ++i) {
      if (flag) break;
      await sleep(1000 * 2 ** i);
      console.log(
        "Attempting to connect " + (reconectTimes - i) + " times remaining"
      );
      connect().then((connection) => {
        console.log("connected");
        setConnecting(false);
        setKey(Math.random());
        setOpen(false);
        flag = true;
        const socket = connection as WebSocket;
        socket.onopen = onError;
      });
    }
    if (flag) return;
    setConnecting(false);
    setArartType("error");
    setAlartMessage("Cannot connect to ");
    setAlartOpen(true);
    setOpen(true);
  };

  const connect = () => {
    return new Promise((resolve, reject) => {
      ws.reconect();
      const connection = ws.getInstance().connection;
      connection.onopen = () => {
        resolve(connection);
      };
      connection.onerror = (e) => {
        reject(e);
      };
    });
  };

  // eslint-disable-next-line unused-imports/no-unused-vars
  const onError = (_e: Event) => {
    console.log("eeeee");
    tryConnect();
  };

  const handleAlartClose = (reason?: string) => {
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
