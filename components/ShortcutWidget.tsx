import { useEffect, useState } from "react";
import { WebsocketMessage } from "../src/types/WebsocketMessage";
import { websocket as ws } from "../src/websocket";
import ShortcutButton from "./ShortcutButton";
import { Grid, Paper } from "@mui/material";

const ShortcutWidget: React.VFC = () => {
  const [shortcuts, setShortcuts] = useState<string[]>([]);
  useEffect(() => {
    const connection = ws.getInstance().connection;
    connection.addEventListener("message", onMassage);
    if (connection.readyState > 0) {
      requestShortcuts();
    } else {
      connection.addEventListener("open", requestShortcuts);
    }
    return () => {
      connection.removeEventListener("message", onMassage);
      connection.removeEventListener("open", requestShortcuts);
    };
    setShortcuts(["1", "2", "3"]);
  }, []);
  const requestShortcuts = () => {
    const connection = ws.getInstance().connection;
    const request: WebsocketMessage = {
      eventName: "requestShortcuts",
      data: "this is requestShortcuts",
    };
    connection.send(JSON.stringify(request));
  };

  const send = (guid: string) => {
    const request: WebsocketMessage = {
      eventName: "doshortcut",
      data: guid,
    };
    const connection = ws.getInstance().connection;
    connection.send(JSON.stringify(request));
  };

  const onMassage = (event: MessageEvent) => {
    const data = JSON.parse(event.data) as WebsocketMessage;
    switch (data.eventName) {
      case "shortcuts":
        const shortcuts = data.data as string[];
        setShortcuts(shortcuts);
        break;
    }
  };
  return (
    <Paper
      elevation={6}
      sx={{
        margin: "10px",
      }}
    >
      <Grid container spacing={2}>
        {shortcuts.map((state) => (
          <Grid item xs={4} sm={3} md={2} lg={1} key={state}>
            <ShortcutButton
              onClick={() => {
                console.log("click");
              }}
              borderColor={"aqua"}
              src="jkj"
              alt={state}
              size={80}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ShortcutWidget;
