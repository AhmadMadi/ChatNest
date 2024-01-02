import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, TextField, Button } from "@mui/material";

import Appbar from "../components/Appbar";
import MiniDrawer from "../components/MiniDrawer";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ height: "75%" }}>
          <DrawerHeader />
          <Box sx={{ height: "100%", backgroundColor: "green" }}>
            Welcome to ChatNest!!!
          </Box>
        </Box>
        <Box sx={{ display: "flex", backgroundColor: "red" }}>
          <TextField
            id="messageBox"
            variant="standard"
            placeholder="send a message..."
            fullWidth={true}
            multiline
            sx={{ marginRight: "2rem" }}
          />
          <Button variant="contained">Send</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
