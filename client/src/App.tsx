import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import SelectUsername from "./components/SelectUsername";
import Sidebar from "./components/Sidebar";
import { useSocket } from "./context/SocketContext";

function App() {
  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const { socket, sendMessage, messages, currentRoom, setMessages } = useSocket();

  useEffect(() => {
    if (currentRoom) {
      setMessages([]);
    }
  }, [currentRoom]);

  const onUsernameSelection = (username: string) => {
    setSelectedUsername(username);
    setUsernameAlreadySelected(true);
    if (socket) {
      socket.auth = { username };
      socket.connect();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  const handleKeyPress = () => {
    if (!typing) {
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

  return (
    <>
      {!usernameAlreadySelected ? (
        <SelectUsername onInput={onUsernameSelection} />
      ) : (
        <Box
          sx={{
            height: "100vh",
            background:
              "linear-gradient(180deg, rgba(202, 221, 240, 1) 0%, rgba(230, 237, 248, 0) 100%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>Chat?</Box>
            <ul>
              {messages.map((message, i) => (
                <li key={i}>
                  {message.name}: {message.message}
                </li>
              ))}
            </ul>
            {typing && <div>{selectedUsername} is typing...</div>}
            <form onSubmit={handleSubmit}>
              <input
                name="message"
                placeholder="Write a message..."
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleBlur}
              />
              <button type="submit">Send</button>
            </form>
          </Box>

          <Sidebar />
        </Box>
      )}
    </>
  );
}

export default App;
