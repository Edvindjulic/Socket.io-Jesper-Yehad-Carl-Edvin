import { Box } from "@mui/material";
import { useEffect } from "react";
import "./App.css";
import ChatBox from "./components/ChatBox";
import NoRoom from "./components/NoRoom";
import SelectUsername from "./components/SelectUsername";
import Sidebar from "./components/Sidebar";
import UsersInRoom from "./components/UsersInRoom";
import { useSocket } from "./context/SocketContext";

function App() {
  const {
    socket,
    setMessages,
    currentRoom,
    usernameAlreadySelected,
    setUsernameAlreadySelected,
    setCurrentRoom,
    username, // Add this line to store the username
  } = useSocket();

  useEffect(() => {
    if (currentRoom) {
      setMessages([]);
    }
  }, [currentRoom]);

  const onUsernameSelection = (username: string) => {
    console.log(username);
    setUsernameAlreadySelected(true);
    if (socket) {
      socket.auth = { username };
      socket.connect();
    }
  };

  const handleRoomSelection = (room: string) => {
    setCurrentRoom(room);
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
              paddingTop: "2rem",
              height: "100%",
            }}
          >
            {currentRoom === "Default" ? <NoRoom /> : <ChatBox />}
          </Box>
          <Sidebar
            username={username} // Pass the username to Sidebar component
            onRoomSelection={handleRoomSelection}
          />
          <UsersInRoom room={currentRoom || ""} username={username} />
        </Box>
      )}
    </>
  );
}

export default App;
