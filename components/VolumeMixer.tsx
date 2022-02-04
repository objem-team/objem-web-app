import React, { useEffect, useRef, useState } from "react";
import { VolumeSession } from "../src/types/VolumeSession";
import { WebsocketMessage } from "../src/types/WebsocketMessage";
import { NewVolumeMessage } from "../src/types/WebsocketMessage/NewVolumeMessage";
import { SetVolumeMessage } from "../src/types/WebsocketMessage/SetVolumeMessage";
import { websocket as ws } from "../src/websocket";
import VolumeMixerBtn from "./VolumeMixerBtn";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Paper } from "@mui/material";
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
      return prev.map((state, index) => {
        return {
          session: state.session,
          isActive: index === selectedIndex,
        };
      });
    });
    const selected = sessionState[selectedIndex];
    const volume = selected ? selected.session.volume : 0;
    setVolume(volume);
  }, [selectedIndex]);

  const requestSession = () => {
    const connection = ws.getInstance().connection;
    const request: WebsocketMessage = {
      eventName: "requestSession",
      data: "this is sessionRequest",
    };
    connection.send(JSON.stringify(request));
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
        const newVolume = data.data as NewVolumeMessage;
        setSessionState((prev) =>
          prev.map((session) => {
            if (session.session.processId === newVolume.processId) {
              session.session.volume = newVolume.volume;
              session.session.isMuted = newVolume.isMuted;
            }
            return session;
          })
        );
        if (
          newVolume.processId ===
          sessionStateRef.current[selectedIndexRef.current].session.processId
        ) {
          setVolume(newVolume.volume);
        }
        break;
    }
  };

  const handleChange = (event: Event, value: number | number[]) => {
    setIsGrabbed(true);
    setVolume(value as number);
    return new Promise<void>((resolve) => {
      const connection = ws.getInstance().connection;
      const data: SetVolumeMessage = {
        processId: sessionState[selectedIndex].session.processId,
        volume: value as number,
        isMuted: sessionState[selectedIndex].session.isMuted,
      };
      const request: WebsocketMessage = {
        eventName: "setVolume",
        data: data,
      };
      connection.send(JSON.stringify(request));
      resolve();
    });
  };
  const handleChangeCommitted = (
    event: React.SyntheticEvent | Event,
    value: number | number[]
  ) => {
    setSessionState((prev) => {
      return prev.map((session, index) => {
        if (index === selectedIndexRef.current) {
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
      const request: WebsocketMessage = {
        eventName: "setVolume",
        data: data,
      };

      const connection = ws.getInstance().connection;
      connection.send(JSON.stringify(request));
    }
    setSelectedIndex(index);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        margin: "10px",
      }}
    >
      <Grid container spacing={2}>
        {sessionState.map((state, index) => (
          <Grid item xs={4} sm={3} md={2} lg={1} key={state.session.processId}>
            <VolumeMixerBtn
              onClick={() => {
                onClick(index);
              }}
              isMuted={state.session.isMuted}
              isActive={state.isActive}
              borderColor={btnStyle}
              alt={state.session.name}
              src={state.session.icon}
              size={80}
            />
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
