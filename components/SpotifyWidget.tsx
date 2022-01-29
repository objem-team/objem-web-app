import aspida, { HTTPError } from "@aspida/fetch";
import Image from "next/image";
import React, { useState } from "react";
import api from "../api/$api";
import { fetchConfig } from "../src/spotifyFetchConfig";
import LoopIcon from "@mui/icons-material/Loop";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
const SpotifyWidget: React.VFC = () => {
  const client = api(aspida(fetch, fetchConfig));
  const [isPlaying, setIsPlaying] = useState(false);

  const pause = async () => {
    await client.pause
      .$put()
      .then(() => setIsPlaying(false))
      .catch((e) => {
        if (e instanceof HTTPError && e.response.status == 403)
          setIsPlaying(false);
      });
  };
  const resume = async () => {
    await client.resume
      .$put()
      .then(() => setIsPlaying(true))
      .catch((e) => {
        if (e instanceof HTTPError && e.response.status == 403)
          setIsPlaying(true);
      });
  };
  const next = async () => {
    await client.next.$put();
  };
  const previous = async () => {
    await client.previous.$put();
  };
  const pauseResume = async () => {
    if (isPlaying) {
      await pause();
    } else {
      await resume();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        margin: "10px",
      }}
    >
      <Card>
        <Grid
          container
          direction="row"
          alignItems="center"
          paddingTop="8px"
          paddingLeft="8px"
        >
          <Grid
            item
            sx={{
              position: "absolute",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Image
              src="/Spotify_Icon_RGB_Green.png"
              width="20px"
              height="20px"
              alt="logo"
            />
          </Grid>
          <Grid item sx={{ paddingLeft: "20px" }}>
            Spotify
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CardContent>
            <Typography
              component="div"
              variant="h6"
              sx={{
                whiteSpace: "unset",
                wordBreak: "break-word",
              }}
            >
              夜に駆ける
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              YOASOBI
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: "20%",
              maxHeight: "140px",
              minWidth: "100px",
              padding: "8px",
              objectFit: "scale-down",
            }}
            image="https://i.scdn.co/image/ab67616d0000b273c5716278abba6a103ad13aa7"
            alt="Live from space album cover"
          />
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <IconButton aria-label="previous">
              <ShuffleIcon />
            </IconButton>
            <IconButton aria-label="previous" onClick={previous}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label="play/pause" onClick={pauseResume}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton aria-label="next" onClick={next}>
              <SkipNextIcon />
            </IconButton>
            <IconButton aria-label="loop">
              <LoopIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Paper>
  );
};
export default SpotifyWidget;
