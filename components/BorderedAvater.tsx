import React from "react";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { Badge, styled } from "@mui/material";
import Avatar, { AvatarProps } from "@mui/material/Avatar";

interface BorderedAvaterProps extends AvatarProps {
  isMuted: boolean;
  isActive: boolean;
  borderColor: string;
  borderStyle?: string;
  size?: number;
}

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const BorderedAvater: React.VFC<BorderedAvaterProps> = (props) => {
  const { size, borderColor, borderStyle, isActive, isMuted, ...rest } = props;
  return (
    <Badge
      invisible={!isMuted}
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={
        <SmallAvatar>
          <VolumeOffIcon sx={{ color: "red", backgroundColor: "white" }} />
        </SmallAvatar>
      }
    >
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
    </Badge>
  );
};

export default BorderedAvater;
