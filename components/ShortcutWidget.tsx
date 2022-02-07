import { useEffect, useState, useRef } from "react";
import { WebsocketMessage } from "../src/types/WebsocketMessage";
import { websocket as ws } from "../src/websocket";
import ShortcutButton from "./ShortcutButton";
import { Grid, Paper } from "@mui/material";

type ShortcutItem = {
  guid: string;
  icon: string;
};

const ShortcutWidget: React.VFC = () => {
  const [shortcuts, setShortcuts] = useState<ShortcutItem[]>([]);
  const shortcutsRef = useRef<ShortcutItem[]>([]);
  shortcutsRef.current = shortcuts;
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
        const guids: string[] = JSON.parse(data.data);
        const newShortcuts: ShortcutItem[] = guids.map((guid) => {
          return {
            guid,
            icon: "",
          };
        });
        setShortcuts(newShortcuts);
        guids.forEach((guid) => {
          const request: WebsocketMessage = {
            eventName: "requestShortcutIcon",
            data: guid,
          };
          const connection = ws.getInstance().connection;
          connection.send(JSON.stringify(request));
        });
        break;
      case "shortcutIcon":
        const shortcutIcon: ShortcutItem = data.data as ShortcutItem;
        const newState = shortcutsRef.current.map((shortcut) => {
          if (shortcut.guid === shortcutIcon.guid) {
            return shortcutIcon;
          }
          return shortcut;
        });
        setShortcuts(newState);
    }
  };
  return (
    <Paper
      elevation={6}
      sx={{
        width: "90%",
      }}
    >
      <Grid container spacing={2}>
        {shortcuts.map((state, index) => (
          <Grid item xs={4} sm={3} md={2} lg={1} key={state.guid}>
            <ShortcutButton
              onClick={() => {
                send(state.guid);
              }}
              borderColor={"aqua"}
              alt={index.toString()}
              src={state.icon}
              size={80}
            >
              {index}
            </ShortcutButton>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ShortcutWidget;
