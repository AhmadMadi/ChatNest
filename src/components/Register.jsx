import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, errorCodeMapper } from "../config/firebase";

import { Box, Stack, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Alert from "./Alert";

const Register = () => {
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

      console.log(response);

      await updateProfile(response.user, {
        displayName,
      });
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
            Create account
          </Typography>
          <TextField
            id="displayName"
            label="Display Name"
            variant="outlined"
            required
          />
          <TextField id="email" label="Email" variant="outlined" required />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            required
          />
          <LoadingButton loading={isLoading} variant="outlined" type="submit">
            Register
          </LoadingButton>
        </Stack>
      </form>
      <Alert
        isOpen={alertData.isOpen}
        type={alertData.type}
        message={alertData.message}
      />
    </Box>
  );
};

export default Register;
