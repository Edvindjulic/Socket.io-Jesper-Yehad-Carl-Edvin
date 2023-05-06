import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useSocket } from "../context/SocketContext";

function Rooms() {
  const { currentRoom, joinRoom } = useSocket();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomInput = e.currentTarget.elements.namedItem(
      "room"
    ) as HTMLInputElement;
    const room = roomInput.value;
    joinRoom(room);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
      <Divider
        sx={{
          backgroundColor: "#7D99B4",
        }}
      />
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: "1rem" }}>
        Current room is {currentRoom}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Detta är de rum som finns:
      </Typography>
      {/* <List>
        {rooms.map((room, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <ChatBubbleOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={room} />
          </ListItem>
        ))}
      </List> */}
      <Divider
        sx={{
          width: "80%",
          margin: "auto",
        }}
      />
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
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#57B49F",
              "&:hover": {
                backgroundColor: "#479F8B",
              },
            }}
          >
            Create new room
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Rooms;
