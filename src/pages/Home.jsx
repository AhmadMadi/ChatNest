import { useState, useContext } from "react";
import GoogleIcon from "@mui/icons-material/Google";

import { Box, Stack, Typography, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import styled from "@emotion/styled";

import { UserContext } from "../context/UserContext";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase";

const Home = () => {
  const [isConditionChecked, setIsConditionChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(UserContext);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        setUser(response.user);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
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
          <img src="/assets/logo.svg" alt="chatnest-logo" width="100" />
        </Box>
        <Typography variant="h5" sx={{ textAlign: "center", mt: "0.5rem" }}>
          Welcome to ChatNest!
        </Typography>
        <Typography variant="p" sx={{ textAlign: "center", pt: "0.5rem" }}>
          A chat demo project by AhmadMadi.
        </Typography>
        <Box sx={{ display: "flex", pt: "2rem" }}>
          <Checkbox
            required
            checked={isConditionChecked}
            onChange={() => setIsConditionChecked(!isConditionChecked)}
          />
          <Typography>I understand I will be banned for bad words.</Typography>
        </Box>
        <LoadingButton
          variant="outlined"
          disabled={!isConditionChecked}
          onClick={signInWithGoogle}
          loading={isLoading}
        >
          <Typography variant="p">Sign in with</Typography>
          <GoogleIcon fontSize="small" sx={{ ml: "0.5rem", mb: "0.2rem" }} />
        </LoadingButton>
      </StyledStack>
    </Box>
  );
};

export default Home;

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
