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

    scrollToDiv.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AppBar position="static">
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 0.5rem",
            height: "8vh",
          }}
        >
          <span>ChatNest</span>
          <Button onClick={handleSignOut}>Sign out</Button>
        </Container>
      </AppBar>
      <Container sx={{ display: "flex", height: "92vh" }} maxWidth="md">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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
                  {message.userId !== user.uid ? (
                    <Typography sx={{ fontWeight: "bold", mr: "1rem" }}>
                      {message.displayName}:
                    </Typography>
                  ) : (
                    ""
                  )}
                  <div ref={scrollToDiv}></div>
                  <Box
                    sx={{
                      bgcolor:
                        message.userId === user.uid
                          ? "primary.main"
                          : "secondary.main",
                      color: "white",
                      py: 1,
                      px: 2,
                      my: "0.2rem",
                      borderRadius: "1rem",
                      maxWidth: "80%",
                    }}
                  >
                    {message.message}
                  </Box>
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
