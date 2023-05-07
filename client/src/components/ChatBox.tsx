import { Box, Button, TextField, Typography, List, ListItem } from "@mui/material";
import React, { useState } from "react";
import { useSocket } from "../context/SocketContext";

const drawerWidth = "20vw";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const { sendMessage, messages, currentRoom } = useSocket();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: drawerWidth,
        backgroundColor: "lightgreen"
      }}
    >
      <Typography variant="h6">Chat in {currentRoom} room</Typography>
      <List>
        {messages.map((message, i) => (
          <ListItem key={i}>
            {message.name}: {message.message}
          </ListItem>
        ))}
      </List>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="message"
          label="Write a message..."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </Box>
    </Box>
  );
}
