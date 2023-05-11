import { Box } from "@mui/material";
import { useEffect } from "react";
import "./App.css";
import ChatBox from "./components/ChatBox"; // Import ChatBox component
import NoRoom from "./components/NoRoom";
import SelectUsername from "./components/SelectUsername";
import Sidebar from "./components/Sidebar";
import { useSocket } from "./context/SocketContext";

function App() {
  const { socket, setMessages, currentRoom, usernameAlreadySelected, setUsernameAlreadySelected } =
    useSocket();

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
              height: "100%",
            }}
          >
            {currentRoom === "Lobby" ? <NoRoom /> : <ChatBox />}
          </Box>
          <Sidebar />
        </Box>
      )}
    </>
  );
}

export default App;
