import React from "react";
import AppHeader from "../components/AppHeader";
import SpotifyWidget from "../components/SpotifyWidget";
import VolumeMixer from "../components/VolumeMixer";
import ShortcutWidget from "./ShortcutWidget";
import Stack from "@mui/material/Stack";

const Application: React.VFC = () => {
  return (
    <div>
      <AppHeader />
      <Stack>
        <SpotifyWidget />
        <VolumeMixer />
        <ShortcutWidget />
      </Stack>
    </div>
  );
};
export default Application;
