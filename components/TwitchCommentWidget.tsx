import * as React from "react";
import { WebsocketMessage } from "../src/types/WebsocketMessage";
import { websocket as ws } from "../src/websocket";
import IframeComponent from "./IframeComponent";
import { Skeleton } from "@mui/material";

const TwitchCommentWidget: React.VFC = () => {
  const [visible, setVisible] = React.useState(true);
  const [videoId, setVideoId] = React.useState<string>("");
  React.useEffect(() => {
    const connection = ws.getInstance().connection;
    connection.addEventListener("message", onMassage);
    if (connection.readyState > 0) {
      requestStreamURL();
    } else {
      connection.addEventListener("open", requestStreamURL);
    }
    return () => {
      connection.removeEventListener("message", onMassage);
      connection.removeEventListener("open", requestStreamURL);
    };
  }, []);

  const onMassage = (event: MessageEvent) => {
    const data = JSON.parse(event.data) as WebsocketMessage;
    switch (data.eventName) {
      case "TwitchVideoId":
        const videoId = data.data;
        if (!videoId) setVisible(false);
        setVideoId(videoId);
        break;
    }
  };
  const requestStreamURL = () => {
    const connection = ws.getInstance().connection;
    const request: WebsocketMessage = {
      eventName: "requestTwitchVideoId",
      data: "this is requestShortcuts",
    };
    console.log("send");
    connection.send(JSON.stringify(request));
  };
  return (
    <>
      {visible && videoId ? (
        <IframeComponent
          src={
            "https://www.twitch.tv/embed/" + videoId + "/chat?parent=localhost"
          }
          height={400}
        />
      ) : (
        <Skeleton variant="rectangular" width={"90vw"} height={400} />
      )}
    </>
  );
};

export default TwitchCommentWidget;
