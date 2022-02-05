import React from "react";
import AppHeader from "../components/AppHeader";
import SpotifyWidget from "../components/SpotifyWidget";
import TwitchCommentWidget from "../components/TwitchCommentWidget";
import VolumeMixer from "../components/VolumeMixer";
import YouTubeCommentWidget from "../components/YouTubeCommentWidget";

const app = () => {
  return (
    <div>
      <AppHeader />
      <SpotifyWidget />
      <VolumeMixer />
      <YouTubeCommentWidget videoId="Q23lj-4en38" />
      <TwitchCommentWidget videoId="umitake6102" />
    </div>
  );
};

export default app;
