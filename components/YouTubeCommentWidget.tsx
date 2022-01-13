import * as React from "react";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";

const YouTubeCommentWidget: React.VFC = () => {
  return (
    <Paper
      elevation={10}
      sx={{
        margin: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 10,
            width: 1500,
            height: 500,
          },
        }}
      >
        <iframe
          src="https://www.youtube.com/live_chat?v=8I8rsDC2KUg&embed_domain=localhost"
          height="500"
          width="350"
        ></iframe>
      </Box>
    </Paper>
  );
};
//Twitchのコメント
/*
  <iframe
      id="chat_embed"
      src="https://www.twitch.tv/embed/umitake6102/chat?parent=localhost"
      height="500"
      width="350">
  </iframe> 
*/

//YouTubeのコメント
/*
<iframe
    src="https://www.youtube.com/live_chat?v=8I8rsDC2KUg&embed_domain=localhost"
    height="500"
    width="350">
</iframe> 

*/

export default YouTubeCommentWidget;
