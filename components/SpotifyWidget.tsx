import aspida, { HTTPError } from "@aspida/fetch";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { BsSpotify } from "react-icons/bs";
import api from "../api/$api";
import { nextState } from "../src/RepeatStatesUtil";
import { getColor, StolenColor } from "../src/color";
import { fetchConfig } from "../src/spotifyFetchConfig";
import { SpotifyWedgetItem } from "../src/types/SpotifyWedgetItem";
import { CurrentPlaybackContext } from "../src/types/spotify/CurrentPlaybackContext";
import { RepeatState } from "../src/types/spotify/RepeatState";
import LoopIcon from "@mui/icons-material/Loop";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

import {
  Badge,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

const SpotifyWidget: React.VFC = () => {
  const client = api(aspida(fetch, fetchConfig));
  const [isloggedin, setIsloggedin] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffleState, setShuffleState] = useState(false);
  const [repeatState, setRepeatState] = useState<RepeatState>("off");
  const [CardColor, setCardColor] = useState<StolenColor>({
    backGroundColor: "white",
    contentColor: "black",
  });
  const [item, setItem] = useState<SpotifyWedgetItem>();

  const fetchPlayingcontext = async () => {
    const context = await client
      .$get()
      .then(setPlayingContext)
      .catch((e) => {
        if (e instanceof HTTPError) {
          if (e.response.status === 401) {
            setIsloggedin(false);
          }
        }
        console.log(e instanceof HTTPError);
      });
  };
  const setPlayingContext = (context: CurrentPlaybackContext) => {
    setIsloggedin(true);
    let newItem: SpotifyWedgetItem;
    setIsPlaying(context.is_playing);
    setShuffleState(context.shuffle_state);
    setRepeatState(context.repeat_state);
    const item = context.item;
    if (!item) return;
    console.log(item);
    item.kind = `full${item.hasOwnProperty("show") ? "episode" : "track"}`;
    switch (item.kind) {
      case "fulltrack":
        newItem = {
          title: item.name,
          artists: item.artists.map((artist) => artist.name).join(", "),
          image_url: item.album.images[0].url,
        };
        break;
      case "fullepisode":
        newItem = {
          title: item.name,
          artists: item.show.publisher,
          image_url: item.show.images[0].url,
        };
        break;
      default:
        return;
    }
    setItem(newItem);
  };

  useEffect(() => {
    fetchPlayingcontext().then(/*ignore*/);
    const interbal = isloggedin ? 2 * 1000 * 60 : 5 * 1000;
    const interval = setInterval(fetchPlayingcontext, interbal);
    return () => {
      clearInterval(interval);
    };
  }, [isloggedin]);

  useEffect(() => {
    if (!item) return;
    getColor(item.image_url).then(setCardColor);
  }, [item]);

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
    fetchPlayingcontext();
  };
  const previous = async () => {
    await client.previous.$put();
    fetchPlayingcontext();
  };
  const pauseResume = async () => {
    if (isPlaying) {
      await pause();
    } else {
      await resume();
    }
  };
  const fetchRepeat = async () => {
    const newState = await client.repeat.$put({
      body: { repeatState: nextState(repeatState) },
    });
    setRepeatState(newState);
  };
  const fetchShaffle = async () => {
    const state = !shuffleState;
    const newState = await client.shuffle.$put({
      body: { shaffleState: state },
    });
    setShuffleState(newState);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        margin: "10px",
      }}
    >
      <Card sx={{ backgroundColor: CardColor.backGroundColor }}>
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
          <Grid
            item
            sx={{ paddingLeft: "20px", color: CardColor.contentColor }}
          >
            Spotify
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {isloggedin ? (
            <>
              <CardContent>
                <Typography
                  component="div"
                  variant="h6"
                  sx={{
                    color: CardColor.contentColor,
                    whiteSpace: "unset",
                    wordBreak: "break-word",
                  }}
                >
                  {item ? (
                    item.title
                  ) : (
                    <Skeleton variant="text" width={"10vw"} />
                  )}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color={CardColor.contentColor}
                  component="div"
                >
                  {item ? item.artists : <Skeleton />}
                </Typography>
              </CardContent>
              <div>
                {item ? (
                  <CardMedia
                    component="img"
                    sx={{
                      width: "20%",
                      maxHeight: "140px",
                      minWidth: "140px",
                      padding: "8px",
                      objectFit: "scale-down",
                    }}
                    image={item.image_url}
                    alt="album cover"
                  />
                ) : (
                  <Skeleton
                    variant="rectangular"
                    width={"120px"}
                    sx={{
                      marginLeft: "3%",
                      minHeight: "120px",
                      minWidth: "120px",
                    }}
                  />
                )}
              </div>
            </>
          ) : (
            <CardContent>
              <Button
                variant="contained"
                size="large"
                target="_blank"
                href={process.env.NEXT_PUBLIC_WORKER_URL + "login"}
                endIcon={<BsSpotify />}
                sx={{ backgroundColor: "#1DB954", color: "white" }}
              >
                {" "}
                Login with SpotifyPremium
              </Button>
            </CardContent>
          )}
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <IconButton
              aria-label="previous"
              sx={{ color: CardColor.contentColor }}
              onClick={fetchShaffle}
            >
              <Badge color="secondary" invisible={!shuffleState} variant="dot">
                <ShuffleIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="previous"
              sx={{ color: CardColor.contentColor }}
              onClick={previous}
            >
              <SkipPreviousIcon />
            </IconButton>
            <IconButton
              aria-label="play/pause"
              sx={{ color: CardColor.contentColor }}
              onClick={pauseResume}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton
              aria-label="next"
              sx={{ color: CardColor.contentColor }}
              onClick={next}
            >
              <SkipNextIcon />
            </IconButton>
            <IconButton
              aria-label="rpeat"
              sx={{ color: CardColor.contentColor }}
              onClick={fetchRepeat}
            >
              <Badge
                color="secondary"
                invisible={repeatState == "off"}
                variant={repeatState == "context" ? "dot" : "standard"}
                badgeContent={1}
              >
                <LoopIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Paper>
  );
};
export default SpotifyWidget;
