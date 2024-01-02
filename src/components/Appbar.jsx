import PropTypes from "prop-types";

import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { signout } from "../api/signout";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Appbar = (props) => {
  const open = props.isDrawerOpen;

  const signoutUser = () => {
    signout();
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          ChatNest
        </Typography>
        <Button onClick={() => signoutUser()}>Sign out</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;

Appbar.propTypes = {
  handleDrawerOpen: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
};
