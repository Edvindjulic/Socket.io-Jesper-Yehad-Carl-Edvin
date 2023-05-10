import {
  Box,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

interface UsersInRoomProps {
  room: string;
  username: string;
}

const UsersInRoom: React.FC<UsersInRoomProps> = ({
  room,
  username,
}: UsersInRoomProps) => {
  const [users, setUsers] = useState<string[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      const handleUsersInRooms = (usersInRooms: {
        [room: string]: string[];
      }) => {
        const usersInCurrentRoom = usersInRooms[room] || [];
        setUsers((prevUsers) => {
          const newUsers = usersInCurrentRoom.filter(
            (user) => !prevUsers.includes(user)
          );
          return [...prevUsers, ...newUsers];
        });
      };
      socket.on("usersInRooms", handleUsersInRooms);

      return () => {
        socket.off("usersInRooms", handleUsersInRooms);
      };
    }
  }, [room, socket]);

  return (
    <Box>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
      <p>Username: {username}</p>
    </Box>
  );
};

interface RoomsProps {
  setSelectedRoom: React.Dispatch<React.SetStateAction<string>>;
  onRoomSelection: (room: string) => void;
  username: string;
}

const Rooms: React.FC<RoomsProps> = ({ username }: RoomsProps) => {
  const { currentRoom, joinRoom, listOfRooms, leaveRoom } = useSocket();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomInput = e.currentTarget.elements.namedItem(
      "room"
    ) as HTMLInputElement;
    const room = roomInput.value;
    joinRoom(room);
  };

  const handleRoomClick = (room: string) => {
    joinRoom(room);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", padding: "1rem", backgroundColor: "white" }}
      >
        Rooms
      </Typography>
      <Divider sx={{ backgroundColor: "#7D99B4" }} />
      <UsersInRoom room={currentRoom || ""} username={username} />
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: "1rem" }}>
        Current room is {currentRoom}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Detta är de rum som finns:
      </Typography>
      <List>
        {listOfRooms.map((room, index) => (
          <ListItem
            key={index}
            sx={{ background: room === currentRoom ? "#4C79B5" : "#7D99B4" }}
            button
            onClick={() =>
              room === currentRoom ? leaveRoom(room) : handleRoomClick(room)
            }
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {room === currentRoom ? "🚪 " : "✅ "}
              <Typography variant="body1"> {room}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ width: "80%", margin: "auto" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            label="Skriv vilket rum du vill vara i"
            name="room"
            sx={{ mb: 1 }}
          />
          <Typography
            variant="body1"
            component="button"
            type="submit"
            sx={{
              width: "100%",
              textAlign: "center",
              padding: "0.5rem",
              border: "none",
              backgroundColor: "#57B49F",
              color: "white",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#479F8B",
              },
            }}
          >
            Create new room
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Rooms;
