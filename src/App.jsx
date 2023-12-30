import "./App.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Container } from "@mui/material";
import Register from "./components/Register";

function App() {
  return (
    <Container maxWidth="lg">
      <Register />
    </Container>
  );
}

export default App;
