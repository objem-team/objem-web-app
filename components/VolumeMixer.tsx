import React, { useEffect, useState } from "react";
import { VolumeSession } from "../src/type/VolumeSession";
import BorderedAvater from "./BorderedAvater";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { IconButton, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";

type VolumeMixerState = {
  session: VolumeSession;
  isActive: boolean;
};
type VolumeMixerProps = {
  sessions: VolumeSession[];
};

const VolumeMixer: React.VFC<VolumeMixerProps> = (props) => {
  const [sessionState, setSessionState] = useState<VolumeMixerState[]>([]);
  const [selectedSession, setSelectedSession] = useState<Number>(
    Number.NEGATIVE_INFINITY
  );
  const [volume, setVolume] = useState(0);
  const btnStyle = "#2196f3";
  useEffect(() => {
    setSessionState(
      props.sessions.map((session) => ({
        session,
        isActive: false,
      }))
    );

    //indexの0番目を選択状態にする index or object or id
  }, [props.sessions]);

  useEffect(() => {
    setSessionState((prev) =>
      prev.map((session) => ({
        ...session,
        isActive: session.session.id === selectedSession,
      }))
    );
    const session = sessionState.find(
      (state) => state.session.id == selectedSession
    );
    const volume = session ? session.session.volume : 0;
    setVolume(volume);
  }, [props.sessions, selectedSession, sessionState]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
    setSessionState((prev) =>
      prev.map((session) => {
        if (session.session.id === selectedSession) {
          session.session.volume = newValue;
        }
        return session;
      })
    );
  };

  return (
    <Paper>
      <Grid container spacing={2}>
        {sessionState.map((state) => (
          <Grid item xs={3} sm={3} md={2} lg={2} key={state.session.id}>
            <IconButton
              onClick={() => {
                setSelectedSession(state.session.id);
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
        <Slider aria-label="Volume" value={volume} onChange={handleChange} />
        <VolumeUp />
      </Stack>
    </Paper>
  );
};

export default VolumeMixer;
