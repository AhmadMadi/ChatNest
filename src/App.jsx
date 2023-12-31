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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useContext(UserContext);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    console.log("yoooo");
    setIsLoggedIn(!!user);
  }, [user]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {/* {isLoggedIn ? <Chat /> : <Register />} */}
        <Chat />
      </Container>
    </ThemeProvider>
  );
}

export default App;
