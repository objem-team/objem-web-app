import React from "react";
import AppDrawer from "../components/AppDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

const AppHeader: React.VFC = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (open: boolean) => (_: React.MouseEvent) => {
    setOpen(open);
  };
  return (
    <AppBar position="static" color="primary" sx={{ top: "auto" }}>
      <AppDrawer open={open} onClose={toggleDrawer(false)} />
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 3 }}>
          Objem
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
