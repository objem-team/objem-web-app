import React from "react";
import AppHeader from "../components/AppHeader";
import SpotifyWidget from "../components/SpotifyWidget";
import VolumeMixer from "../components/VolumeMixer";

const Application: React.VFC = () => {
  return (
    <div>
      <AppHeader />
      <SpotifyWidget />
      <VolumeMixer />
    </div>
  );
};
export default Application;
