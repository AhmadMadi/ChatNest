import { useState, useContext } from "react";
import { Box, Stack, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import styled from "@emotion/styled";

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
        <StyledStack
          spacing={2}
          sx={{
            padding: "3rem",
            borderRadius: "0.3rem",
            backgroundColor: "#000",
            border: "1px solid #fff",
            width: "25rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="/assets/logo.svg" alt="whatsapp logo" width="100" />
          </Box>
          <Typography variant="h6" sx={{ alignSelf: "center", pt: "1.5rem" }}>
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
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography>
              {isSignUp ? "Already have an account?" : "No account?"}
            </Typography>
            <Typography
              onClick={() => setIsSignUp(!isSignUp)}
              sx={{
                cursor: "pointer",
                color: "#0000FF",
                textDecoration: "underline",
              }}
            >
              Click here.
            </Typography>
          </Box>
        </StyledStack>
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

const StyledStack = styled(Stack)({
  "@media (max-width: 600px)": {
    width: "20rem",
  },
  padding: "3rem",
  borderradius: "0.3rem",
  backgroundcolor: "#000",
  border: "1px solid #fff",
  width: "25rem",
});
