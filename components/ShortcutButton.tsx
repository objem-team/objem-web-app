import React from "react";
import BorderedAvater, { BorderedAvaterProps } from "./BorderedAvater";
import { IconButton } from "@mui/material";

type ShortcutButtonProps = Omit<BorderedAvaterProps, "isActive"> & {
  onClick: () => void;
};

const ShortcutButton: React.VFC<ShortcutButtonProps> = (props) => {
  const { onClick, ...rest } = props;
  const [isActive, setIsActive] = React.useState(false);
  const handleClick = () => {
    onClick();
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 500);
  };
  return (
    <IconButton onClick={handleClick}>
      <BorderedAvater isActive={isActive} {...rest} />
    </IconButton>
  );
};

export default ShortcutButton;
