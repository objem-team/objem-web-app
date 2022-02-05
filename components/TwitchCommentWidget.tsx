import * as React from "react";
import IframeComponent from "./IframeComponent";

type TwitchCommentWidgetProps = {
  videoId: string;
};

const TwitchCommentWidget: React.VFC<TwitchCommentWidgetProps> = (props) => {
  return (
    <IframeComponent
      src={
        "https://www.twitch.tv/embed/" +
        props.videoId +
        "/chat?parent=localhost"
      }
      height={400}
    />
  );
};

export default TwitchCommentWidget;
