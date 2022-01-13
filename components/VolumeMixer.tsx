import React, { useEffect, useRef, useState } from "react";
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
  const sessionStateRef = useRef<VolumeMixerState[]>([]);
  sessionStateRef.current = sessionState;

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedIndexRef = useRef<number>(0);
  selectedIndexRef.current = selectedIndex;

  const [isGrabbed, setIsGrabbed] = useState<boolean>(false);
  const isGrabbedRef = useRef<boolean>(false);
  isGrabbedRef.current = isGrabbed;

  const [volume, setVolume] = useState(0);
  const btnStyle = "#2196f3";

  useEffect(() => {
    const connection = ws.getInstance().connection;
    connection.addEventListener("message", onMassage);
    if (connection.readyState > 0) {
      requestSession();
    } else {
      connection.addEventListener("open", requestSession);
    }
    setSelectedIndex(0);
    return () => {
      connection.removeEventListener("message", onMassage);
      connection.removeEventListener("open", requestSession);
    };
  }, []);

  useEffect(() => {
    setSessionState((prev) => {
      if (!prev.length) return prev;
      const newState = prev.map((state, index) => {
        return {
          session: state.session,
          isActive: index === selectedIndex,
        };
      });
      return newState;
    });
    const selected = sessionState[selectedIndex];
    const volume = selected ? selected.session.volume : 0;
    setVolume(volume);
  }, [selectedIndex]);

  const requestSession = () => {
    const connection = ws.getInstance().connection;
    const requset: WebsocketMessage = {
      eventName: "requestSession",
      data: "this is sessionRequest",
    };
    connection.send(JSON.stringify(requset));
  };

  const onMassage = (event: MessageEvent) => {
    const data = JSON.parse(event.data) as WebsocketMessage;
    switch (data.eventName) {
      case "session":
        const sessions = data.data as VolumeSession[];
        const newSession = sessions.map((session, index) => {
          if (index === selectedIndexRef.current) {
            setVolume(session.volume as number);
          } else if (index < selectedIndexRef.current) {
            setSelectedIndex(0);
          }
          return {
            session,
            isActive: index === selectedIndexRef.current,
          };
        });
        setSessionState(newSession);
        break;
      case "newvolume":
        //stateを更新する
        if (isGrabbedRef.current) return;
        const newvolume = data.data as NewVolumeMessage;
        setSessionState((prev) =>
          prev.map((session) => {
            if (session.session.processId === newvolume.processId) {
              session.session.volume = newvolume.volume;
              session.session.isMuted = newvolume.isMuted;
            }
            return session;
          })
        );
        if (
          newvolume.processId ===
          sessionStateRef.current[selectedIndexRef.current].session.processId
        ) {
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
      processId: sessionState[selectedIndex].session.processId,
      volume: value as number,
      isMuted: sessionState[selectedIndex].session.isMuted,
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
        if (session.session.processId === selectedIndexRef.current) {
          session.session.volume = value as number;
        }
        return session;
      });
    });
    setIsGrabbed(false);
  };

  const onClick = (index: number) => {
    if (selectedIndexRef.current === index) {
      const data: SetVolumeMessage = {
        processId: sessionState[selectedIndex].session.processId,
        volume: sessionState[selectedIndex].session.volume,
        isMuted: !sessionState[selectedIndex].session.isMuted,
      };
      const requset: WebsocketMessage = {
        eventName: "setVolume",
        data: data,
      };

      const connection = ws.getInstance().connection;
      connection.send(JSON.stringify(requset));
    }
    setSelectedIndex(index);
  };

  return (
    <Paper>
      <Button
        onClick={() => {
          console.log(sessionState);
        }}
      >
        123
      </Button>
      <Grid container spacing={2}>
        {sessionState.map((state, index) => (
          <Grid item xs={3} sm={3} md={2} lg={2} key={state.session.processId}>
            <IconButton
              onClick={() => {
                onClick(index);
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
