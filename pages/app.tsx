import React from "react";
import AppHeader from "../components/AppHeader";
import TwitchCommentWidget from "../components/TwitchCommentWidget";
import YouTubeCommentWidget from "../components/YouTubeCommentWidget";
const app = () => {
  return (
    <div>
      <AppHeader />
      <YouTubeCommentWidget videoId="Q23lj-4en38" />
      <TwitchCommentWidget videoId="umitake6102" />
    </div>
  );
};

export default app;
