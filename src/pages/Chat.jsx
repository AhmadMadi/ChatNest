import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Appbar from "../components/Appbar";
import MiniDrawer from "../components/MiniDrawer";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Chat = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar
        handleDrawerOpen={() => setIsDrawerOpen(true)}
        isDrawerOpen={isDrawerOpen}
      />
      <MiniDrawer
        isDrawerOpen={isDrawerOpen}
        handleDrawerClose={() => setIsDrawerOpen(false)}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>Welcome to ChatNest!!!</Typography>
      </Box>
    </Box>
  );
};

export default Chat;
