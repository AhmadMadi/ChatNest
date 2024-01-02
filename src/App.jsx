import "./App.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useContext, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Register from "./components/Register";
import Chat from "./pages/Chat";
import { UserContext } from "./context/UserContext";
import { auth } from "./config/firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = useContext(UserContext);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user)
      setUser(user);
    });
  }, [setUser]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {isLoggedIn ? <Chat /> : <Register />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
