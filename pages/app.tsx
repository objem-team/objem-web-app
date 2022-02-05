import React from "react";
import AppHeader from "../components/AppHeader";
import SpotifyWidget from "../components/SpotifyWidget";
import TwitchCommentWidget from "../components/TwitchCommentWidget";
import VolumeMixer from "../components/VolumeMixer";
import YouTubeCommentWidget from "../components/YouTubeCommentWidget";
import { Stack } from "@mui/material";

const app = () => {
  return (
    <div>
      <AppHeader />
      <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
        <SpotifyWidget />
        <VolumeMixer />
        <YouTubeCommentWidget videoId="vWmoAjSeYO8" />
        <TwitchCommentWidget videoId="umitake6102" />
      </Stack>
    </div>
  );
};

export default app;
