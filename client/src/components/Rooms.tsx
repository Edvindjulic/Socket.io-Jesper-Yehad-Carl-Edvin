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
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useState } from "react";

import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { useSocket } from "../context/SocketContext";

function Rooms() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { currentRoom, joinRoom, listOfRooms, leaveRoom, users } = useSocket();
  const [roomValue, setRoomValue] = useState("");
  const [focused, setFocused] = useState(false);
  const currentUserID = sessionStorage.getItem("userID");
  const currentUser = users.find((user) => user.userID === currentUserID);

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
        You are logged in as{" "}
        <span style={{ fontWeight: "bold" }}>{currentUser?.username}</span>
      </Typography>
      <Divider sx={{ width: "100%" }} />
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Rooms ({listOfRooms.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            background: "#F1F6F9",
          }}
        >
          <List
            sx={{
              padding: 0,
            }}
          >
            {listOfRooms.map((room, index) => (
              <ListItem
                key={index}
                button
                onClick={() =>
                  room === currentRoom ? leaveRoom(room) : handleRoomClick(room)
                }
                sx={{
                  "&:hover": {
                    background: "none",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <MessageOutlinedIcon
                    sx={{
                      padding: 0,
                      marginTop: 0,
                      marginRight: "0.2rem", // Add margin to create space between the icon and text
                      fontSize: "18px"
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: room === currentRoom ? "bold" : "normal",
                      display: "flex", // Add display:flex to align items vertically
                      alignItems: "center", // Vertically center the text
                    }}
                  >
                    {room}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ width: "100%" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
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
              marginBottom: "0.5rem",
              width: isMobile || isTablet ? "100%" : "90%",
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
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
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
              width: isMobile || isTablet ? "100%" : "90%",
              textAlign: "center",
              padding: "0.2rem",
              marginBottom: "1rem",
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
