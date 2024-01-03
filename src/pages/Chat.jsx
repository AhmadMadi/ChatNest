import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { db } from "../config/firebase";

import Appbar from "../components/Appbar";
import MiniDrawer from "../components/MiniDrawer";
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Chat = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [fetchedMessages, setFetchedMessages] = React.useState([]);

  const { user } = React.useContext(UserContext);

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
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* <Appbar
        handleDrawerOpen={() => setIsDrawerOpen(true)}
        isDrawerOpen={isDrawerOpen}
      />
      <MiniDrawer
        isDrawerOpen={isDrawerOpen}
        handleDrawerClose={() => setIsDrawerOpen(false)}
      /> */}
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
        <Box sx={{ height: "75%" }}>
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
                }}
              >
                {message.userId !== user.uid ? message.displayName : ""}
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
    </Box>
  );
};

export default Chat;
