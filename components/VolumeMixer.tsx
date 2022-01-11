import React, { useEffect, useState } from "react";
import { VolumeSession } from "../src/type/VolumeSession";
import { WebsocketMessage } from "../src/type/WebsocketMessage";
import { SetVolumeMessage } from "../src/type/WebsocketMessage/SetVolumeMessage";
import { websocket as ws } from "../src/websocket";
import BorderedAvater from "./BorderedAvater";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Button, IconButton, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";

type VolumeMixerState = {
  session: VolumeSession;
  isActive: boolean;
};
const VolumeMixer: React.VFC = () => {
  const [sessionState, setSessionState] = useState<VolumeMixerState[]>([]);
  const [selectedSession, setSelectedSession] = useState<Number>(
    Number.NEGATIVE_INFINITY
  );
  const [volume, setVolume] = useState(0);
  const btnStyle = "#2196f3";

  useEffect(() => {
    setSelectedSession(0);
  }, []);

  useEffect(() => {
    const connection = ws.getInstance().connection;
    connection.addEventListener("open", () => {
      console.log("connected");
      const requset: WebsocketMessage = {
        eventName: "requestSession",
        data: "this is sessionRequest",
      };
      connection.send(JSON.stringify(requset));
    });
    connection.addEventListener("message", onMassage);

    setSessionState((prev) =>
      prev.map((session) => ({
        ...session,
        isActive: session.session.processId === selectedSession,
      }))
    );
    const session = sessionState.find(
      (state) => state.session.processId == selectedSession
    );
    const volume = session ? session.session.volume : 0.5;
    setVolume(volume);

    return () => {
      connection.removeEventListener("message", onMassage);
    };
  }, [selectedSession]);

  const onMassage = (event: MessageEvent) => {
    const data = JSON.parse(event.data) as WebsocketMessage;
    switch (data.eventName) {
      case "session":
        const sessions = data.data as VolumeSession[];
        setSessionState(
          sessions.map((session) => {
            if (session.processId === selectedSession) {
              setVolume(session.volume as number);
            }
            return {
              session,
              isActive: session.processId === selectedSession,
            };
          })
        );
        break;
      case "volume":
        console.log("volume");
        break;
    }
  };

  const handleChange = (event: Event, value: number | number[]) => {
    console.log("onchange");
    console.log(value);
    setVolume(value as number);

    setSessionState((prev) =>
      prev.map((session) => {
        if (session.session.processId === selectedSession) {
          session.session.volume = value;
          const connection = ws.getInstance().connection;
          const data: SetVolumeMessage = {
            processId: session.session.processId,
            volume: value as number,
          };
          const requset: WebsocketMessage = {
            eventName: "setVolume",
            data: data,
          };
          connection.send(JSON.stringify(requset));
        }
        return session;
      })
    );
  };

  return (
    <Paper>
      <Button
        onClick={() => {
          console.log(volume);
          console.log("selected : " + selectedSession);
        }}
      >
        123
      </Button>
      <Grid container spacing={2}>
        {sessionState.map((state) => (
          <Grid item xs={3} sm={3} md={2} lg={2} key={state.session.processId}>
            <IconButton
              onClick={() => {
                setSelectedSession(state.session.processId);
              }}
            >
              <BorderedAvater
                isActive={state.isActive}
                borderColor={btnStyle}
                alt={state.session.name}
                src={state.session.icon}
                size={80}
              />
            </IconButton>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider
          aria-label="Volume"
          min={0}
          max={1}
          step={0.0001}
          value={volume}
          onChange={handleChange}
        />
        <VolumeUp />
      </Stack>
    </Paper>
  );
};

export default VolumeMixer;
