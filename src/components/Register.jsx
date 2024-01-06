import { useState, useContext } from "react";
import { Box, Stack, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { signUp, signIn } from "../api";
import Alert from "../components/Alert";
import { errorCodeMapper } from "../config/firebase";
import UserContext from "../context/UserContext";

const Register = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [alertData, setAlertData] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const { setUser } = useContext(UserContext);

  const onAlertClose = () => {
    setAlertData({
      ...alertData,
      isOpen: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const displayName = e.target.displayName?.value || "";
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      let user = {};

      switch (isSignUp) {
        case true:
          user = await signUp({ displayName, email, password });
          break;
        case false:
          user = await signIn({ email, password });
          break;
        default:
          break;
      }

      setUser(user);
    } catch (error) {
      setAlertData({
        isOpen: true,
        type: "error",
        message: errorCodeMapper(error.code),
      });
    }

    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={2}
          sx={{
            padding: "3rem",
            borderRadius: "0.3rem",
          }}
        >
          <Typography variant="h6" sx={{ alignSelf: "center" }}>
            {isSignUp ? "Create account" : "Welcome back!"}
          </Typography>
          {isSignUp && (
            <TextField
              id="displayName"
              label="Display Name"
              variant="outlined"
              required
            />
          )}
          <TextField id="email" label="Email" variant="outlined" required />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            required
          />
          <LoadingButton loading={isLoading} variant="outlined" type="submit">
            {isSignUp ? "Register" : "Login"}
          </LoadingButton>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer" }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Click here."
              : "No account? Click here."}
          </Typography>
        </Stack>
      </form>
      <Alert
        isOpen={alertData.isOpen}
        type={alertData.type}
        message={alertData.message}
        onAlertClose={onAlertClose}
      />
    </Box>
  );
};

export default Register;
