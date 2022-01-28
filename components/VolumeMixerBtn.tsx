import React from "react";
import BorderedAvater, { BorderedAvaterProps } from "./BorderedAvater";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { Badge, IconButton, styled } from "@mui/material";
import Avatar from "@mui/material/Avatar";

interface VolumeMixerBtnProps extends BorderedAvaterProps {
  onClick: () => void;
  isMuted: boolean;
}

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const VolumeMixerBtn: React.VFC<VolumeMixerBtnProps> = (props) => {
  const { isMuted, ...rest } = props;
  return (
    <IconButton onClick={props.onClick}>
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
        <BorderedAvater {...rest} />
      </Badge>
    </IconButton>
  );
};

export default VolumeMixerBtn;
