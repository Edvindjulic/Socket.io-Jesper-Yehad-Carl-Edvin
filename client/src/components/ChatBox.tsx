import { Box, Button, TextField, Typography, List, ListItem } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useSocket } from "../context/SocketContext";

const drawerWidth = "20vw";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const { sendMessage, messages, currentRoom } = useSocket();
  const latestMessageRef = useRef<HTMLLIElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: drawerWidth,
        backgroundColor: "lightgreen",
      }}
    >
      <Typography variant="h6">Chat in {currentRoom} room</Typography>
      <Box
        sx={{
          width: "60vw",
          height: "80vh",
          backgroundColor: "lightblue",
          marginBottom: "1rem",
          overflowY: "auto",
        }}
      >
        <List>
          {messages.map((message, i) => (
            <ListItem key={i} ref={i === messages.length - 1 ? latestMessageRef : null}>
              {message.name}: {message.message}
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <TextField
          name="message"
          label="Write a message..."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            width: "50%",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: "10%",
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
