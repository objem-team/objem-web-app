import React from "react";
import AppHeader from "../components/AppHeader";
import SpotifyWidget from "../components/SpotifyWidget";
import TwitchCommentWidget from "../components/TwitchCommentWidget";
import VolumeMixer from "../components/VolumeMixer";
import ShortcutWidget from "./ShortcutWidget";
import YouTubeCommentWidget from "./YouTubeCommentWidget";
import Stack from "@mui/material/Stack";

const Application: React.VFC = () => {
  return (
    <div>
      <AppHeader />
      <Stack
        spacing={2}
        sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <SpotifyWidget />
        <VolumeMixer />
        <ShortcutWidget />
        <YouTubeCommentWidget />
        <TwitchCommentWidget />
      </Stack>
    </div>
  );
};
export default Application;
