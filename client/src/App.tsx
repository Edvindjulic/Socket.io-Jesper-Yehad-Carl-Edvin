import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import SelectUsername from "./components/SelectUsername";
import Sidebar from "./components/Sidebar";
import { useSocket } from "./context/SocketContext";

function App() {
  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);
  const [message, setMessage] = useState("");
  const {
    socket,
    sendMessage,
    messages,
    currentRoom,
    setMessages,
    allMessageHistory,
  } = useSocket();

  useEffect(() => {
    if (currentRoom) {
      setMessages([]);
    }
  }, [currentRoom]);

  const onUsernameSelection = (username: string) => {
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
              {(allMessageHistory[currentRoom!] ?? []).map((message, i) => (
                <li key={i}>
                  {message.username}: {message.message}
                </li>
              ))}
            </ul>
            <form onSubmit={handleSubmit}>
              <input
                name="message"
                placeholder="Write a message..."
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
