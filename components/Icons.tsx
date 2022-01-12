import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

const Icons = () => {
  const [active, setActive] = useState("false");

  const btnStyle = "#2196f3";

  const classToggle = (sel: string) => {
    setActive(sel + "true");
  };

  return (
    <Grid item>
      <IconButton
        style={{ background: active == "A" + "true" ? btnStyle : "" }}
        onClick={() => classToggle("A")}
      >
        <Avatar sx={{ width: 60, height: 60 }}>A</Avatar>
      </IconButton>
    </Grid>
  );
};
export default Icons;
