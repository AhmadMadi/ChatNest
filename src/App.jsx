import "./App.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, errorCodeMapper } from "./config/firebase";

import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Register from "./components/Register";
import Alert from "./components/Alert";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertData, setAlertData] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    const displayName = e.target.displayName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(response.user, {
        displayName,
      });

      setUser(response.user);
    } catch (error) {
      setAlertData({
        isOpen: true,
        type: "error",
        message: errorCodeMapper(error.code),
      });
    }

    setIsLoading(false);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {user ? (
          <>Hello!!!</>
        ) : (
          <Register handleSubmit={handleSubmit} isLoading={isLoading} />
        )}
        <Alert
          isOpen={alertData.isOpen}
          type={alertData.type}
          message={alertData.message}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
