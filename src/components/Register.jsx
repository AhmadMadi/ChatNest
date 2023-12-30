import { Box, Stack, Typography, TextField, Button } from "@mui/material";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target.displayName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(displayName, email, password);
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
          <Button variant="outlined" type="submit">
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;
