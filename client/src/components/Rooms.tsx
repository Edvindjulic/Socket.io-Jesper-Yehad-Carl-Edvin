import {
  Box,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useSocket } from "../context/SocketContext";

function Rooms() {
  const { currentRoom, joinRoom, listOfRooms, leaveRoom } = useSocket();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomInput = e.currentTarget.elements.namedItem(
      "room"
    ) as HTMLInputElement;
    const room = roomInput.value;
    joinRoom(room);
    roomInput.value = "";
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
            label="Name the room"
            name="room"
            InputLabelProps={{
              shrink: false,
              sx: {
                "&.Mui-focused": {
                  display: "none",
                },
              },
            }}
            sx={{
              mb: 1,
              width: "90%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderWidth: "2px",
                },
                "&.Mui-focused fieldset": {
                  borderWidth: "2px",
                  borderColor: "#7D99B4",
                },
                "&:hover fieldset": {
                  borderColor: "#7D99B4",
                },
              },
            }}
            variant="outlined"
          />

          <Typography
            variant="body1"
            component="button"
            type="submit"
            sx={{
              width: "90%",
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
}

export default Rooms;
