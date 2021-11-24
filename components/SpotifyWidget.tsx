import Image from "next/image";
import React from "react";
import LoopIcon from "@mui/icons-material/Loop";
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
              non player girl - nyankobrk 2p ver.
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              somunia
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
            image="https://i.scdn.co/image/ab67616d0000b273652f35100baaf5183a74b03d"
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
            <IconButton aria-label="previous">
              <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="next">
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
