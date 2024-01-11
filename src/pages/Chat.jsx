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
import { errorCodeMapper } from "../config/firebase";
import { UserContext } from "../context/UserContext";
import { signOut } from "../api";
import Alert from "../components/Alert";

const Chat = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [fetchedMessages, setFetchedMessages] = React.useState([]);
  const [userColors, setUserColors] = React.useState({});
  const [alertData, setAlertData] = React.useState({
    isOpen: false,
    type: "",
    message: "",
  });

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
      if (userColors[message.uid]) return;

      colors[message.uid] = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
    });

    setUserColors({
      ...userColors,
      ...colors,
    });
  }, [fetchedMessages, userColors]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message === "") return;
    const messageToSend = message;
    setMessage("");

    try {
      await addDoc(collection(db, "messages"), {
        uid: user.uid,
        message: messageToSend,
        displayName: user.displayName,
        createdAt: new Date().getTime(),
      });
    } catch (error) {
      setAlertData({
        isOpen: true,
        type: "error",
        message: errorCodeMapper(error.code),
      });
    }
  };

  const onAlertClose = () => {
    setAlertData({
      ...alertData,
      isOpen: false,
    });
  };

  return (
    <>
      <Container maxWidth="md" sx={{ padding: 0 }}>
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
      <Container
        sx={{ display: "flex", height: "92vh", padding: 0 }}
        maxWidth="md"
      >
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
                      message.uid === user.uid ? "flex-end" : "flex-start",
                    alignItems: "center",
                  }}
                >
                  {message.uid !== user.uid && (
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        mr: "0.5rem",
                        color: userColors[message.uid],
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
          <form onSubmit={(e) => sendMessage(e)}>
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
                disabled={!message.length}
                type="submit"
              >
                Send
              </Button>
            </Box>
          </form>
          <Alert
            isOpen={alertData.isOpen}
            type={alertData.type}
            message={alertData.message}
            onAlertClose={onAlertClose}
          />
        </Box>
      </Container>
    </>
  );
};

export default Chat;
