import * as React from "react";
import IframeComponent from "./IframeComponent";
type YouTubeCommentWidgetProps = {
  videoId: string;
};

const YouTubeCommentWidget: React.VFC<YouTubeCommentWidgetProps> = (props) => {
  return (
    <IframeComponent
      src={
        "https://www.youtube.com/live_chat?v=" +
        props.videoId +
        "&embed_domain=localhost"
      }
      height={400}
    />
  );
};
export default YouTubeCommentWidget;
