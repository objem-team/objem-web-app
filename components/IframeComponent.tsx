import * as React from "react";
import { Paper } from "@mui/material";

type IframeComponentProps = {
  src: string;
  height: number;
};

const IframeComponent: React.VFC<IframeComponentProps> = (props) => {
  return (
    <Paper
      sx={{
        width: "90%",
        display: "flex",
      }}
    >
      <iframe
        src={props.src}
        style={{
          width: "100%",
          height: props.height + "px",
          border: "none",
        }}
      ></iframe>
    </Paper>
  );
};

export default IframeComponent;
