import { Box, Stack, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import PropTypes from "prop-types";

const Register = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <form onSubmit={props.handleSubmit}>
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
          <LoadingButton
            loading={props.isLoading}
            variant="outlined"
            type="submit"
          >
            Register
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;

Register.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
