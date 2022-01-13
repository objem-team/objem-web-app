import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { Drawer, DrawerProps, List } from "@mui/material";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const AppDrawer: React.VFC<DrawerProps> = (props) => {
  const [isLock, setIsLock] = React.useState<Boolean>(true);
  const [theme, setTheme] = React.useState("light");

  const widgetLockHandle = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    //todo ウィジェットのロックアンロック
    setIsLock(checked);
  };
  const themeChangeHandle = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    //todo ダークテーマとライトテーマの適応
    if (newAlignment !== null) {
      setTheme(newAlignment);
    }
  };

  return (
    <Drawer open={props.open} onClose={props.onClose}>
      <List sx={{ mx: 3, mt: 1 }}>
        <label>ウィジェットのロック</label>
        <Switch sx={{ ml: 4 }} onChange={widgetLockHandle} />
      </List>

      <List sx={{ mx: 3 }}>
        <label>テーマ</label>
        <ToggleButtonGroup
          color="primary"
          value={theme}
          exclusive
          onChange={themeChangeHandle}
          size="small"
          fullWidth
        >
          <ToggleButton value="light">
            <LightModeIcon />
            ライト
          </ToggleButton>
          <ToggleButton value="dark">
            <DarkModeIcon />
            ダーク
          </ToggleButton>
        </ToggleButtonGroup>
      </List>

      <Button variant="outlined" sx={{ mx: 3, my: 6 }}>
        dissconnect
      </Button>
    </Drawer>
  );
};

export default AppDrawer;
