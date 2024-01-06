import * as React from "react";
import {
  AppBar,
  Container,
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { db } from "../config/firebase";

import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { UserContext } from "../context/UserContext";
import { signOut } from "../api";

const Chat = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [fetchedMessages, setFetchedMessages] = React.useState([]);
  const [userColors, setUserColors] = React.useState({});
  const scrollToDiv = React.useRef();

  const { user, setUser } = React.useContext(UserContext);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  React.useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(
        query(
          collection(db, "messages"),
          orderBy("createdAt", "asc"),
          limit(50)
        )
      );

      setFetchedMessages(querySnapshot.docs.map((doc) => doc.data()));
      setIsLoading(false);
    };

    getData();

    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt", "asc"), limit(50)),
      (snapshot) => {
        const updatedMessages = snapshot.docs.map((doc) => doc.data());
        setFetchedMessages(updatedMessages);
      }
    );

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    scrollToDiv.current?.scrollIntoView();
  }, [fetchedMessages]);

  React.useEffect(() => {
    const colors = {};

    fetchedMessages.forEach((message) => {
      if (colors[message.userId]) return;
      colors[message.userId] = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
    });

    setUserColors({ colors });
  }, [fetchedMessages]);

  const sendMessage = async () => {
    if (message === "") return;
    const messageToSend = message;
    setMessage("");
    await addDoc(collection(db, "messages"), {
      userId: user.uid,
      message: messageToSend,
      displayName: user.displayName,
      createdAt: new Date().getTime(),
    });
  };

  return (
    <>
      <Container maxWidth="md">
        <AppBar
          position="static"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1rem",
            height: "8vh",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src="/assets/logo.svg" alt="chatnest-logo" width={50} />
            <Typography>ChatNest</Typography>
          </Box>
          <Button onClick={handleSignOut}>Sign out</Button>
        </AppBar>
      </Container>
      <Container sx={{ display: "flex", height: "92vh" }} maxWidth="md">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 3,
            px: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#000",
          }}
        >
          <Box sx={{ height: "78vh", overflow: "auto" }}>
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              fetchedMessages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      message.userId === user.uid ? "flex-end" : "flex-start",
                    alignItems: "center",
                  }}
                >
                  {message.userId !== user.uid && (
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        mr: "0.5rem",
                        color: userColors.colors[message.userId],
                      }}
                    >
                      {message.displayName}:
                    </Typography>
                  )}
                  <Box
                    sx={{
                      color: "white",
                      py: 1,
                      pr: 1,
                      my: "0.2rem",
                      borderRadius: "1rem",
                      maxWidth: "80%",
                    }}
                  >
                    {message.message}
                  </Box>
                  <div ref={scrollToDiv}></div>
                </Box>
              ))
            )}
          </Box>
          <Box sx={{ display: "flex" }}>
            <TextField
              id="messageBox"
              variant="standard"
              placeholder="send a message..."
              fullWidth={true}
              sx={{ marginRight: "2rem" }}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <Button
              variant="contained"
              onClick={() => sendMessage()}
              disabled={!message.length}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Chat;
