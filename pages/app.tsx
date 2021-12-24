import React from "react";
import AppHeader from "../components/AppHeader";
import FeatureMixer from "../components/FeatureMixer";
import SpotifyWidget from "../components/SpotifyWidget";

const app = () => {
  return (
    <div>
      <AppHeader />
      <SpotifyWidget />
      <FeatureMixer />
    </div>
  );
};

export default app;
