import "./App.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useContext, useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Register from "./pages/Register";
import Chat from "./pages/Chat";
import { UserContext } from "./context/UserContext";
import { auth } from "./config/firebase";
import Home from "./pages/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const { setUser } = useContext(UserContext);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setUser(user);
      setIsLoading(false);
    });
  }, [setUser]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : !isStarted ? (
          <Home onGetStarted={() => setIsStarted(true)} />
        ) : isLoggedIn ? (
          <Chat />
        ) : (
          <Register />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
