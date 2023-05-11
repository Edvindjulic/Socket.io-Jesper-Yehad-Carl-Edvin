import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  InputLabel,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSocket } from "../context/SocketContext";

function Rooms() {
  const { currentRoom, joinRoom, listOfRooms, leaveRoom } = useSocket();

  const [roomValue, setRoomValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roomValue.trim()) {
      joinRoom(roomValue);
      setRoomValue("");
    }
  };

  const handleRoomClick = (room: string) => {
    joinRoom(room);
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomValue(e.target.value);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
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

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            All Rooms ({listOfRooms.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {listOfRooms.map((room, index) => (
              <ListItem
                key={index}
                sx={{
                  background: room === currentRoom ? "" : "#a9b4be",
                  "&:hover": {
                    background: room === currentRoom ? "" : "#4C79B5",
                    cursor: "pointer",
                  },
                }}
                button
                onClick={() => (room === currentRoom ? leaveRoom(room) : handleRoomClick(room))}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {room === currentRoom ? "🚪 " : "✅ "}
                  <Typography variant="body1">{room}</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

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
            value={roomValue}
            onChange={handleRoomChange}
            InputLabelProps={{
              shrink: focused || roomValue !== "",
              sx: {
                "&.Mui-focused": {
                  display: "none",
                },
              },
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#7D99B4",
                borderWidth: "2px",
              },
              "& .MuiOutlinedInput-notchedOutline.Mui-focused": {
                borderColor: "#7D99B4",
                borderWidth: "2px",
              },
              "& .MuiOutlinedInput-input": {
                borderRadius: "4px",
                borderColor: "#7D99B4",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#7D99B4",
              },
              position: "relative",
            }}
            variant="outlined"
            InputProps={{
              startAdornment:
                !roomValue && !focused ? (
                  <InputLabel
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "none",
                      color: "#C7C7C7",
                    }}
                  >
                    Name the room
                  </InputLabel>
                ) : null,
            }}
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
