import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, TextField, Button } from "@mui/material";
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
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        userId: user.uid,
        message: messageToSend,
        createdAt: new Date().getTime(),
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar
        handleDrawerOpen={() => setIsDrawerOpen(true)}
        isDrawerOpen={isDrawerOpen}
      />
      <MiniDrawer
        isDrawerOpen={isDrawerOpen}
        handleDrawerClose={() => setIsDrawerOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ height: "75%" }}>
          <DrawerHeader />
          <Box sx={{ height: "100%" }}>
            {fetchedMessages.map((message, index) => (
              <li key={index}>{message.message}</li>
            ))}
          </Box>
        </Box>
        <Box sx={{ display: "flex", marginTop: "1rem" }}>
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
