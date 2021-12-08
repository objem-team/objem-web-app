import React from "react";
import AppDrawer from "../components/AppDrawer";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

const AppHeader: React.VFC = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (open: boolean) => (_event: React.MouseEvent) => {
    setOpen(open);
  };
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto" }}>
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
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
