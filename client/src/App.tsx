import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import ChatBox from "./components/ChatBox";
import SelectUsername from "./components/SelectUsername";
import Sidebar from "./components/Sidebar";
import UsersInRoom from "./components/UsersInRoom";
import { useSocket } from "./context/SocketContext";

function App() {
  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);
  const { socket, setMessages, currentRoom } = useSocket();
  const [usersInRoom, setUsersInRoom] = useState([]);

  useEffect(() => {
    if (currentRoom) {
      setMessages([]);
      const fetchUsersInRoom = async () => {
        try {
          const response = await fetch(`/api/rooms/${currentRoom}/users`);
          const data = await response.json();
          setUsersInRoom(data.users);
        } catch (error) {
          console.log("Error fetching users in room:", error);
        }
      };
      fetchUsersInRoom();
    }
  }, [currentRoom]);

  const onUsernameSelection = (username) => {
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
              paddingTop: "2rem",
              height: "100%",
            }}
          >
            <ChatBox />
          </Box>
          <Sidebar room={currentRoom} users={usersInRoom} />
          {currentRoom && (
            <UsersInRoom room={currentRoom} users={usersInRoom} />
          )}
        </Box>
      )}
    </>
  );
}

export default App;
