import React from "react";
import AppDrawer from "../components/AppDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

const app = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto" }}>
      <AppDrawer open={true} />
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer">
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

export default app;
