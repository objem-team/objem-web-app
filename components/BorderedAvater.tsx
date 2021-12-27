import React from "react";
import Avatar, { AvatarProps } from "@mui/material/Avatar";

interface BorderedAvaterProps extends AvatarProps {
  isActive: boolean;
  borderColor: string;
  borderStyle?: string;
  size?: number;
}

const BorderedAvater: React.VFC<BorderedAvaterProps> = (props) => {
  return (
    <Avatar
      {...props}
      sx={{
        width: props.size || 45,
        height: props.size || 45,
        borderColor: props.isActive ? props.borderColor : "",
        borderStyle: props.borderStyle || "solid",
        borderWidth: props.size ? props.size / 15 + "px" : "3px",
        ...props.sx,
      }}
    />
  );
};

export default BorderedAvater;
