//import * as React from 'react';
//import React, { Component } from 'react';
import React, { useState } from "react";

import Icons from "../components/Icons";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";

const FeatureMixer: React.VFC = () => {
  const [value, setValue] = React.useState<number>(30);
  const [choices, _setChoices] = React.useState(["A", "B", "C", "D", "E", "F"]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const [active, setActive] = useState("false");

  const btnStyle = "#2196f3";

  const classToggle = (sel: string) => {
    setActive(sel + "true");
  };

  return (
    <Box sx={{ m: 2 }}>
      <Box sx={{ gap: 4 }}>
        <Grid
          spacing={3}
          className="Icon"
          container
          direction="row"
          justifyContent="space-between"
        >
          <Grid item>
            <IconButton
              style={{ background: active == "A" + "true" ? btnStyle : "" }}
              onClick={() => classToggle("A")}
            >
              <Avatar sx={{ width: 60, height: 60 }}>A</Avatar>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              style={{ background: active == "B" + "true" ? btnStyle : "" }}
              onClick={() => classToggle("B")}
            >
              <Avatar sx={{ width: 60, height: 60 }}>B</Avatar>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              style={{ background: active == "C" + "true" ? btnStyle : "" }}
              onClick={() => classToggle("C")}
            >
              <Avatar sx={{ width: 60, height: 60 }}>C</Avatar>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              style={{ background: active == "D" + "true" ? btnStyle : "" }}
              onClick={() => classToggle("D")}
            >
              <Avatar sx={{ width: 60, height: 60 }}>D</Avatar>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              style={{ background: active == "E" + "true" ? btnStyle : "" }}
              onClick={() => classToggle("E")}
            >
              <Avatar sx={{ width: 60, height: 60 }}>E</Avatar>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              style={{ background: active == "F" + "true" ? btnStyle : "" }}
              onClick={() => classToggle("F")}
            >
              <Avatar sx={{ width: 60, height: 60 }}>F</Avatar>
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ gap: 4 }}>
        <Grid
          spacing={3}
          className="Icon"
          container
          direction="row"
          justifyContent="space-between"
        >
          {choices.map((choice, index) => (
            <Icons key={index} />
          ))}
        </Grid>
      </Box>

      <Box sx={{ my: 2, mx: 1 }}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <VolumeDown />
          <Slider aria-label="Volume" value={value} onChange={handleChange} />
          <VolumeUp />
        </Stack>
      </Box>
    </Box>
  );
};

export default FeatureMixer;
