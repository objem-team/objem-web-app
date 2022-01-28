import React from "react";
import Avatar, { AvatarProps } from "@mui/material/Avatar";

export interface BorderedAvaterProps extends AvatarProps {
  isActive: boolean;
  borderColor: string;
  borderStyle?: string;
  size?: number;
}
const BorderedAvater: React.VFC<BorderedAvaterProps> = (props) => {
  const { size, borderColor, borderStyle, isActive, ...rest } = props;
  return (
    <Avatar
      {...rest}
      sx={{
        width: size || 45,
        height: size || 45,
        borderColor: isActive ? borderColor : "",
        borderStyle: borderStyle || "solid",
        borderWidth: size ? size / 15 + "px" : "3px",
        ...rest.sx,
      }}
    />
  );
};
export default BorderedAvater;
