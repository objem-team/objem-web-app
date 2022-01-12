import React, { useEffect, useState } from "react";
import { VolumeSession } from "../src/type/VolumeSession";
import { WebsocketMessage } from "../src/type/WebsocketMessage";
import { NewVolumeMessage } from "../src/type/WebsocketMessage/NewVolumeMessage";
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
  const [isGrabbed, setIsGrabbed] = useState<boolean>(false);
  const isGrabbedRef = React.useRef<boolean>(false);
  isGrabbedRef.current = isGrabbed;

  const selectedSessionRef = React.useRef<Number>(Number.NEGATIVE_INFINITY);
  selectedSessionRef.current = selectedSession;

  const [volume, setVolume] = useState(0);
  const btnStyle = "#2196f3";

  useEffect(() => {
    setSelectedSession(0);
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
    return () => {
      connection.removeEventListener("message", onMassage);
    };
  }, []);

  useEffect(() => {
    setSessionState((prev) =>
      prev.map((session) => ({
        ...session,
        isActive: session.session.processId === selectedSession,
      }))
    );
    const session = sessionState.find(
      (state) => state.session.processId === selectedSession
    );
    const volume = session ? session.session.volume : 0.5;
    setVolume(volume);
  }, [selectedSession]);

  const onMassage = (event: MessageEvent) => {
    const data = JSON.parse(event.data) as WebsocketMessage;
    switch (data.eventName) {
      case "session":
        const sessions = data.data as VolumeSession[];
        setSessionState(
          sessions.map((session) => {
            if (session.processId === selectedSessionRef.current) {
              setVolume(session.volume as number);
            }
            return {
              session,
              isActive: session.processId === selectedSessionRef.current,
            };
          })
        );
        break;
      case "newvolume":
        if (isGrabbedRef.current) return;
        const newvolume = data.data as NewVolumeMessage;
        setSessionState((prev) => {
          const session = prev.find(
            (state) => state.session.processId === newvolume.processId
          );
          if (session) {
            session.session.volume = newvolume.volume;
          }
          return prev;
        });
        if (newvolume.processId === selectedSessionRef.current) {
          setVolume(newvolume.volume);
        }
        break;
    }
  };

  const handleChange = (event: Event, value: number | number[]) => {
    setIsGrabbed(true);
    setVolume(value as number);

    const connection = ws.getInstance().connection;
    const data: SetVolumeMessage = {
      processId: selectedSessionRef.current,
      volume: value as number,
    };
    const requset: WebsocketMessage = {
      eventName: "setVolume",
      data: data,
    };
    connection.send(JSON.stringify(requset));
  };
  const handleChangeCommitted = (
    event: React.SyntheticEvent | Event,
    value: number | number[]
  ) => {
    setSessionState((prev) => {
      return prev.map((session) => {
        if (session.session.processId === selectedSessionRef.current) {
          session.session.volume = value as number;
        }
        return session;
      });
    });
    setIsGrabbed(false);
  };

  return (
    <Paper>
      <Button
        onClick={() => {
          console.log(selectedSessionRef.current);
          console.log(selectedSession);
          console.log(sessionState);
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
                isMuted={state.session.isMuted}
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
          onChangeCommitted={handleChangeCommitted}
        />
        <VolumeUp />
      </Stack>
    </Paper>
  );
};

export default VolumeMixer;
