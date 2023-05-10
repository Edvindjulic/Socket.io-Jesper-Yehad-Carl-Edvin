import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketContext";

const drawerWidth = "20vw";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const { socket, sendMessage, messages, currentRoom, allMessageHistory } =
    useSocket();
  const latestMessageRef = useRef<HTMLLIElement>(null);
  const [typing, setTyping] = useState(false);

  const submitMessage = useCallback(() => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  }, [message, sendMessage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMessage();
  };
  const handleKeyPress = () => {
    if (!typing && currentRoom && message.trim()) {
      socket.emit("typing", currentRoom, true);
      setTyping(true);
    }
  };

  const handleBlur = () => {
    if (typing) {
      socket.emit("typing", currentRoom, false);
      setTyping(false);
    }
  };

  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const onTyping = (username: string, isTyping: boolean) => {
      setTypingUsers((users) => {
        if (isTyping) {
          return [...users, username];
        } else {
          return users.filter((user) => user !== username);
        }
      });
      setTyping(isTyping);
    };

    socket.on("typing", onTyping);

    return () => {
      socket.off("typing", onTyping);
    };
  }, [socket]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: drawerWidth,
        position: "relative",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          width: "60vw",
          padding: "0.5rem",
          textAlign: "center",
          backgroundColor: "#4C79B5",
        }}
      >
        Chat in <span style={{ fontWeight: "bold" }}>{currentRoom}</span> room
      </Typography>
      <Box
        sx={{
          width: "60vw",
          height: "80vh",
          marginBottom: "1rem",
          overflowY: "auto",
          border: "1px solid #7D99B4",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <List>
            {(allMessageHistory[currentRoom!] ?? []).map((message, i) => (
              <ListItem
                key={i}
                ref={i === messages.length - 1 ? latestMessageRef : null}
                sx={{
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {message.username}: {message.message}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          {typingUsers.length > 0 && (
            <Typography
              sx={{
                padding: "0.5rem",
                backgroundColor: "#E6EEF4",
                textAlign: "center",
                width: "100%",
              }}
            >
              {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"}{" "}
              typing...
            </Typography>
          )}
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
            backgroundColor: "#4C79B5",
            padding: "1rem",
          }}
        >
          <TextField
            InputProps={{
              inputComponent: TextareaAutosize,
              inputProps: { minRows: 1, maxRows: 4, style: { resize: "none" } },
            }}
            name="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submitMessage();
              }
            }}
            onInput={handleKeyPress}
            onBlur={handleBlur}
            variant="outlined"
            size="small"
            sx={{
              width: "70%",
              backgroundColor: "white",
              borderRadius: "4px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#7D99B4",
                borderWidth: "2px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#7D99B4",
                borderWidth: "2px",
              },
              "& .MuiOutlinedInput-input": {
                borderRadius: "4px",
                borderColor: "#7D99B4",
              },
              "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#7D99B4",
                  borderWidth: "2px",
                },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disableElevation
            sx={{
              width: "10%",
              marginLeft: "1rem",
              backgroundColor: "#E6EEF4",
              color: "#7D99B4",
              "&:hover": {
                backgroundColor: "#E6EEF4",
                boxShadow: "none",
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
