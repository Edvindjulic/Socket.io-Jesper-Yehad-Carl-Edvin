import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  TextareaAutosize,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketContext";

export default function ChatBox() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [message, setMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  const { socket, sendMessage, messages, currentRoom, allMessageHistory, users } = useSocket();

  const latestMessageRef = useRef<HTMLLIElement>(null);
  const [typing, setTyping] = useState(false);
  const timerRef = useRef<number>();

  const submitMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMessage();
  };

  const handleMessageChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    if (!timerRef.current) {
      socket.emit("typing", currentRoom, true);
    }

    // debounce
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      socket.emit("typing", currentRoom, false);
      timerRef.current = undefined;
    }, 5000);
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

  const getChatHeader = () => {
    const CurrentUserID = sessionStorage.getItem("userID");
    const roomPattern = /DM-(\d+)-(\d+)/;
    const match = currentRoom!.match(roomPattern);

    if (match) {
      const [, firstID, secondID] = match;
      if (firstID === CurrentUserID && secondID === CurrentUserID) {
        return "You're chatting with yourself";
      } else {
        const otherUserID = firstID === CurrentUserID ? secondID : firstID;
        const otherUser = users.find((user) => user.userID === otherUserID);
        const otherUserName = otherUser ? otherUser.username : "Unknown";
        return (
          <span>
            Private conversation with <span style={{ fontWeight: "bold" }}>{otherUserName}</span>{" "}
          </span>
        );
      }
    } else {
      return (
        <span>
          Currently in <span style={{ fontWeight: "bold" }}>{currentRoom}</span>
        </span>
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: isMobile || isTablet ? 0 : "20vw",
        position: "relative",
        marginTop: "1rem",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          width: isMobile ? "90vw" : isTablet ? "80vw" : "60vw",
          padding: "0.5rem",
          textAlign: "center",
          backgroundColor: "#4C79B5",
        }}
      >
        {getChatHeader()}
      </Typography>
      <Box
        sx={{
          width: isMobile ? "90vw" : isTablet ? "80vw" : "60vw",
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
              {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"} typing...
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
            onChange={handleMessageChanged}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submitMessage();
              }
            }}
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
              "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
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
