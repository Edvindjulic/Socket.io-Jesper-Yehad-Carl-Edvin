import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useRoom } from "../context/RoomContext";
import { useSocket } from "../context/SocketContext";

function Rooms() {
  const { rooms, setRooms, currentRoom, setCurrentRoom } = useRoom();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleAllRooms = (allRooms: string[]) => {
      updateRooms(allRooms);
    };

    socket.on("allRooms", handleAllRooms);

    return () => {
      socket.off("allRooms", handleAllRooms);
    };
  }, [socket]);

  const updateRooms = (allRooms: string[]) => {
    setRooms(allRooms);
  };

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomName = e.currentTarget.message.value;

    if (roomName) {
      if (!rooms.includes(roomName)) {
        // Create the room if it doesn't exist
        socket.emit("create-room", roomName);
      } else {
        // Join the room if it exists
        socket.emit("join-room", roomName);
      }
      setCurrentRoom(roomName);
    }
    e.currentTarget.message.value = "";
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", }}>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          padding: "1rem",
          backgroundColor: "white",
        }}
      >
        Rooms
      </Typography>
      <Divider sx={{
        backgroundColor: "#7D99B4"
      }} />
      <Typography variant="h6" sx={{textAlign: "center", marginTop: "1rem"}}>Current room is {currentRoom}</Typography>
      <Typography variant="body1" sx={{textAlign: "center"}}>Detta är de rum som finns:</Typography>
      <List>
        {rooms.map((room, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <ChatBubbleOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={room} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{
        width: "80%",
        margin: "auto",
      }} />
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
          onSubmit={handleJoinRoom}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            label="Skriv vilket rum du vill vara i"
            name="message"
            sx={{ mb: 1 }}
          />
          <Button type="submit" variant="contained" sx={{
            width: "100%",
            backgroundColor: "#57B49F",
            "&:hover": {
              backgroundColor: "#479F8B",
            },
          }}>
            Create new room
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Rooms;
