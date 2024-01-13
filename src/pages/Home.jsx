import { useState, useContext } from "react";
import PropTypes from "prop-types";

import { Box, Stack, Typography, Button, Checkbox } from "@mui/material";
import styled from "@emotion/styled";

import { UserContext } from "../context/UserContext";

import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

const Home = () => {
  const [isConditionChecked, setIsConditionChecked] = useState(false);

  const { setUser } = useContext(UserContext);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const response = await signInWithRedirect(auth, provider);
    setUser(response.user);
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
        {/* <Button
          disabled={!isConditionChecked}
          variant="outlined"
          type="submit"
          onClick={onGetStarted}
        >
          Get started
        </Button> */}
        <Button
          variant="outlined"
          disabled={!isConditionChecked}
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      </StyledStack>
    </Box>
  );
};

export default Home;

Home.propTypes = {
  onGetStarted: PropTypes.func.isRequired,
};

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
