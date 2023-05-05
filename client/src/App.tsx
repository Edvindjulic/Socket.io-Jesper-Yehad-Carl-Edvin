import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import SelectUsername from "./components/SelectUsername";
import Sidebar from "./components/Sidebar";
import { useSocket } from "./context/SocketContext";

function App() {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<string[]>([]);
  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const handleHistory = (history: string[]) => {
      setMessages(history);
    };

    const handleMessage = (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("history", handleHistory);
    socket.on("message", handleMessage);

    return () => {
      socket.off("history", handleHistory);
      socket.off("message", handleMessage);
    };
  }, [socket]);

  const onUsernameSelection = (username: string) => {
    setUsernameAlreadySelected(true);
    if (socket) {
      socket.auth = { username };
      socket.connect();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messageInput = event.currentTarget.elements.namedItem(
      "message"
    ) as HTMLInputElement;
    const message = messageInput.value;
    socket.emit("message", message);
    console.log("Sent message:", message);
    messageInput.value = "";
  };

  return (
    <>
      {!usernameAlreadySelected ? (
        <SelectUsername onInput={onUsernameSelection} />
      ) : (
        <Box sx={{
          height: "100vh",
          background:
          "linear-gradient(180deg, rgba(202, 221, 240, 1) 0%, rgba(230, 237, 248, 0) 100%)",
        }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>Chat?</Box>
            <ul>
              {messages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
            <form onSubmit={handleSubmit}>
              <input type="text" name="message" />
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
